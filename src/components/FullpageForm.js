import React from 'react'
import {Box, Card, Container, Typography} from '@mui/material'
import GenericPage from './GenericPage'

class FullpageForm extends React.Component {

    render() {
        return (
            <GenericPage>
                <Container maxWidth="sm">
                    <Card sx={{py: 3, px: 4}}>
                        <Typography
                            variant="h4"
                            align="center"
                            sx={{mb: 3}}>
                            {this.props.heading}
                        </Typography>
                        {this.props.children}
                    </Card>
                </Container>
            </GenericPage>
        )
    }
}

export default FullpageForm