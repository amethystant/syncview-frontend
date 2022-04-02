import React from 'react'
import translations from '../translations'
import {updateState} from '../useCases'

class PlaybackSessionSettings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: true,
            sessionName: props.sessionName,
            isWaitingRoom: props.isWaitingRoom,
            isControlsAllowed: props.isControlsAllowed
        }

        this.onOpenClick = this.onOpenClick.bind(this)
        this.onCloseClick = this.onCloseClick.bind(this)
        this.onSaveClick = this.onSaveClick.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }

    resetState() {
        this.setState({
            isCollapsed: true,
            sessionName: this.props.sessionName,
            isWaitingRoom: this.props.isWaitingRoom,
            isControlsAllowed: this.props.isControlsAllowed
        })
    }

    onOpenClick() {
        this.resetState()
        this.setState({
            isCollapsed: false
        })
    }

    onCloseClick() {
        this.resetState()
    }

    onSaveClick() {
        // todo validate name

        const outboundState = {
            name: this.state.sessionName,
            isWaitingRoom: this.state.isWaitingRoom,
            isControlsAllowed: this.state.isControlsAllowed
        }

        updateState(outboundState)
            .then(() => {
                this.resetState()
            })
            .catch(error => {
                this.props.onError(translations.playbackSessionSettings.errors.save)
            })
    }

    onInputChange(event) {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: newValue
        })
    }

    render() {
        if (this.state.isCollapsed) {
            return (
                <button type="button" onClick={this.onOpenClick}>
                    {translations.playbackSessionSettings.open}
                </button>
            )
        }

        return (
            <form>
                <button type="button" onClick={this.onCloseClick}>{translations.playbackSessionSettings.close}</button>
                <br/>
                <input
                    name="sessionName"
                    type="text"
                    value={this.state.sessionName}
                    onChange={this.onInputChange}
                    placeholder={translations.playbackSessionSettings.sessionName}/>
                <br/>
                <label>
                    <input
                        name="isWaitingRoom"
                        type="checkbox"
                        checked={this.state.isWaitingRoom}
                        onChange={this.onInputChange}/>
                    {translations.playbackSessionSettings.waitingRoom}
                </label>
                <br/>
                <label>
                    <input
                        name="isControlsAllowed"
                        type="checkbox"
                        checked={this.state.isControlsAllowed}
                        onChange={this.onInputChange}/>
                    {translations.playbackSessionSettings.controlsAllowed}
                </label>
                <button
                    type="button"
                    onClick={this.onSaveClick}>
                    {translations.playbackSessionSettings.save}
                </button>
            </form>
        )
    }
}

export default PlaybackSessionSettings