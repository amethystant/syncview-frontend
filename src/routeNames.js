const routeNames = {
    welcome: '/',
    playback: '/playback',
    sessionCreation: '/create',
    waitingRoom: '/waiting-room',
    videoFileSelection: '/file-selection',
    noAccess: '/no-access',
    joinSessionRedirect: (sessionCode) => {
        return sessionCode ? `/join/${sessionCode}` : '/join/:sessionCode'
    }
}

export default routeNames
