import React from 'react'
import {useNavigate} from 'react-router-dom'
import FilePicker from './FilePicker'
import translations from '../translations'
import {createSession, setDocumentTitle, setLocalStorageValue} from '../useCases'
import routeNames from '../routeNames'
import constants from '../constants'

class SessionCreationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            hostName: '',
            isWaitingRoom: false,
            isControlsAllowed: true,
            fileUrl: null,
            showInvalidInputMessage: false
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.onFileChosen = this.onFileChosen.bind(this)
        this.onCreateClicked = this.onCreateClicked.bind(this)
        this.navigateToPlayback = this.navigateToPlayback.bind(this)
    }

    componentDidMount() {
        setDocumentTitle(translations.sessionCreation.title)
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
            this.setState({
                showInvalidInputMessage: true
            })
            return
        }

        const fileDescription = '-' // todo make file description
        createSession(name, hostName, isWaitingRoom, isControlsAllowed, fileDescription)
            .then(() => setLocalStorageValue(constants.storageKeys.FILE_URL, fileUrl))
            .then(() => this.navigateToPlayback())
            .catch(error => {
                console.log(error.toString())
            })
    }

    navigateToPlayback() {
        this.props.navigate(routeNames.playback)
    }

    render() {
        const invalidInputMessage = this.state.showInvalidInputMessage ? (
            <p>{translations.sessionCreation.errors.invalidData}<br/></p>
        ) : ''

        return (
            <form>
                {invalidInputMessage}
                <input
                    name="name"
                    type="text"
                    required={true}
                    maxLength="20"
                    value={this.state.name}
                    onChange={this.onInputChange}
                    placeholder={translations.sessionCreation.sessionName}/>
                <br/>
                <input
                    name="hostName"
                    type="text"
                    required={true}
                    maxLength="20"
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
                    onFileChosen={this.onFileChosen}
                    inputId="session-video-file"/>
                <br/>
                <button
                    type="button"
                    onClick={this.onCreateClicked}>
                    {translations.sessionCreation.create}
                </button>
                <br/>
            </form>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <SessionCreationScreen {...props} navigate={navigate}/>
}
