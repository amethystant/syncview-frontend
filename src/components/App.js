import './App.css'

import React from 'react'
import Player from './Player'
import FilePicker from './FilePicker'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: null
        }
    }

    render() {
        return (
            <div className="app-root">
                <div className="app-player-div">
                    <Player videoUrl={this.state.videoUrl}/>
                </div>
                <div className="app-file-chooser-div">
                    <FilePicker onFileChosen={(url) => {
                        this.setState({
                            videoUrl: url
                        })
                    }}/>
                </div>
            </div>
        )
    }
}

export default App
