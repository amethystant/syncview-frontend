import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Button, CircularProgress, FormControlLabel, Stack, Switch, TextField, Typography} from '@mui/material'
import FilePicker from './FilePicker'
import translations from '../translations'
import {createSession, setDocumentTitle, setLocalStorageValue} from '../useCases'
import routeNames from '../routeNames'
import constants from '../constants'
import FullpageForm from './FullpageForm'

class SessionCreationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            hostName: '',
            isWaitingRoom: false,
            isControlsAllowed: true,
            fileUrl: null,
            formError: '',
            createLoading: false
        }

        this.createPromise = null

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

        if (this.createPromise) {
            return
        }

        this.setState({
            createLoading: true
        })

        const fileDescription = '-' // todo make file description
        this.createPromise = createSession(name, hostName, isWaitingRoom, isControlsAllowed, fileDescription)
            .then(() => setLocalStorageValue(constants.storageKeys.FILE_URL, fileUrl))
            .then(() => this.navigateToPlayback())
            .catch(error => {
                this.createPromise = null
                this.setState({
                    formError: translations.sessionCreation.errors.createFailed,
                    createLoading: false
                })
            })
    }

    navigateToPlayback() {
        this.props.navigate(routeNames.playback)
    }

    render() {
        return (
            <FullpageForm
                heading={translations.sessionCreation.heading}>
                <Stack spacing={1}>
                    <TextField
                        name="name"
                        type="text"
                        variant="outlined"
                        inputProps={{maxLength: 20}}
                        value={this.state.name}
                        onChange={this.onInputChange}
                        label={translations.sessionCreation.sessionName}/>
                    <TextField
                        name="hostName"
                        type="text"
                        variant="outlined"
                        inputProps={{maxLength: 20}}
                        value={this.state.hostName}
                        onChange={this.onInputChange}
                        label={translations.sessionCreation.hostName}/>
                    <FormControlLabel
                        control={
                            <Switch
                                name="isWaitingRoom"
                                checked={this.state.isWaitingRoom}
                                onChange={this.onInputChange}/>
                        }
                        label={translations.sessionCreation.waitingRoom}/>
                    <FormControlLabel
                        control={
                            <Switch
                                name="isControlsAllowed"
                                checked={this.state.isControlsAllowed}
                                onChange={this.onInputChange}/>
                        }
                        label={translations.sessionCreation.controlsAllowed}/>
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
                    <Box
                        height="3em"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{display: this.state.createLoading ? 'flex' : 'none'}}>
                        <CircularProgress sx={{width: '100%'}}/>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            height: '3em',
                            display: this.state.createLoading ? 'none' : 'block'
                        }}
                        disabled={!this.state.name || !this.state.hostName || !this.state.fileUrl}
                        onClick={this.onCreateClicked}>
                        {translations.sessionCreation.create}
                    </Button>
                </Stack>
            </FullpageForm>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <SessionCreationScreen {...props} navigate={navigate}/>
}
