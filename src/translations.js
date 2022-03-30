const languages = {
    en: {
        notFound: {
            notFound: 'Page not found',
            backHome: 'Back to homepage'
        },
        welcome: {
            create: 'Create session',
            sessionCode: 'Session code',
            guestName: 'Nickname',
            join: 'Join'
        },
        sessionCreation: {
            sessionName: 'Session name',
            hostName: 'Host nickname',
            waitingRoom: 'Waiting room',
            controlsAllowed: 'Controls allowed',
            create: 'Create session'
        },
        waitingRoom: {
            title: 'Waiting for admission by host...'
        },
        videoFileSelection: {
            title: (sessionName) => `Welcome to ${sessionName}!`
        }
    }
}

const current = languages.en // todo figure out what language to use

export default current