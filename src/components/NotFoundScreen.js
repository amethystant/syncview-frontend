import React from 'react'
import {Box, Link, Typography} from '@mui/material'
import translations from '../translations'
import routeNames from '../routeNames'
import {setDocumentTitle} from '../useCases'


class NotFoundScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.notFound.title)
    }

    render() {
        return (
            <Box
                backgroundColor="primary.dark"
                minHeight="100vh"
                display="flex"
                flexDirection="column">
                <Link href={routeNames.welcome} sx={{m: 1}}>{translations.notFound.backHome}</Link>
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
                        {translations.notFound.heading}
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center">
                        {translations.notFound.subheading}
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default NotFoundScreen
