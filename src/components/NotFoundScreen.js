import React from 'react'
import {Container, Typography} from '@mui/material'
import translations from '../translations'
import {setDocumentTitle} from '../useCases'
import GenericPage from './GenericPage'

class NotFoundScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.notFound.title)
    }

    render() {
        return (
            <GenericPage>
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{color: 'text.primary'}}>
                        {translations.notFound.heading}
                    </Typography>
                </Container>
            </GenericPage>
        )
    }
}

export default NotFoundScreen
