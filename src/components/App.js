import React from 'react'
import {Route, Routes} from 'react-router-dom'
import routeNames from '../routeNames'
import PlaybackScreen from './PlaybackScreen'
import WelcomeScreen from './WelcomeScreen'
import SessionCreationScreen from './SessionCreationScreen'
import NotFoundScreen from './NotFoundScreen'
import WaitingRoomScreen from './WaitingRoomScreen'
import VideoFileSelectionScreen from './VideoFileSelectionScreen'
import NoAccessScreen from './NoAccessScreen'

class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={routeNames.welcome} element={<WelcomeScreen/>}/>
                    <Route path={routeNames.sessionCreation} element={<SessionCreationScreen/>}/>
                    <Route path={routeNames.playback} element={<PlaybackScreen/>}/>
                    <Route path={routeNames.waitingRoom} element={<WaitingRoomScreen/>}/>
                    <Route path={routeNames.videoFileSelection} element={<VideoFileSelectionScreen/>}/>
                    <Route path={routeNames.noAccess} element={<NoAccessScreen/>}/>
                    <Route path="*" element={<NotFoundScreen/>}/>
                </Routes>
            </div>
        )
    }
}

export default App
