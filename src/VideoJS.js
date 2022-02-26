import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            videoKey: 0
        }
    }

    componentDidMount() {
        this.initPlayer()
    }

    componentWillReceiveProps(newProps) {
        this.resetPlayer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.initPlayer()
    }

    componentWillUnmount() {
        this.destroyPlayer()
    }

    initPlayer() {
        this.player = videojs(this.videoNode, this.props.options)
        this.updateTimeControlVisibility()
    }

    updateTimeControlVisibility() {
        let currentTimeElement = this.rootNode.getElementsByClassName('vjs-current-time').item(0)
        if (currentTimeElement) {
            currentTimeElement.style.display = this.props.showCurrentTimeDisplay ? 'block' : 'none'
        }

        let timeDividerElement = this.rootNode.getElementsByClassName('vjs-time-divider').item(0)
        if (timeDividerElement) {
            timeDividerElement.style.display = this.props.showTimeDivider ? 'block' : 'none'
        }

        let durationElement = this.rootNode.getElementsByClassName('vjs-duration').item(0)
        if (durationElement) {
            durationElement.style.display = this.props.showDurationDisplay ? 'block' : 'none'
        }

        let remainingTimeElement = this.rootNode.getElementsByClassName('vjs-remaining-time').item(0)
        if (remainingTimeElement) {
            remainingTimeElement.style.display = this.props.showRemainingTimeDisplay ? 'block' : 'none'
        }
    }

    resetPlayer() {
        this.setState({
            videoKey: this.state.videoKey + 1
        })
    }

    // todo find out if this is even necessary
    destroyPlayer() {
        if (this.player) {
            this.player.dispose()
            this.player = null
        }
    }

    render() {
        return (
            <div ref={node => this.rootNode = node} data-vjs-player="" key={this.state.videoKey}>
                <video ref={node => this.videoNode = node} className="video-js" />
            </div>
        )
    }
}

export default VideoPlayer
