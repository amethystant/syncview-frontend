import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PlaybackScreen from './PlaybackScreen'
import WelcomeScreen from './WelcomeScreen'
import SessionCreationScreen from './SessionCreationScreen'
import NotFoundScreen from './NotFoundScreen'
import routeNames from '../routeNames'

class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={routeNames.welcome} element={<WelcomeScreen/>}/>
                    <Route path={routeNames.sessionCreation} element={<SessionCreationScreen/>}/>
                    <Route path={routeNames.playback} element={<PlaybackScreen/>}/>
                    <Route path="*" element={<NotFoundScreen/>}/>
                </Routes>
            </div>
        )
    }
}

export default App
