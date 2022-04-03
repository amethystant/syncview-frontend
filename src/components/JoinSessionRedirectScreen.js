import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Box, Typography} from '@mui/material'
import translations from '../translations'
import {setDocumentTitle, setLocalStorageValue} from '../useCases'
import constants from '../constants'
import routeNames from '../routeNames'

class JoinSessionRedirectScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.joinSessionRedirect.title)
        setLocalStorageValue(constants.storageKeys.SESSION_CODE, this.props.params.sessionCode)
        setTimeout(() => {
            this.props.navigate(routeNames.welcome)
        }, 300)
    }

    render() {
        return (
            <Box
                backgroundColor="primary.dark"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                minHeight="100vh">
                <Typography
                    variant="h3"
                    align="center"
                    sx={{mb: 2}}>
                    {translations.joinSessionRedirect.heading}
                </Typography>
                <Typography
                    variant="h4"
                    align="center">
                    {translations.joinSessionRedirect.subheading}
                </Typography>
            </Box>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    const params = useParams()
    return <JoinSessionRedirectScreen {...props} navigate={navigate} params={params}/>
}
