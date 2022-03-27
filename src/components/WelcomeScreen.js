import React from 'react'
import {Link} from 'react-router-dom'
import routeNames from '../routeNames'
import translations from '../translations'

class WelcomeScreen extends React.Component {

    render() {
        return (
            <div>
                <Link to={routeNames.sessionCreation}>
                    {translations.welcome.create}
                </Link>
            </div>
        )
    }
}

export default WelcomeScreen