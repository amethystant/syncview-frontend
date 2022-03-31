import '../styles/component/VideoJs.css'
import 'video.js/dist/video-js.css'

import React from 'react'
import videojs from 'video.js'

const PLAYER_POSITION_DIFFERENCE_MAX_MS = 300

class VideoJs extends React.Component {

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
        const oldSources = this.props.options.sources
        const newSources = newProps.options.sources

        if (!this.areSourceListsSame(oldSources, newSources)) {
            this.resetPlayer()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const oldSources = prevProps.options.sources
        const newSources = this.props.options.sources
        this.updateTimeControlVisibility()
        if (!this.areSourceListsSame(oldSources, newSources)) {
            this.initPlayer()
        } else {
            this.updatePlayerState()
        }
    }

    componentWillUnmount() {
        this.destroyPlayer()
    }

    initPlayer() {
        this.player = videojs(this.videoNode, this.props.options)
        this.updateTimeControlVisibility()
        this.updatePlayerState()
        this.setUpPlayerListeners()
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

        let progressBarElement = this.rootNode.getElementsByClassName('vjs-progress-control').item(0)
        if (progressBarElement) {
            progressBarElement.style.display = this.props.isSeekingAllowed ? 'flex' : 'none'
        }
    }

    updatePlayerState() {
        if (this.props.isPlaying && this.player.paused()) {
            this.player.play()
        } else if (!this.props.isPlaying && !this.player.paused()) {
            this.player.pause()
        }

        if (this.isOutOfSync() && this.props.isPlaying) {
            this.isAdjusting = true
            this.player.currentTime(this.getDesirablePositionMs() / 1000)
        }
    }

    setUpPlayerListeners() {
        const player = this.player

        player.on('pause', () => {
            if (!player.seeking()) {
                this.props.onPause(player.currentTime() * 1000)
            }
        })

        player.on('play', () => {
            if (!player.seeking()) {
                if (this.isOutOfSync() && this.props.isPlaying) {
                    this.isAdjusting = true
                    player.currentTime(this.getDesirablePositionMs() / 1000)
                } else {
                    this.props.onPlay(player.currentTime() * 1000)
                }
            }
        })

        player.on('seeked', () => {
            if (!this.isAdjusting) {
                this.props.onUserSeek(player.currentTime() * 1000)
            } else {
                if (this.isOutOfSync()) {
                    this.player.currentTime(this.getDesirablePositionMs() / 1000)
                } else {
                    this.isAdjusting = false
                }
            }
        })

        player.on('error', () => {
            this.props.onPlayerError()
        })
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

    areSourceListsSame(oldSources, newSources) {
        if (oldSources.length !== newSources.length) {
            return false
        }
        const oldSrcUrls = oldSources.map(src => src.src).sort()
        const newSrcUrls = newSources.map(src => src.src).sort()
        let same = true
        for (let i = 0; i < oldSources.length; i++) {
            if (oldSrcUrls[i] !== newSrcUrls[i]) {
                same = false
                break
            }
        }

        return same
    }

    getDesirablePositionMs() {
        const position = this.props.position ?? {
            position: 0,
            updateTs: Date.now()
        }

        if (!this.props.isPlaying) {
            return position.position
        }

        return position.position + (Date.now() - position.updateTs)
    }

    isOutOfSync() {
        return Math.abs(this.getDesirablePositionMs() - this.player.currentTime() * 1000) >
            PLAYER_POSITION_DIFFERENCE_MAX_MS
    }

    render() {
        const overrideStyle = {
            width: '100%',
            height: '100%'
        }
        return (
            <div
                ref={node => this.rootNode = node}
                data-vjs-player=""
                key={this.state.videoKey}
                style={overrideStyle}>

                <video
                    ref={node => this.videoNode = node}
                    className="video-js video-js-wrapper-video"/>
            </div>
        )
    }
}

export default VideoJs
