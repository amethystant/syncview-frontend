import '../styles/component/PlaybackScreen.css'

import React from 'react'
import Player from './Player'
import constants from '../constants'

class PlaybackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: localStorage.getItem(constants.storageKeys.FILE_URL),
            sessionCode: localStorage.getItem(constants.storageKeys.SESSION_CODE),
            guestId: localStorage.getItem(constants.storageKeys.GUEST_ID)
        }
    }

    componentDidMount() {
        const {sessionCode, guestId} = this.state
        if (!this.state.videoUrl || !sessionCode || !guestId) {
            // todo error
            return
        }

        // todo establish ws connection
    }

    render() {
        return (
            <div className="playback-screen-root">
                <div className="playback-screen-player-div">
                    <Player videoUrl={this.state.videoUrl}/>
                </div>
            </div>
        )
    }
}

export default PlaybackScreen