import React from 'react'
import {useNavigate} from 'react-router-dom'
import FilePicker from './FilePicker'
import routeNames from '../routeNames'
import {getSessionState, setDocumentTitle, setLocalStorageValue} from '../useCases'
import constants from '../constants'
import translations from '../translations'

class VideoFileSelectionScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formError: '',
            fileUrl: ''
        }

        this.onFileChosen = this.onFileChosen.bind(this)
        this.onProceedClick = this.onProceedClick.bind(this)
    }

    componentDidMount() {
        getSessionState()
            .then(remoteState => {
                if (remoteState.isAwaitingAdmission) {
                    this.props.navigate(routeNames.waitingRoom)
                } else {
                    setDocumentTitle(translations.videoFileSelection.title(remoteState.name))
                }
            })
            .catch(error => {
                if (error.isAuthorization) {
                    this.props.navigate(routeNames.noAccess)
                }
            })
    }

    onFileChosen(url) {
        this.setState({
            fileUrl: url
        })
    }

    onProceedClick() {
        if (!this.state.fileUrl) {
            this.setState({
                formError: translations.videoFileSelection.errors.missingFile
            })
            return
        }

        // todo verify files first
        setLocalStorageValue(constants.storageKeys.FILE_URL, this.state.fileUrl)
        this.props.navigate(routeNames.playback)
    }

    render() {
        const formError = this.state.formError ? (
            <p>{this.state.formError}<br/></p>
        ) : ''

        return (
            <div>
                {formError}
                <FilePicker
                    accept=".mp4"
                    onFileChosen={this.onFileChosen}/>
                <br/>
                <button type="button" onClick={this.onProceedClick}>{translations.videoFileSelection.proceed}</button>
            </div>
        )
    }
}

export default (props) => {
    const navigate = useNavigate()
    return <VideoFileSelectionScreen {...props} navigate={navigate}/>
}
