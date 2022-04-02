import React from 'react'
import {useNavigate} from 'react-router-dom'
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
            <div>
                <h1>{translations.waitingRoom.heading}</h1>
                <p>{this.state.errorMessage ?? ''}</p>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WaitingRoomScreen {...props} navigate={navigate}/>
}
