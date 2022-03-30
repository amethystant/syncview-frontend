import '../styles/component/PlaybackScreen.css'

import React from 'react'
import Player from './Player'
import constants from '../constants'
import {getSessionStateUpdates, updateState, getSessionState, getLocalStorageValue} from '../useCases'

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
            isControlsGranted: false,
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
            isInitialStateLoaded: false
        }

        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }

    componentDidMount() {
        const {sessionCode, guestId} = this.state
        if (!this.state.videoUrl || !sessionCode || !guestId) {
            // todo error
            return
        }

        this.sessionStateUpdatesJob =
            getSessionStateUpdates(sessionCode, remoteState => this.onRemoteStateChange(remoteState), () => {
                // todo ws closed
            })

        getSessionState(sessionCode)
            .then(remoteState => this.onRemoteStateChange(remoteState))
            .catch(error => {
                // todo error
            })
    }

    onRemoteStateChange(remoteState) {
        if (remoteState.isAwaitingAdmission) {
            // todo navigate to waiting room
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
            isInitialStateLoaded: true
        })
    }

    onPlayerStateChange(position, isPlaying) {
        if (!this.state.isInitialStateLoaded || !this.state.isControlsGranted) {
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

        updateState(this.state.sessionCode, outboundState)
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
                        isPlaying={this.state.isPlaying}
                        position={this.state.position}
                        onPause={position => this.onPlayerStateChange(position, false)}
                        onPlay={position => this.onPlayerStateChange(position, true)}
                        onUserSeek={position => this.onPlayerStateChange(position)}/>
                </div>
            </div>
        )
    }
}

export default PlaybackScreen