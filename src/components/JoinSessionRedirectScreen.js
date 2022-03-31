import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import translations from '../translations'
import {setLocalStorageValue} from '../useCases'
import constants from '../constants'
import routeNames from '../routeNames'

class JoinSessionRedirectScreen extends React.Component {

    componentDidMount() {
        setLocalStorageValue(constants.storageKeys.SESSION_CODE, this.props.params.sessionCode)
        setTimeout(() => {
            this.props.navigate(routeNames.welcome)
        }, 300)
    }

    render() {
        return <h1>{translations.joinSessionRedirect.title}</h1>
    }

}

export default props => {
    const navigate = useNavigate()
    const params = useParams()
    return <JoinSessionRedirectScreen {...props} navigate={navigate} params={params}/>
}
