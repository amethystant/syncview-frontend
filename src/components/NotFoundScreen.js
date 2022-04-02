import React from 'react'
import {Link} from 'react-router-dom'
import translations from '../translations'
import routeNames from '../routeNames'
import {setDocumentTitle} from '../useCases'


class NotFoundScreen extends React.Component {

    componentDidMount() {
        setDocumentTitle(translations.notFound.title)
    }

    render() {
        return (
            <div>
                <h1>{translations.notFound.notFound}</h1>
                <Link to={routeNames.welcome}>{translations.notFound.backHome}</Link>
            </div>
        )
    }
}

export default NotFoundScreen
