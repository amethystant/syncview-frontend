import React from 'react'
import translations from '../translations'
import {putLinkToClipboard} from '../useCases'

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
        return (
            <div>
                <p>{translations.playback.sessionCode(this.props.sessionCode)}</p>
                <button type="button" onClick={this.onCopyLinkClick}>{translations.playback.copyLink}</button>
            </div>
        )
    }

}

export default PlaybackSessionDetails