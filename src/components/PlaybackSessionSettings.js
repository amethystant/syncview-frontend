import React from 'react'
import {
    Box,
    Button,
    Card,
    CircularProgress,
    FormControlLabel,
    IconButton,
    Stack,
    Switch,
    TextField
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import translations from '../translations'
import {updateState} from '../useCases'

class PlaybackSessionSettings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: true,
            sessionName: props.sessionName,
            isWaitingRoom: props.isWaitingRoom,
            isControlsAllowed: props.isControlsAllowed,
            isSaveLoading: false
        }

        this.onOpenClick = this.onOpenClick.bind(this)
        this.onCloseClick = this.onCloseClick.bind(this)
        this.onSaveClick = this.onSaveClick.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const isPropsUpdated = prevProps.sessionName !== this.props.sessionName ||
            prevProps.sessionName !== this.props.sessionName || prevProps.sessionName !== this.props.sessionName
        if (isPropsUpdated) {
            this.setState({
                sessionName: this.props.sessionName,
                isWaitingRoom: this.props.isWaitingRoom,
                isControlsAllowed: this.props.isControlsAllowed
            })
        }
    }

    resetState() {
        this.setState({
            sessionName: this.props.sessionName,
            isWaitingRoom: this.props.isWaitingRoom,
            isControlsAllowed: this.props.isControlsAllowed
        })
    }

    onOpenClick() {
        this.setState({
            isCollapsed: false
        })
        this.props.onIsCollapsedChange(true)
    }

    onCloseClick() {
        this.setState({
            isCollapsed: true
        })
        this.props.onIsCollapsedChange(true)
    }

    onSaveClick() {
        this.setState({
            isSaveLoading: true
        })
        const outboundState = {
            name: this.state.sessionName,
            isWaitingRoom: this.state.isWaitingRoom,
            isControlsAllowed: this.state.isControlsAllowed
        }

        updateState(outboundState)
            .then(() => {
                this.setState({
                    isSaveLoading: false
                })
            })
            .catch(error => {
                this.setState({
                    isSaveLoading: false
                })
                this.resetState()
                this.props.onError(translations.playbackSessionSettings.errors.save)
            })
    }

    onInputChange(event) {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: newValue
        })
    }

    render() {
        if (this.state.isCollapsed) {
            return (
                <IconButton
                    size="large"
                    sx={{color: 'grey.200'}}
                    onClick={this.onOpenClick}>
                    <SettingsIcon/>
                </IconButton>
            )
        }

        return (
            <Card>
                <Box sx={{p: 1}}>
                    <IconButton onClick={this.onCloseClick}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Stack sx={{px: 3, pb: 2}} spacing={1}>
                    <TextField
                        name="sessionName"
                        type="text"
                        variant="outlined"
                        inputProps={{maxLength: 20}}
                        value={this.state.sessionName}
                        onChange={this.onInputChange}
                        label={translations.playbackSessionSettings.sessionName}/>
                    <FormControlLabel
                        control={
                            <Switch
                                name="isWaitingRoom"
                                checked={this.state.isWaitingRoom}
                                onChange={this.onInputChange}/>
                        }
                        label={translations.playbackSessionSettings.waitingRoom}/>
                    <FormControlLabel
                        control={
                            <Switch
                                name="isControlsAllowed"
                                checked={this.state.isControlsAllowed}
                                onChange={this.onInputChange}/>
                        }
                        label={translations.playbackSessionSettings.controlsAllowed}/>
                    <Box
                        height="3em"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{display: this.state.isSaveLoading ? 'flex' : 'none'}}>
                        <CircularProgress sx={{width: '100%'}}/>
                    </Box>
                    <Button
                        variant="outlined"
                        sx={{
                            height: '3em',
                            display: this.state.isSaveLoading ? 'none' : 'block'
                        }}
                        disabled={!this.state.sessionName}
                        onClick={this.onSaveClick}>
                        {translations.playbackSessionSettings.save}
                    </Button>
                </Stack>
            </Card>
        )
    }
}

export default PlaybackSessionSettings