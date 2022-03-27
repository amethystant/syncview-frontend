
import React from 'react'
import {Link} from 'react-router-dom'
import translations from '../translations'
import routeNames from '../routeNames'

export default function NotFoundScreen() {
    return (
        <div>
            <h1>{translations.notFound.notFound}</h1>
            <Link to={routeNames.welcome}>{translations.notFound.backHome}</Link>
        </div>
    )
}
