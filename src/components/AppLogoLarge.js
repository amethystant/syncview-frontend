import React from 'react'
import {Typography} from '@mui/material'
import translations from '../translations'

class AppLogoLarge extends React.Component {

    render() {
        return (
            <Typography
                variant="h3"
                color="primary.main">
                <b>
                    <i>
                        {translations.appName}
                    </i>
                </b>
            </Typography>
        )
    }
}

export default AppLogoLarge