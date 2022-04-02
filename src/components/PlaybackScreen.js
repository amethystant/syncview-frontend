import '../styles/component/PlaybackScreen.css'

import React from 'react'
import {useNavigate} from 'react-router-dom'
import Player from './Player'
import constants from '../constants'
import {
    getSessionStateUpdates,
    updateState,
    getSessionState,
    getLocalStorageValue, setDocumentTitle
} from '../useCases'
import routeNames from '../routeNames'
import PlaybackSessionDetails from './PlaybackSessionDetails'
import PlaybackSessionSettings from './PlaybackSessionSettings'
import translations from '../translations'

const ERROR_MESSAGE_DURATION = 2000

class PlaybackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: getLocalStorageValue(constants.storageKeys.FILE_URL),
            sessionCode: getLocalStorageValue(constants.storageKeys.SESSION_CODE) ?? '',
            guestId: null,
            isHost: false,
            sessionName: '',
            guestName: '',
            isControlsGranted: true,
            expirationTs: 40000000000,
            isPlaying: false,
            position: {
                position: 0,
                updateTs: Date.now()
            },
            lastAction: null,
            guests: [],
            admissionRequests: [],
            isControlsAllowed: false,
            isWaitingRoom: true,
            isInitialStateLoaded: false,
            isForcePaused: false,
            error: null
        }

        this.timeoutIds = []

        this.onPlayOrPause = this.onPlayOrPause.bind(this)
        this.onUserSeek = this.onUserSeek.bind(this)
        this.onPlayerError = this.onPlayerError.bind(this)
        this.onChildComponentError = this.onChildComponentError.bind(this)
    }

    componentDidMount() {
        const {sessionCode} = this.state
        if (!sessionCode) {
            this.props.navigate(routeNames.noAccess)
            return
        }

        if (!this.state.videoUrl) {
            this.props.navigate(routeNames.videoFileSelection)
            return
        }

        this.sessionStateUpdatesJob =
            getSessionStateUpdates(remoteState => this.onRemoteStateChange(remoteState), () => {
                this.showErrorMessage(translations.playback.errors.stateFetchFailed, true, true)
                this.fetchSingleStateUpdate()
            })

        this.fetchSingleStateUpdate()
    }

    onRemoteStateChange(remoteState) {
        if (remoteState.isAwaitingAdmission) {
            this.props.navigate(routeNames.waitingRoom)
            return
        }

        setDocumentTitle(translations.playback.title(remoteState.name))

        const thisGuest = remoteState.guests.find(guest => guest.id === remoteState.guestId, this)
        this.setState({
            guestId: remoteState.guestId,
            isHost: thisGuest.isHost,
            sessionName: remoteState.name,
            guestName: thisGuest.name,
            isControlsGranted: remoteState.isControlsGranted,
            expirationTs: remoteState.expirationTs,
            isPlaying: remoteState.isPlaying,
            position: remoteState.position,
            lastAction: remoteState.lastAction,
            guests: remoteState.guests,
            admissionRequests: remoteState.admissionRequests ?? [],
            isControlsAllowed: remoteState.isControlsAllowed ?? false,
            isWaitingRoom: remoteState.isWaitingRoom ?? true,
            isInitialStateLoaded: true,
            isForcePaused: !remoteState.isControlsGranted ? this.state.isForcePaused : false
        })
    }

    onPlayOrPause(isPlaying) {
        if (!this.state.isInitialStateLoaded) {
            return
        }

        if (!this.state.isControlsGranted) {
            this.showErrorMessage(translations.playback.errors.playOrPauseNotAllowed)
            this.setState({
                isForcePaused: isPlaying !== this.state.isPlaying ? !isPlaying : false
            })
            return
        }

        if (isPlaying === this.state.isPlaying) {
            return
        }

        const outboundState = {
            isPlaying: isPlaying
        }
        updateState(outboundState)
            .catch(error => {
                this.showErrorMessage(translations.playback.errors.stateUpdateFailed)
            })
    }

    onUserSeek(position) {
        if (!this.state.isInitialStateLoaded) {
            return
        }

        if (!this.state.isControlsGranted) {
            this.showErrorMessage(translations.playback.errors.controlsNotGranted)
            return
        }

        if (this.state.position.position === position) {
            return
        }

        const outboundState = {
            position: {
                position: position
            }
        }

        updateState(outboundState)
            .catch(error => {
                this.showErrorMessage(translations.playback.errors.stateUpdateFailed)
            })
    }

    onPlayerError() {
        this.props.navigate(routeNames.videoFileSelection)
    }

    onChildComponentError(errorMessage) {
        this.showErrorMessage(errorMessage)
    }

    fetchSingleStateUpdate() {
        getSessionState()
            .then(remoteState => this.onRemoteStateChange(remoteState))
            .catch(error => {
                if (error.isAuthorization) {
                    this.props.navigate(routeNames.noAccess)
                    return
                }

                this.showErrorMessage(translations.playback.errors.stateFetchFailed)
            })
    }

    showErrorMessage(message, indefinite, showReloadButton) {
        indefinite = indefinite === true
        if (!indefinite && this.state.error && this.state.error.indefinite) {
            return
        }

        const dateNow = Date.now()
        this.setState({
            error: {
                time: dateNow,
                message: message,
                indefinite: indefinite,
                showReloadButton: showReloadButton === true
            }
        })

        if (indefinite) {
            return
        }

        const timeoutId = setTimeout(() => {
            if (this.state.error.time === dateNow) {
                this.setState({
                    error: null
                })
            }
        }, ERROR_MESSAGE_DURATION)

        this.timeoutIds.push(timeoutId)
    }

    componentWillUnmount() {
        if (this.sessionStateUpdatesJob) {
            this.sessionStateUpdatesJob.cancel()
            delete this.sessionStateUpdatesJob
        }

        this.timeoutIds.forEach(timeoutId => {
            clearTimeout(timeoutId)
        })
    }

    render() {
        const settings = this.state.isHost ? (
            <PlaybackSessionSettings
                sessionName={this.state.sessionName}
                isWaitingRoom={this.state.isWaitingRoom}
                isControlsAllowed={this.state.isControlsAllowed}
                onError={this.onChildComponentError}/>
        ) : ''

        const reloadButton = this.state.error && this.state.error.showReloadButton ? (
            <button type="button" onClick={() => window.location.reload()}>{translations.playback.reload}</button>
        ) : ''
        const error = this.state.error ? (
            <div>
                <p>{this.state.error.message}</p>
                {reloadButton}
            </div>
        ) : ''
        return (
            <div className="playback-screen-root">
                <div className="playback-screen-player-div">
                    <Player
                        videoUrl={this.state.videoUrl}
                        isSeekingAllowed={this.state.isControlsGranted}
                        isPlaying={this.state.isPlaying && !this.state.isForcePaused}
                        position={this.state.position}
                        onPause={position => this.onPlayOrPause(false)}
                        onPlay={position => this.onPlayOrPause(true)}
                        onUserSeek={position => this.onUserSeek(position)}
                        onPlayerError={this.onPlayerError}/>
                </div>
                <div className="playback-screen-overlay-div">
                    <PlaybackSessionDetails
                        sessionCode={this.state.sessionCode}
                        isHost={this.state.isHost}
                        guestId={this.state.guestId}
                        guests={this.state.guests}
                        admissionRequests={this.state.admissionRequests}
                        onError={this.onChildComponentError}/>
                    {settings}
                </div>
                <div className="playback-screen-error-overlay-div">
                    {error}
                </div>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <PlaybackScreen  {...props} navigate={navigate}/>
}