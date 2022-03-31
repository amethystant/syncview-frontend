import '../styles/component/PlaybackScreen.css'

import React from 'react'
import {useNavigate} from 'react-router-dom'
import Player from './Player'
import constants from '../constants'
import {getSessionStateUpdates, updateState, getSessionState, getLocalStorageValue} from '../useCases'
import routeNames from '../routeNames'

class PlaybackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: getLocalStorageValue(constants.storageKeys.FILE_URL),
            sessionCode: getLocalStorageValue(constants.storageKeys.SESSION_CODE),
            guestId: getLocalStorageValue(constants.storageKeys.GUEST_ID),
            isHost: getLocalStorageValue(constants.storageKeys.IS_HOST) === 'true',
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
            isForcePaused: false
        }

        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }

    componentDidMount() {
        const {sessionCode, guestId} = this.state
        if (!sessionCode || !guestId) {
            this.props.navigate(routeNames.noAccess)
            return
        }

        if (!this.state.videoUrl) {
            this.props.navigate(routeNames.videoFileSelection)
        }

        this.sessionStateUpdatesJob =
            getSessionStateUpdates(remoteState => this.onRemoteStateChange(remoteState), () => {
                // todo put page into an error state (do not navigate away, this gets triggered when leaving the page as well)
            })

        getSessionState()
            .then(remoteState => this.onRemoteStateChange(remoteState))
            .catch(error => {
                if (error.isAuthorization) {
                    this.props.navigate(routeNames.noAccess)
                    return
                }

                // todo on other errors
            })
    }

    onRemoteStateChange(remoteState) {
        if (remoteState.isAwaitingAdmission) {
            this.props.navigate(routeNames.waitingRoom)
            return
        }

        const thisGuest = remoteState.guests.find(guest => guest.id === this.state.guestId, this)

        this.setState({
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

    onPlayerStateChange(position, isPlaying) {
        if (!this.state.isInitialStateLoaded) {
            return
        }

        if (!this.state.isControlsGranted) {
            // todo show message
            if (typeof isPlaying === 'boolean') {
                this.setState({
                    isForcePaused: isPlaying !== this.state.isPlaying ? !isPlaying : false
                })
            }
            return
        }

        if (typeof isPlaying !== 'boolean') {
            isPlaying = this.state.isPlaying
        }

        if (this.state.position.position === position && this.state.isPlaying === isPlaying) {
            return
        }

        const outboundState = {
            position: {
                position: position
            },
            isPlaying: isPlaying
        }

        updateState(outboundState)
            .catch(error => {
                // todo handle error
            })
    }

    componentWillUnmount() {
        if (this.sessionStateUpdatesJob) {
            this.sessionStateUpdatesJob.cancel()
            delete this.sessionStateUpdatesJob
        }
    }

    render() {
        return (
            <div className="playback-screen-root">
                <div className="playback-screen-player-div">
                    <Player
                        videoUrl={this.state.videoUrl}
                        isSeekingAllowed={this.state.isControlsGranted}
                        isPlaying={this.state.isPlaying && !this.state.isForcePaused}
                        position={this.state.position}
                        onPause={position => this.onPlayerStateChange(position, false)}
                        onPlay={position => this.onPlayerStateChange(position, true)}
                        onUserSeek={position => this.onPlayerStateChange(position)}/>
                </div>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <PlaybackScreen  {...props} navigate={navigate}/>
}