import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Typography} from '@mui/material'
import translations from '../translations'
import {getSessionStateUpdates, setDocumentTitle} from '../useCases'
import routeNames from '../routeNames'
import GenericPage from './GenericPage'

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
            <GenericPage>
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{color: 'text.primary'}}>
                        {translations.waitingRoom.heading}
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="error"
                        sx={{display: this.state.errorMessage ? 'block' : 'none', mt: 4}}>
                        {this.state.errorMessage ?? ''}
                    </Typography>
                </Container>
            </GenericPage>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WaitingRoomScreen {...props} navigate={navigate}/>
}
