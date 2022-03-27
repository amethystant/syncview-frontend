import React from 'react'
import {useNavigate} from 'react-router-dom'
import FilePicker from './FilePicker'
import translations from '../translations'
import {createSession} from '../useCases'
import routeNames from '../routeNames'
import constants from '../constants'

class SessionCreationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            hostName: '',
            isWaitingRoom: false,
            isControlsAllowed: false,
            fileUrl: null
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.onFileChosen = this.onFileChosen.bind(this)
        this.onCreateClicked = this.onCreateClicked.bind(this)
        this.navigateToPlayback = this.navigateToPlayback.bind(this)
    }

    onInputChange(event) {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: newValue
        })
    }

    onFileChosen(url) {
        this.setState({
            fileUrl: url
        })
    }

    onCreateClicked() {
        const {name, hostName, isWaitingRoom, isControlsAllowed, fileUrl} = this.state
        if (!name || !hostName || !fileUrl) {
            // todo show error
            return
        }

        const fileDescription = 'aa' // todo make file description
        createSession(name, hostName, isWaitingRoom, isControlsAllowed, fileDescription)
            .then(() => localStorage.setItem(constants.storageKeys.FILE_URL, fileUrl))
            .then(() => this.navigateToPlayback())
            .catch(error => {
                console.log(error.toString())
            })
    }

    navigateToPlayback() {
        this.props.navigate(routeNames.playback)
    }

    render() {
        return (
            <div>
                <form className="session-creation-screen-form">
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.onInputChange}
                        placeholder={translations.sessionCreation.sessionName}/>
                    <br/>
                    <input
                        name="hostName"
                        type="text"
                        value={this.state.hostName}
                        onChange={this.onInputChange}
                        placeholder={translations.sessionCreation.hostName}/>
                    <br/>
                    <label>
                        <input
                            name="isWaitingRoom"
                            type="checkbox"
                            checked={this.state.isWaitingRoom}
                            onChange={this.onInputChange}/>
                        {translations.sessionCreation.waitingRoom}
                    </label>
                    <br/>
                    <label>
                        <input
                            name="isControlsAllowed"
                            type="checkbox"
                            checked={this.state.isControlsAllowed}
                            onChange={this.onInputChange}/>
                        {translations.sessionCreation.controlsAllowed}
                    </label>
                    <br/>
                    <FilePicker
                        accept=".mp4"
                        onFileChosen={this.onFileChosen}/>
                    <br/>
                    <button
                        type="button"
                        onClick={this.onCreateClicked}>
                        {translations.sessionCreation.create}
                    </button>
                    <br/>
                </form>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <SessionCreationScreen {...props} navigate={navigate}/>
}
