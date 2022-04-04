import React from 'react'
import {Button, Card, List, Stack, Typography} from '@mui/material'
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
            <Card sx={{px: 3, pt: 2}}>
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        textAlign="center">
                        {this.props.sessionName}
                    </Typography>
                    <Typography
                        variant="body2"
                        textAlign="center">
                        {translations.playbackSessionDetails.sessionCode(this.props.sessionCode)}
                    </Typography>
                    <Button variant="text" onClick={this.onCopyLinkClick}>
                        {translations.playbackSessionDetails.copyLink}
                    </Button>
                    <Typography variant="h6">{translations.playbackSessionDetails.guestListTitle}</Typography>
                    <List
                        sx={{p: 0}}>
                        {guestListItems}
                    </List>
                    <Typography
                        variant="h6"
                        sx={{display: admissionRequestsItems.length ? 'block' : 'none'}}>
                        {admissionRequestsItems.length ? translations.playbackSessionDetails.admissionRequestsTitle : ''}
                    </Typography>
                    <List dense={true}>
                        {admissionRequestsItems}
                    </List>
                </Stack>
            </Card>
        )
    }
}

export default PlaybackSessionDetails