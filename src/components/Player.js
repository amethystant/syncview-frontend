import '../styles/component/Player.css'

import React from "react"
import VideoJs from "./VideoJs"

class Player extends React.Component {
    render() {
        const sources = [{
            src: this.props.videoUrl,
            type: 'video/mp4'
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
                    isPlaying={this.props.isPlaying}
                    position={this.props.position}
                    onPause={this.props.onPause}
                    onPlay={this.props.onPlay}
                    onUserSeek={this.props.onUserSeek}/>
            </div>
        )
    }
}

export default Player