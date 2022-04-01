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
        },
        playbackSessionDetails: {
            sessionCode: (sessionCode) => `This is your session code: ${sessionCode.toUpperCase()}`,
            copyLink: 'Copy link to share',
            guestListTitle: 'Guests:',
            admissionRequestsTitle: 'Admission requests:'
        },
        guestListItem: {
            onlineLabel: 'Online',
            hostLabel: 'Host',
            currentGuestLabel: 'You',
            admit: 'Admit to session',
            elevate: 'Make co-host',
            kick: 'Kick'
        },
        playbackSessionSettings: {
            open: 'Open session settings',
            close: 'Close',
            sessionName: 'Session name',
            waitingRoom: 'Waiting room',
            controlsAllowed: 'Controls allowed',
            save: 'Save'
        },
        joinSessionRedirect: {
            title: 'Redirecting...'
        },
        noAccess: {
            title: 'The session has either expired or you don\'t have access to it.',
            backHome: 'Back to homepage'
        }
    }
}

const current = languages.en // todo figure out what language to use

export default current