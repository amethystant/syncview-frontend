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
            .catch(error => {
                this.props.onError(translations.playbackSessionDetails.errors.clipboard)
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
                    isAwaitingAdmission={false}
                    onError={this.props.onError}/>
            )
        })

        const admissionRequestsItems = this.props.admissionRequests.map(request => {
            return (
                <GuestListItem
                    key={request.id}
                    isCurrent={false}
                    guest={request}
                    isCurrentHost={this.props.isHost}
                    isAwaitingAdmission={true}
                    onError={this.props.onError}/>
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