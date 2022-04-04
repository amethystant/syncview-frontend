import React from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import routeNames from '../routeNames'
import translations from '../translations'
import {accessSession, getLocalStorageValue, setDocumentTitle} from '../useCases'
import constants from '../constants'
import FullpageForm from './FullpageForm'

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sessionCode: '',
            guestName: '',
            formError: '',
            accessLoading: false
        }

        this.accessPromise = null

        this.onInputChange = this.onInputChange.bind(this)
        this.onJoinClicked = this.onJoinClicked.bind(this)
    }

    componentDidMount() {
        setDocumentTitle(translations.welcome.title)
        const sessionCode = getLocalStorageValue(constants.storageKeys.SESSION_CODE)
        if (sessionCode) {
            this.setState({
                sessionCode: sessionCode.toUpperCase()
            })
        }
    }

    onInputChange(event) {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: newValue
        })
    }

    onJoinClicked() {
        if (this.accessPromise) {
            return
        }

        this.setState({
            accessLoading: true
        })
        this.accessPromise = accessSession(this.state.sessionCode, this.state.guestName)
            .then(response => {
                if (response.isAwaitingAdmission) {
                    this.props.navigate(routeNames.waitingRoom)
                } else {
                    this.props.navigate(routeNames.videoFileSelection)
                }
            })
            .catch(error => {
                this.accessPromise = null

                this.setState({
                    formError: translations.welcome.errors.accessFailed,
                    accessLoading: false
                })
            })
    }

    render() {
        return (
            <FullpageForm
                heading={translations.welcome.heading}>
                <Stack spacing={2}>
                    <TextField
                        name="sessionCode"
                        type="text"
                        variant="outlined"
                        value={this.state.sessionCode}
                        onChange={this.onInputChange}
                        inputProps={{sx: {textTransform: 'uppercase'}}}
                        label={translations.welcome.sessionCode}/>
                    <TextField
                        name="guestName"
                        type="text"
                        variant="outlined"
                        inputProps={{maxLength: 20}}
                        value={this.state.guestName}
                        onChange={this.onInputChange}
                        label={translations.welcome.guestName}/>
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
                        sx={{display: this.state.accessLoading ? 'flex' : 'none'}}>
                        <CircularProgress sx={{width: '100%'}}/>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            height: '3em',
                            display: this.state.accessLoading ? 'none' : 'block'
                        }}
                        disabled={!this.state.guestName || !this.state.sessionCode}
                        onClick={this.onJoinClicked}>
                        {translations.welcome.join}
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{height: '3em'}}
                        onClick={() => this.props.navigate(routeNames.sessionCreation)}>
                        {translations.welcome.create}
                    </Button>
                </Stack>
            </FullpageForm>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WelcomeScreen {...props} navigate={navigate}/>
}
