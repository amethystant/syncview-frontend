import '../styles/component/Player.css'

import React from "react"
import VideoJs from "./VideoJs"

class Player extends React.Component {
    render() {
        const sources = [{
            src: this.props.videoUrl,
            type: this.props.videoType
        }]
        const videoJsOptions = {
            autoplay: false,
            controls: true,
            sources: sources
        }

        const sizeStyle = {
            width: this.props.width ?? '100%',
            height: this.props.height ?? '100%'
        }
        return (
            <div style={sizeStyle}>
                <VideoJs
                    className="player-main"
                    options={videoJsOptions}
                    showCurrentTimeDisplay={true}
                    showTimeDivider={true}
                    showDurationDisplay={true}
                    showRemainingTimeDisplay={false}
                    isSeekingAllowed={this.props.isSeekingAllowed}
                    isPlaying={this.props.isPlaying}
                    position={this.props.position}
                    onPause={this.props.onPause}
                    onPlay={this.props.onPlay}
                    onUserSeek={this.props.onUserSeek}
                    onPlayerError={this.props.onPlayerError}
                    onUserActiveChange={this.props.onUserActiveChange}/>
            </div>
        )
    }
}

export default Player