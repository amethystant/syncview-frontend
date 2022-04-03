import React from 'react'
import {Box, Button, Input, Typography} from '@mui/material'
import translations from '../translations'

class FilePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fileName: ''
        }
        this.handleFileChosen = this.handleFileChosen.bind(this)
        this.inputRef = React.createRef()
    }

    handleFileChosen() {
        const file = this.inputRef.current.files[0]
        this.setState({
            fileName: file.name
        })
        const url = URL.createObjectURL(file)
        this.props.onFileChosen(url)
    }

    render() {
        return (
            <Box>
                <label htmlFor={this.props.inputId}>
                    <Button
                        variant="outlined"
                        component="span"
                        sx={{mr: 1}}>
                        {translations.fileChooser.text}
                    </Button>
                    <Input
                        inputRef={this.inputRef}
                        sx={{display: 'none'}}
                        id={this.props.inputId}
                        type="file"
                        accept={this.props.accept}
                        onChange={this.handleFileChosen}/>
                    <Typography
                        variant="overline">
                        {this.state.fileName}
                    </Typography>
                </label>
            </Box>
        )
    }
}

export default FilePicker