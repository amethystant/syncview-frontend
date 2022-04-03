import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Link, Typography} from '@mui/material'
import translations from '../translations'
import {getSessionStateUpdates, setDocumentTitle} from '../useCases'
import routeNames from '../routeNames'

class WaitingRoomScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            errorMessage: ''
        }
    }

    componentDidMount() {
        setDocumentTitle(translations.waitingRoom.title)
        this.sessionStateUpdatesJob = getSessionStateUpdates(remoteState => {
            if (remoteState.isAwaitingAdmission !== true) {
                this.props.navigate(routeNames.videoFileSelection)
            }
        }, () => {
            this.setState({
                errorMessage: translations.waitingRoom.errors.websocketClosed
            })
        })
    }

    componentWillUnmount() {
        if (this.sessionStateUpdatesJob) {
            this.sessionStateUpdatesJob.cancel()
            delete this.sessionStateUpdatesJob
        }
    }

    render() {
        return (
            <Box
                backgroundColor="primary.dark"
                minHeight="100vh"
                display="flex"
                flexDirection="column">
                <Link href={routeNames.welcome} sx={{m: 1}}>{translations.waitingRoom.backHome}</Link>
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{mb: 2}}>
                        {translations.waitingRoom.heading}
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{mb: 2}}>
                        {translations.waitingRoom.subheading}
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="error"
                        sx={{display: this.state.errorMessage ? 'block' : 'none'}}>
                        {this.state.errorMessage ?? ''}
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WaitingRoomScreen {...props} navigate={navigate}/>
}
