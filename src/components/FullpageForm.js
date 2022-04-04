import React from 'react'
import {Box, Card, Container, Typography} from '@mui/material'

class FullpageForm extends React.Component {

    render() {
        return (
            <Box
                backgroundColor="background.default"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                minHeight="100vh">
                <Typography
                    variant="h3"
                    align="center"
                    sx={{mb: 2}}>
                    {this.props.heading}
                </Typography>
                <Container maxWidth="sm">
                    <Card sx={{p: 3}}>
                        {this.props.children}
                    </Card>
                </Container>
            </Box>
        )
    }
}

export default FullpageForm