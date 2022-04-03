import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Stack, Typography} from '@mui/material'
import FilePicker from './FilePicker'
import routeNames from '../routeNames'
import {getSessionState, setDocumentTitle, setLocalStorageValue} from '../useCases'
import constants from '../constants'
import translations from '../translations'
import FullpageForm from './FullpageForm'

class VideoFileSelectionScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formError: '',
            fileUrl: '',
            sessionName: translations.videoFileSelection.sessionNamePlaceholder
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
                    this.setState({
                        sessionName: remoteState.name
                    })
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
        return (
            <FullpageForm
                heading={translations.videoFileSelection.heading(this.state.sessionName)}>
                <Stack spacing={1}>
                    <FilePicker
                        accept=".mp4"
                        onFileChosen={this.onFileChosen}
                        inputId="session-video-file"/>
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{display: this.state.formError ? 'block' : 'none'}}>
                        {this.state.formError}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{height: '3em'}}
                        disabled={!this.state.fileUrl}
                        onClick={this.onProceedClick}>
                        {translations.videoFileSelection.proceed}
                    </Button>
                </Stack>
            </FullpageForm>
        )
    }
}

export default (props) => {
    const navigate = useNavigate()
    return <VideoFileSelectionScreen {...props} navigate={navigate}/>
}
