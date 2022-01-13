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
            <div data-vjs-player key={this.state.videoKey}>
                <video ref={node => this.videoNode = node} className="video-js"></video>
            </div>
        )
    }
}

export default VideoPlayer
