import React from 'react'
import {useNavigate} from 'react-router-dom'
import FilePicker from './FilePicker'
import routeNames from '../routeNames'
import {getSessionState, setLocalStorageValue} from '../useCases'
import constants from '../constants'

class VideoFileSelectionScreen extends React.Component {

    constructor(props) {
        super(props)

        this.onFileChosen = this.onFileChosen.bind(this)
    }

    componentDidMount() {
        getSessionState()
            .then(remoteState => {
                if (remoteState.isAwaitingAdmission) {
                    this.props.navigate(routeNames.waitingRoom)
                }
            })
            .catch(error => {
                if (error.isAuthorization) {
                    this.props.navigate(routeNames.noAccess)
                    return
                }

                // todo handle other error
            })
    }

    onFileChosen(url) {
        // todo verify files first
        setLocalStorageValue(constants.storageKeys.FILE_URL, url)
        this.props.navigate(routeNames.playback)
    }

    render() {
        return (
            <div>
                <FilePicker
                    accept=".mp4"
                    onFileChosen={this.onFileChosen}/>
            </div>
        )
    }
}

export default (props) => {
    const navigate = useNavigate()
    return <VideoFileSelectionScreen {...props} navigate={navigate}/>
}
