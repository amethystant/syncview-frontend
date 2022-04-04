import React from 'react'
import {Chip, IconButton, ListItem, ListItemText, Menu, MenuItem, Typography} from '@mui/material'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import translations from '../translations'
import {admitGuest, elevateGuest, kickGuest} from '../useCases'

class GuestListItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuAnchor: null
        }

        this.onMenuIconClick = this.onMenuIconClick.bind(this)
        this.onMenuClosed = this.onMenuClosed.bind(this)
        this.onAdmitClick = this.onAdmitClick.bind(this)
        this.onElevateClick = this.onElevateClick.bind(this)
        this.onKickClick = this.onKickClick.bind(this)
    }

    onMenuIconClick(event) {
        this.setState({
            menuAnchor: event.target
        })
    }

    onMenuClosed() {
        this.setState({
            menuAnchor: null
        })
    }

    onAdmitClick() {
        admitGuest(this.props.guest.id)
            .catch(error => {
                this.props.onError(translations.guestListItem.errors.genericOperation)
            })
    }

    onElevateClick() {
        elevateGuest(this.props.guest.id)
            .catch(error => {
                this.props.onError(translations.guestListItem.errors.genericOperation)
            })
    }

    onKickClick() {
        kickGuest(this.props.guest.id)
            .catch(error => {
                this.props.onError(translations.guestListItem.errors.genericOperation)
            })
    }

    render() {
        let menuItems = []
        if (this.props.isCurrentHost) {
            if (this.props.isAwaitingAdmission) {
                const admitItem = (
                    <MenuItem onClick={this.onAdmitClick}>
                        {translations.guestListItem.admit}
                    </MenuItem>
                )
                const rejectItem = (
                    <MenuItem onClick={this.onKickClick}>
                        {translations.guestListItem.reject}
                    </MenuItem>
                )

                menuItems.push(admitItem)
                menuItems.push(rejectItem)
            } else if (!this.props.isCurrent && !this.props.guest.isHost) {
                const elevateItem = (
                    <MenuItem onClick={this.onElevateClick}>
                        {translations.guestListItem.elevate}
                    </MenuItem>
                )

                const kickItem = (
                    <MenuItem onClick={this.onKickClick}>
                        {translations.guestListItem.kick}
                    </MenuItem>
                )

                menuItems.push(elevateItem)
                menuItems.push(kickItem)
            }
        }

        return (
            <ListItem dense={true}>
                <ListItemText primary={<Typography noWrap={false}>{this.props.guest.name}</Typography>}/>
                <Chip
                    variant="filled"
                    size="small"
                    label={translations.guestListItem.currentGuestLabel}
                    sx={{
                        ml: 1,
                        display: this.props.isCurrent ? 'flex' : 'none'
                    }}/>
                <Chip
                    variant="outlined"
                    size="small"
                    label={translations.guestListItem.onlineLabel}
                    sx={{
                        ml: 1,
                        display: this.props.guest.isOnline && !this.props.isCurrent ? 'flex' : 'none'
                    }}/>
                <Chip
                    variant="outlined"
                    size="small"
                    label={translations.guestListItem.hostLabel}
                    sx={{
                        ml: 1,
                        display: this.props.guest.isHost ? 'flex' : 'none'
                    }}/>
                <IconButton
                    sx={{display: menuItems.length ? 'block' : 'none'}}
                    onClick={event => this.onMenuIconClick(event)}>
                    <MoreVertSharpIcon/>
                </IconButton>
                <Menu
                    anchorEl={this.state.menuAnchor}
                    open={!!this.state.menuAnchor}
                    onClose={this.onMenuClosed}>
                    {menuItems}
                </Menu>
            </ListItem>
        )
    }
}

export default GuestListItem