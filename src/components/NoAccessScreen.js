import React from 'react'
import {Link} from 'react-router-dom'
import translations from '../translations'
import routeNames from '../routeNames'

export default function () {
    return (
        <div>
            <h1>{translations.noAccess.title}</h1>
            <Link to={routeNames.welcome}>{translations.noAccess.backHome}</Link>
        </div>
    )
}
