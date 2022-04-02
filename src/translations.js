const appName = 'SyncView'

const languages = {
    en: {
        appName: appName,
        notFound: {
            title: `Not Found - ${appName}`,
            notFound: 'Page not found',
            backHome: 'Back to homepage'
        },
        welcome: {
            title: appName,
            create: 'Create session',
            sessionCode: 'Session code',
            guestName: 'Nickname',
            join: 'Join'
        },
        sessionCreation: {
            title: `Create Session - ${appName}`,
            sessionName: 'Session name',
            hostName: 'Host nickname',
            waitingRoom: 'Waiting room',
            controlsAllowed: 'Controls allowed',
            create: 'Create session'
        },
        waitingRoom: {
            title: `Waiting room - ${appName}`,
            heading: 'Waiting for admission by host...'
        },
        videoFileSelection: {
            title: sessionName => `${sessionName} - ${appName}`,
            heading: sessionName => `Welcome to ${sessionName}!`
        },
        playback: {
            title: sessionName => `${sessionName} - ${appName}`
        },
        playbackSessionDetails: {
            sessionCode: sessionCode => `This is your session code: ${sessionCode.toUpperCase()}`,
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
            title: appName,
            heading: 'Redirecting...'
        },
        noAccess: {
            title: appName,
            heading: 'The session has either expired or you don\'t have access to it.',
            backHome: 'Back to homepage'
        }
    }
}

const current = languages.en // todo figure out what language to use

export default current