const routeNames = {
    welcome: '/',
    playback: '/watch',
    sessionCreation: '/create-session',
    waitingRoom: '/waiting-room',
    videoFileSelection: '/choose-file',
    noAccess: '/no-access',
    joinSessionRedirect: (sessionCode) => {
        return sessionCode ? `/join/${sessionCode}` : '/join/:sessionCode'
    }
}

export default routeNames
