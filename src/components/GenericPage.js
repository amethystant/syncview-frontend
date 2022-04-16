import React from 'react'
import {Box, Link, Typography} from '@mui/material'
import AppLogoLarge from './AppLogoLarge'
import routeNames from '../routeNames'

class GenericPage extends React.Component {

    render() {
        return (
            <Box
                backgroundColor="background.default"
                display="flex"
                flexDirection="column"
                sx={{pt: 3, height: '100vh', minHeight: 600}}>
                <Typography
                    align="center"
                    sx={{position: 'absolute', width: '100%'}}>
                    <Link href={routeNames.welcome} sx={{textDecorationLine: 'none'}}>
                        <AppLogoLarge/>
                    </Link>
                </Typography>
                <Box
                    flexGrow={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column">
                    {this.props.children}
                </Box>
            </Box>
        )
    }
}

export default GenericPage