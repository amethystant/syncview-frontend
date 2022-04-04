import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Box, Typography} from '@mui/material'
import translations from '../translations'
import {setDocumentTitle, setLocalStorageValue} from '../useCases'
import constants from '../constants'
import routeNames from '../routeNames'
import GenericPage from './GenericPage'

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
            <GenericPage>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{color: 'text.primary'}}>
                    {translations.joinSessionRedirect.heading}
                </Typography>
            </GenericPage>
        )
    }
}

export default props => {
    const navigate = useNavigate()
    const params = useParams()
    return <JoinSessionRedirectScreen {...props} navigate={navigate} params={params}/>
}
