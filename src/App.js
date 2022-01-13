import './App.css'
import React from 'react'
import VideoJS from './VideoJS'
import 'video.js/dist/video-js.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: null
        }
    }

    render() {
        return (
            <div>
                <FilePicker onFileChosen={(url) => {
                    this.setState({
                        videoUrl: url
                    })
                }}/>
                <Player videoUrl={this.state.videoUrl}/>
            </div>
        )
    }
}

class FilePicker extends React.Component {

    constructor(props) {
        super(props)
        this.handleFileChosen = this.handleFileChosen.bind(this)
        this.inputRef = React.createRef()
    }

    handleFileChosen() {
        const file = this.inputRef.current.files[0]
        const url = URL.createObjectURL(file)
        this.props.onFileChosen(url)
        //this.props.onFileChosen(this.inputRef.current.value)
    }

    render() {
        return (<input type="file" ref={this.inputRef} onChange={this.handleFileChosen}/>)
        //return (<input type="text" ref={this.inputRef} onChange={this.handleFileChosen}/>);
    }
}

class Player extends React.Component {
    render() {
        const sources = [{
            src: this.props.videoUrl,
            type: 'video/mp4'
        }]
        const videoJsOptions = {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            width: 720,
            height: 300,
            controls: true,
            sources: sources
        }
        return <VideoJS options={videoJsOptions}/>
    }
}

export default App
