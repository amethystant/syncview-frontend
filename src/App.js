import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
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
        super(props);
        this.handleFileChosen = this.handleFileChosen.bind(this)
        this.inputRef = React.createRef()
    }

    handleFileChosen() {
        const file = this.inputRef.current.files[0]
        const url = URL.createObjectURL(file)
        this.props.onFileChosen(url)
    }

    render() {
        return (<input type="file" ref={this.inputRef} onChange={this.handleFileChosen}/>);
    }
}

class Player extends React.Component {
    render() {
        return (<video controls autoPlay src={this.props.videoUrl}/>)
    }
}

export default App;
