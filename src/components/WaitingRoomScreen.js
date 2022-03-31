import React from 'react'
import {useNavigate} from 'react-router-dom'
import translations from '../translations'
import {getSessionStateUpdates} from '../useCases'
import routeNames from '../routeNames'

class WaitingRoomScreen extends React.Component {

    componentDidMount() {
        this.sessionStateUpdatesJob = getSessionStateUpdates(remoteState => {
            if (remoteState.isAwaitingAdmission !== true) {
                this.props.navigate(routeNames.videoFileSelection)
            }
        }, () => {
            // todo put page into an error state (do not navigate away, this gets triggered when leaving the page as well)
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
                <h1>{translations.waitingRoom.title}</h1>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WaitingRoomScreen {...props} navigate={navigate}/>
}
