import React from 'react'
import translations from '../translations'
import {admitGuest, elevateGuest, kickGuest} from '../useCases'

class GuestListItem extends React.Component {

    constructor(props) {
        super(props)

        this.onAdmitClick = this.onAdmitClick.bind(this)
        this.onElevateClick = this.onElevateClick.bind(this)
        this.onKickClick = this.onKickClick.bind(this)
    }

    onAdmitClick() {
        admitGuest(this.props.guest.id)
            .catch(error => {
                // todo handle error
            })
    }

    onElevateClick() {
        elevateGuest(this.props.guest.id)
            .catch(error => {
                // todo handle error
            })
    }

    onKickClick() {
        kickGuest(this.props.guest.id)
            .catch(error => {
                // todo handle error
            })
    }

    render() {
        let labelsText = this.props.guest.isOnline ? translations.guestListItem.onlineLabel + ', ' : ''
        labelsText += this.props.isCurrent ? translations.guestListItem.currentGuestLabel + ', ' : ''
        labelsText += this.props.guest.isHost ? translations.guestListItem.hostLabel : ''

        let buttons = []
        if (this.props.isCurrentHost) {
            if (this.props.isAwaitingAdmission) {
                const button = (
                    <button type="button" onClick={this.onAdmitClick}>
                        {translations.guestListItem.admit}
                    </button>
                )
                buttons.push(button)
            } else if (!this.props.isCurrent && !this.props.guest.isHost) {
                const elevateButton = (
                    <button type="button" onClick={this.onElevateClick}>
                        {translations.guestListItem.elevate}
                    </button>
                )

                const kickButton = (
                    <button type="button" onClick={this.onKickClick}>
                        {translations.guestListItem.kick}
                    </button>
                )

                buttons.push(elevateButton)
                buttons.push(kickButton)
            }
        }

        return (
            <li>
                {this.props.guest.name} {labelsText}
                {buttons}
            </li>
        )
    }
}

export default GuestListItem