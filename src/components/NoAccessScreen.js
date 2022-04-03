import React from 'react'
import {Box, Link, Typography} from '@mui/material'
import translations from '../translations'
import routeNames from '../routeNames'
import {setDocumentTitle} from '../useCases'

class NoAccessScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.noAccess.title)
    }

    render() {
        return (
            <Box
                backgroundColor="primary.dark"
                minHeight="100vh"
                display="flex"
                flexDirection="column">
                <Link href={routeNames.welcome} sx={{m: 1}}>{translations.noAccess.backHome}</Link>
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{mb: 2}}>
                        {translations.noAccess.heading}
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center">
                        {translations.noAccess.subheading}
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default NoAccessScreen
