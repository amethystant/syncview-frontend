import React from 'react'
import {Container, Typography} from '@mui/material'
import translations from '../translations'
import GenericPage from './GenericPage'
import {setDocumentTitle} from '../useCases'

class NoAccessScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.appName)
    }

    render() {
        return (
            <GenericPage>
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{color: 'text.primary'}}>
                        {translations.noAccess.heading}
                    </Typography>
                </Container>
            </GenericPage>
        )
    }
}

export default NoAccessScreen
