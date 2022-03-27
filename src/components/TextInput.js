import React from 'react'

class TextInput extends React.Component {

    render() {
        return (
            <input
                id={this.props.id}
                type="text"
                name={this.props.name}
                inputMode={this.props.inputMode}
                maxLength={this.props.maxLength}
                minLength={this.props.minLength}
                placeholder={this.props.placeholder}
            />
        )
    }
}

export default TextInput