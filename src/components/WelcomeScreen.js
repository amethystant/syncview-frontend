import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import routeNames from '../routeNames'
import translations from '../translations'
import {accessSession} from '../useCases'

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sessionCode: '',
            guestName: ''
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.onJoinClicked = this.onJoinClicked.bind(this)
    }

    onInputChange(event) {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: newValue
        })
    }

    onJoinClicked() {
        if (!this.state.sessionCode || !this.state.guestName) {
            // todo user input error
            return
        }

        // todo make sure user can't click again

        accessSession(this.state.sessionCode, this.state.guestName)
            .then(response => {
                if (response.isAwaitingAdmission) {
                    this.props.navigate(routeNames.waitingRoom)
                } else {
                    this.props.navigate(routeNames.videoFileSelection)
                }
            })
            .catch(error => {
                // todo error
            })
    }

    render() {
        return (
            <div>
                <Link to={routeNames.sessionCreation}>
                    {translations.welcome.create}
                </Link>
                <form>
                    <input
                        name="sessionCode"
                        type="text"
                        value={this.state.sessionCode}
                        onChange={this.onInputChange}
                        placeholder={translations.welcome.sessionCode}/>
                    <br/>
                    <input
                        name="guestName"
                        type="text"
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
