import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    IconButton,
    Snackbar
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Player from './Player'
import constants from '../constants'
import {
    getSessionStateUpdates,
    updateState,
    getSessionState,
    getLocalStorageValue,
    setDocumentTitle,
    leaveSession
} from '../useCases'
import routeNames from '../routeNames'
import PlaybackSessionDetails from './PlaybackSessionDetails'
import PlaybackSessionSettings from './PlaybackSessionSettings'
import translations from '../translations'

const ERROR_MESSAGE_DURATION = 2000

class PlaybackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: getLocalStorageValue(constants.storageKeys.FILE_URL),
            videoType: getLocalStorageValue(constants.storageKeys.FILE_TYPE),
            sessionCode: getLocalStorageValue(constants.storageKeys.SESSION_CODE) ?? '',
            guestId: null,
            isHost: false,
            sessionName: '',
            guestName: '',
            isControlsGranted: true,
            expirationTs: 40000000000,
            isPlaying: false,
            position: {
                position: 0,
                updateTs: Date.now()
            },
            lastAction: null,
            guests: [],
            admissionRequests: [],
            isControlsAllowed: false,
            isWaitingRoom: true,
            isInitialStateLoaded: false,
            isForcePaused: false,
            error: null,
            isUserActive: true,
            isMouseWithinDisappearingChild: {},
            isLeaveDialogueOpen: false
        }

        this.timeoutIds = []

        this.onPlayOrPause = this.onPlayOrPause.bind(this)
        this.onUserSeek = this.onUserSeek.bind(this)
        this.onLeaveClick = this.onLeaveClick.bind(this)
        this.onLeaveConfirmed = this.onLeaveConfirmed.bind(this)
        this.onPlayerError = this.onPlayerError.bind(this)
        this.onUserActiveChange = this.onUserActiveChange.bind(this)
        this.onChildComponentError = this.onChildComponentError.bind(this)
        this.onMouseEnterOrLeaveDisappearingChild = this.onMouseEnterOrLeaveDisappearingChild.bind(this)
    }

    componentDidMount() {
        const {sessionCode} = this.state
        if (!sessionCode) {
            this.props.navigate(routeNames.noAccess)
            return
        }

        if (!this.state.videoUrl) {
            this.props.navigate(routeNames.videoFileSelection)
            return
        }

        this.sessionStateUpdatesJob =
            getSessionStateUpdates(remoteState => this.onRemoteStateChange(remoteState), () => {
                this.showErrorMessage(translations.playback.errors.stateFetchFailed, true, true)
                this.fetchSingleStateUpdate()
            })

        this.fetchSingleStateUpdate()
    }

    onRemoteStateChange(remoteState) {
        if (remoteState.isAwaitingAdmission) {
            this.props.navigate(routeNames.waitingRoom)
            return
        }

        setDocumentTitle(translations.playback.title(remoteState.name))

        const thisGuest = remoteState.guests.find(guest => guest.id === remoteState.guestId, this)
        this.setState({
            guestId: remoteState.guestId,
            isHost: thisGuest.isHost,
            sessionName: remoteState.name,
            guestName: thisGuest.name,
            isControlsGranted: remoteState.isControlsGranted,
            expirationTs: remoteState.expirationTs,
            isPlaying: remoteState.isPlaying,
            position: remoteState.position,
            lastAction: remoteState.lastAction,
            guests: remoteState.guests,
            admissionRequests: remoteState.admissionRequests ?? [],
            isControlsAllowed: remoteState.isControlsAllowed ?? false,
            isWaitingRoom: remoteState.isWaitingRoom ?? true,
            isInitialStateLoaded: true,
            isForcePaused: !remoteState.isControlsGranted ? this.state.isForcePaused : false
        })
    }

    onPlayOrPause(isPlaying) {
        if (!this.state.isInitialStateLoaded) {
            return
        }

        if (this.state.isForcePaused && isPlaying) {
            this.setState({
                isForcePaused: false
            })
        }

        if (isPlaying === this.state.isPlaying) {
            return
        }

        if (!this.state.isControlsGranted) {
            if (!isPlaying) {
                this.showErrorMessage(translations.playback.errors.pauseNotAllowed)
            }
            this.setState({
                isForcePaused: !isPlaying
            })
            return
        }

        const outboundState = {
            isPlaying: isPlaying
        }
        updateState(outboundState)
            .catch(error => {
                this.showErrorMessage(translations.playback.errors.stateUpdateFailed)
            })
    }

    onUserSeek(position) {
        if (!this.state.isInitialStateLoaded) {
            return
        }

        if (!this.state.isControlsGranted) {
            this.showErrorMessage(translations.playback.errors.controlsNotGranted)
            return
        }

        if (this.state.position.position === position) {
            return
        }

        const outboundState = {
            position: {
                position: position
            }
        }

        updateState(outboundState)
            .catch(error => {
                this.showErrorMessage(translations.playback.errors.stateUpdateFailed)
            })
    }

    onLeaveClick() {
        this.setState({
            isLeaveDialogueOpen: true
        })
    }

    onLeaveConfirmed() {
        leaveSession().finally(() => {
            this.props.navigate(routeNames.welcome)
        })
    }

    onPlayerError() {
        this.props.navigate(routeNames.videoFileSelection)
    }

    onUserActiveChange(active) {
        this.setState({
            isUserActive: active
        })
    }

    onChildComponentError(errorMessage) {
        this.showErrorMessage(errorMessage)
    }

    onMouseEnterOrLeaveDisappearingChild(childName, entered) {
        const newValues = this.state.isMouseWithinDisappearingChild
        newValues[childName] = entered
        this.setState({
            isMouseWithinDisappearingChild: newValues
        })
    }

    fetchSingleStateUpdate() {
        getSessionState()
            .then(remoteState => this.onRemoteStateChange(remoteState))
            .catch(error => {
                if (error.isAuthorization) {
                    this.props.navigate(routeNames.noAccess)
                    return
                }

                this.showErrorMessage(translations.playback.errors.stateFetchFailed)
            })
    }

    showErrorMessage(message, indefinite, showReloadButton) {
        indefinite = indefinite === true
        if (!indefinite && this.state.error && this.state.error.indefinite) {
            return
        }

        const dateNow = Date.now()
        this.setState({
            error: {
                time: dateNow,
                message: message,
                indefinite: indefinite,
                showReloadButton: showReloadButton === true
            }
        })

        if (indefinite) {
            return
        }

        const timeoutId = setTimeout(() => {
            if (this.state.error.time === dateNow) {
                this.setState({
                    error: null
                })
            }
        }, ERROR_MESSAGE_DURATION)

        this.timeoutIds.push(timeoutId)
    }

    componentWillUnmount() {
        if (this.sessionStateUpdatesJob) {
            this.sessionStateUpdatesJob.cancel()
            delete this.sessionStateUpdatesJob
        }

        this.timeoutIds.forEach(timeoutId => {
            clearTimeout(timeoutId)
        })
    }

    render() {
        return (
            <Box height="100vh">
                <Box position="absolute" height="100%" width="100%" zIndex={1}>
                    <Player
                        videoUrl={this.state.videoUrl}
                        videoType={this.state.videoType}
                        isSeekingAllowed={this.state.isControlsGranted}
                        isPlaying={this.state.isPlaying && !this.state.isForcePaused}
                        position={this.state.position}
                        onPause={position => this.onPlayOrPause(false)}
                        onPlay={position => this.onPlayOrPause(true)}
                        onUserSeek={position => this.onUserSeek(position)}
                        onPlayerError={this.onPlayerError}
                        onUserActiveChange={this.onUserActiveChange}/>
                </Box>
                <Dialog
                    open={this.state.isLeaveDialogueOpen}
                    onClose={() => this.setState({isLeaveDialogueOpen: false})}>
                    <DialogTitle>{translations.playback.leaveDialogue.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{translations.playback.leaveDialogue.content}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="text"
                            onClick={() => this.setState({isLeaveDialogueOpen: false})}>
                            {translations.playback.leaveDialogue.cancel}
                        </Button>
                        <Button variant="contained" onClick={this.onLeaveConfirmed}>
                            {translations.playback.leaveDialogue.confirm}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '1em',
                        left: '1em',
                        zIndex: 2
                    }}>
                    <Fade
                        in={
                            this.state.isMouseWithinDisappearingChild['close-button'] ||
                            this.state.isUserActive || !this.state.isPlaying
                        }>
                        <div
                            onMouseEnter={() => this.onMouseEnterOrLeaveDisappearingChild('close-button', true)}
                            onMouseLeave={() =>
                                this.onMouseEnterOrLeaveDisappearingChild('close-button', false)
                            }>
                            <IconButton
                                size="large"
                                sx={{color: 'grey.200'}}
                                onClick={this.onLeaveClick}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </Fade>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '1em',
                        right: '1em',
                        zIndex: 2
                    }}>
                    <Fade
                        in={
                            this.state.isMouseWithinDisappearingChild['details'] ||
                            this.state.isUserActive || !this.state.isPlaying
                        }>
                        <div
                            onMouseEnter={() => this.onMouseEnterOrLeaveDisappearingChild('details', true)}
                            onMouseLeave={() =>
                                this.onMouseEnterOrLeaveDisappearingChild('details', false)
                            }>
                            <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                                <Box sx={{maxHeight: '90vh', maxWidth: '45vw', overflow: 'auto'}}>
                                    <PlaybackSessionDetails
                                        sessionCode={this.state.sessionCode}
                                        sessionName={this.state.sessionName}
                                        isHost={this.state.isHost}
                                        guestId={this.state.guestId}
                                        guests={this.state.guests}
                                        admissionRequests={this.state.admissionRequests}
                                        onError={this.onChildComponentError}/>
                                </Box>
                                <Box sx={{
                                    display: this.state.isHost ? 'block' : 'none',
                                    mr: 2,
                                    maxHeight: '90vh',
                                    maxWidth: '45vw',
                                    overflow: 'auto'
                                }}>
                                    <PlaybackSessionSettings
                                        sessionName={this.state.sessionName}
                                        isWaitingRoom={this.state.isWaitingRoom}
                                        isControlsAllowed={this.state.isControlsAllowed}
                                        onError={this.onChildComponentError}
                                        onIsCollapsedChange={isCollapsed =>
                                            this.onMouseEnterOrLeaveDisappearingChild('details', !isCollapsed)
                                        }/>
                                </Box>
                            </Box>
                        </div>
                    </Fade>
                </Box>
                <Snackbar
                    open={this.state.error}
                    message={this.state.error ? this.state.error.message : ''}
                    action={
                        <Button
                            variant="text"
                            sx={{display: this.state.error && this.state.error.showReloadButton ? 'block' : 'none'}}
                            onClick={() => window.location.reload()}>
                            {translations.playback.reload}
                        </Button>
                    }/>
            </Box>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <PlaybackScreen  {...props} navigate={navigate}/>
}