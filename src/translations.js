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
            join: 'Join',
            errors: {
                invalidData: 'Error: Invalid input.',
                accessFailed: 'Error: Could not join session. It might be expired.'
            }
        },
        sessionCreation: {
            title: `Create Session - ${appName}`,
            sessionName: 'Session name',
            hostName: 'Host nickname',
            waitingRoom: 'Waiting room',
            controlsAllowed: 'Controls allowed',
            create: 'Create session',
            errors: {
                invalidData: 'Error: Invalid input.'
            }
        },
        waitingRoom: {
            title: `Waiting room - ${appName}`,
            heading: 'Waiting for admission by host...',
            errors: {
                websocketClosed: 'Error: Cannot join session. You might have been rejected or you might have lost ' +
                    'connection.'
            }
        },
        videoFileSelection: {
            title: sessionName => `${sessionName} - ${appName}`,
            heading: sessionName => `Welcome to ${sessionName}!`,
            proceed: 'Proceed',
            errors: {
                missingFile: 'Error: Missing file.'
            }
        },
        playback: {
            title: sessionName => `${sessionName} - ${appName}`,
            reload: 'Reload page',
            errors: {
                controlsNotGranted: 'Error: You don\'t have permissions to control the playback.',
                stateUpdateFailed: 'Error: Could not synchronise your playback with the server. Check your internet ' +
                    'connection.',
                playOrPauseNotAllowed: 'You don\'t have permissions to control the playback. ' +
                    'Performing the action locally.',
                stateFetchFailed: 'Error: Could not synchronise your playback with the server. Check your internet ' +
                    'connection.',
                websocketClosed: 'Error: Connection to the session was lost.'
            }
        },
        playbackSessionDetails: {
            sessionCode: sessionCode => `This is your session code: ${sessionCode.toUpperCase()}`,
            copyLink: 'Copy link to share',
            guestListTitle: 'Guests:',
            admissionRequestsTitle: 'Admission requests:',
            errors: {
                clipboard: 'Error: Could not put link into your clipboard.'
            }
        },
        guestListItem: {
            onlineLabel: 'Online',
            hostLabel: 'Host',
            currentGuestLabel: 'You',
            admit: 'Admit to session',
            elevate: 'Make co-host',
            kick: 'Kick',
            errors: {
                genericOperation: 'Error: The operation failed.'
            }
        },
        playbackSessionSettings: {
            open: 'Open session settings',
            close: 'Close',
            sessionName: 'Session name',
            waitingRoom: 'Waiting room',
            controlsAllowed: 'Controls allowed',
            save: 'Save',
            errors: {
                invalidData: 'Error: Invalid input.',
                save: 'Error: Failed to save settings.'
            }
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