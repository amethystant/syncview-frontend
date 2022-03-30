import React from 'react'
import {useNavigate} from 'react-router-dom'
import translations from '../translations'
import {getLocalStorageValue, getSessionStateUpdates} from '../useCases'
import constants from '../constants'
import routeNames from '../routeNames'

class WaitingRoomScreen extends React.Component {

    componentDidMount() {
        const sessionCode = getLocalStorageValue(constants.storageKeys.SESSION_CODE)
        this.sessionStateUpdatesJob = getSessionStateUpdates(sessionCode, remoteState => {
            if (remoteState.isAwaitingAdmission !== true) {
                this.props.navigate(routeNames.videoFileSelection)
            }
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
