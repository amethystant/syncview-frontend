import React from 'react'
import {Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import routeNames from '../routeNames'
import PlaybackScreen from './PlaybackScreen'
import WelcomeScreen from './WelcomeScreen'
import SessionCreationScreen from './SessionCreationScreen'
import NotFoundScreen from './NotFoundScreen'
import WaitingRoomScreen from './WaitingRoomScreen'
import VideoFileSelectionScreen from './VideoFileSelectionScreen'
import NoAccessScreen from './NoAccessScreen'
import JoinSessionRedirectScreen from './JoinSessionRedirectScreen'
import {createTheme, ThemeProvider} from '@mui/material'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.themeOptions = {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#f5ac23'
                },
                secondary: {
                    main: '#f50057'
                }
            },
            shape: {
                borderRadius: 12
            }
        }
    }

    render() {
        return (
            <div>
                <CssBaseline enableColorScheme/>
                <ThemeProvider theme={createTheme(this.themeOptions)}>
                    <Routes>
                        <Route path={routeNames.welcome} element={<WelcomeScreen/>}/>
                        <Route path={routeNames.sessionCreation} element={<SessionCreationScreen/>}/>
                        <Route path={routeNames.playback} element={<PlaybackScreen/>}/>
                        <Route path={routeNames.waitingRoom} element={<WaitingRoomScreen/>}/>
                        <Route path={routeNames.videoFileSelection} element={<VideoFileSelectionScreen/>}/>
                        <Route path={routeNames.noAccess} element={<NoAccessScreen/>}/>
                        <Route path={routeNames.joinSessionRedirect()} element={<JoinSessionRedirectScreen/>}/>
                        <Route path="*" element={<NotFoundScreen/>}/>
                    </Routes>
                </ThemeProvider>
            </div>
        )
    }
}

export default App
