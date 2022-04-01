import React from 'react'
import translations from '../translations'
import {putLinkToClipboard} from '../useCases'
import GuestListItem from './GuestListItem'

class PlaybackSessionDetails extends React.Component {

    constructor(props) {
        super(props)

        this.onCopyLinkClick = this.onCopyLinkClick.bind(this)
    }

    onCopyLinkClick() {
        putLinkToClipboard()
            .then(() => {
                // todo show success message
            })
            .catch(error => {
                // todo show error
            })
    }

    render() {
        const sortCriteria = [
            (guest) => guest.id === this.props.guestId,
            (guest) => guest.isHost
        ]
        const guestListItems = this.props.guests.sort((left, right) => {
            for (let i = 0; i < sortCriteria.length; i++) {
                if (sortCriteria[i](left) && !sortCriteria[i](right)) {
                    return -1
                } else if (!sortCriteria[i](left) && sortCriteria[i](right)) {
                    return 1
                }
            }
            return 0
        }).map(guest => {
            return (
                <GuestListItem
                    key={guest.id}
                    isCurrent={guest.id === this.props.guestId}
                    guest={guest}
                    isCurrentHost={this.props.isHost}
                    isAwaitingAdmission={false}/>
            )
        })

        const admissionRequestsItems = this.props.admissionRequests.map(request => {
            return (
                <GuestListItem
                    key={request.guestId}
                    isCurrent={false}
                    guest={request}
                    isCurrentHost={this.props.isHost}
                    isAwaitingAdmission={true}/>
            )
        })

        return (
            <div>
                <p>{translations.playbackSessionDetails.sessionCode(this.props.sessionCode)}</p>
                <button type="button" onClick={this.onCopyLinkClick}>
                    {translations.playbackSessionDetails.copyLink}
                </button>
                <h6>{translations.playbackSessionDetails.guestListTitle}</h6>
                <ul>
                    {guestListItems}
                </ul>
                <h6>
                    {admissionRequestsItems.length ? translations.playbackSessionDetails.admissionRequestsTitle : ''}
                </h6>
                <ul>
                    {admissionRequestsItems}
                </ul>
            </div>
        )
    }
}

export default PlaybackSessionDetails