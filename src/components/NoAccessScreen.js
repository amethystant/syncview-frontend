import React from 'react'
import {Link} from 'react-router-dom'
import translations from '../translations'
import routeNames from '../routeNames'
import {setDocumentTitle} from '../useCases'

class NoAccessScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.noAccess.title)
    }

    render() {
        return (
            <div>
                <h1>{translations.noAccess.heading}</h1>
                <Link to={routeNames.welcome}>{translations.noAccess.backHome}</Link>
            </div>
        )
    }
}

export default NoAccessScreen
