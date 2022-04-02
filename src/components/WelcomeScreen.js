import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import routeNames from '../routeNames'
import translations from '../translations'
import {accessSession, getLocalStorageValue, setDocumentTitle} from '../useCases'
import constants from '../constants'

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sessionCode: '',
            guestName: '',
            formError: ''
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

        if (!this.state.sessionCode || !this.state.guestName) {
            this.setState({
                formError: translations.welcome.errors.invalidData
            })
            return
        }

        this.setState({
            formError: ''
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
                if (this.accessPromise) {
                    this.accessPromise = null
                }

                this.setState({
                    formError: translations.welcome.errors.accessFailed
                })
            })
    }

    render() {
        const formError = this.state.formError ? (
            <p>{this.state.formError}<br/></p>
        ) : ''

        return (
            <div>
                <Link to={routeNames.sessionCreation}>
                    {translations.welcome.create}
                </Link>
                <form>
                    {formError}
                    <input
                        name="sessionCode"
                        type="text"
                        required={true}
                        value={this.state.sessionCode}
                        onChange={this.onInputChange}
                        style={{textTransform: 'uppercase'}}
                        placeholder={translations.welcome.sessionCode}/>
                    <br/>
                    <input
                        name="guestName"
                        type="text"
                        required={true}
                        value={this.state.guestName}
                        onChange={this.onInputChange}
                        placeholder={translations.welcome.guestName}/>
                    <br/>
                    <button
                        type="button"
                        onClick={this.onJoinClicked}>
                        {translations.welcome.join}
                    </button>
                </form>
            </div>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    return <WelcomeScreen {...props} navigate={navigate}/>
}
