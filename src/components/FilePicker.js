import React from 'react'

class FilePicker extends React.Component {

    constructor(props) {
        super(props)
        this.handleFileChosen = this.handleFileChosen.bind(this)
        this.inputRef = React.createRef()
    }

    handleFileChosen() {
        const file = this.inputRef.current.files[0]
        const url = URL.createObjectURL(file)
        this.props.onFileChosen(url)
    }

    render() {
        return (
            <input
                ref={this.inputRef}
                type="file"
                accept={this.props.accept}
                onChange={this.handleFileChosen}/>
        )
    }
}

export default FilePicker