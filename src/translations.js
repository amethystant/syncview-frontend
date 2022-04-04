const appName = 'SyncView'

const languages = {
    en: {
        appName: appName,
        notFound: {
            title: `Not Found - ${appName}`,
            heading: '404 Page not found :('
        },
        welcome: {
            title: appName,
            heading: `Welcome to ${appName}!`,
            create: 'Create session',
            sessionCode: 'Session code',
            guestName: 'Nickname',
            join: 'Join',
            errors: {
                accessFailed: 'Error: Could not join session. It might be expired.'
            }
        },
        sessionCreation: {
            title: `Create Session - ${appName}`,
            heading: 'Create session',
            sessionName: 'Session name',
            hostName: 'Host nickname',
            waitingRoom: 'Add waiting room',
            controlsAllowed: 'Everyone can control playback',
            create: 'Create session',
            errors: {
                createFailed: 'Error: Could not create session. Check your internet connection.'
            }
        },
        fileChooser: {
            text: 'Choose file'
        },
        waitingRoom: {
            title: `Waiting Room - ${appName}`,
            heading: 'Waiting for admission by host.',
            errors: {
                websocketClosed: 'Error: Cannot join session. You might have been rejected or you might have lost ' +
                    'connection.'
            }
        },
        videoFileSelection: {
            title: sessionName => `${sessionName} - ${appName}`,
            heading: sessionName => `Welcome to ${sessionName}!`,
            sessionNamePlaceholder: 'the session',
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
                pauseNotAllowed: 'You don\'t have permissions to control the playback. Pausing locally.',
                stateFetchFailed: 'Error: Could not synchronise your playback with the server. Check your internet ' +
                    'connection.',
                websocketClosed: 'Error: Connection to the session was lost.'
            }
        },
        playbackSessionDetails: {
            sessionCode: sessionCode => `This is your session code: ${sessionCode.toUpperCase()}`,
            copyLink: 'Copy link to share',
            guestListTitle: 'Guests',
            admissionRequestsTitle: 'Admission requests',
            errors: {
                clipboard: 'Error: Could not put link into your clipboard.'
            }
        },
        guestListItem: {
            onlineLabel: 'Online',
            hostLabel: 'Host',
            currentGuestLabel: 'You',
            admit: 'Admit to session',
            reject: 'Reject',
            elevate: 'Make co-host',
            kick: 'Kick',
            errors: {
                genericOperation: 'Error: The operation failed.'
            }
        },
        playbackSessionSettings: {
            sessionName: 'Session name',
            waitingRoom: 'Add waiting room',
            controlsAllowed: 'Everyone can control playback',
            save: 'Save',
            errors: {
                save: 'Error: Failed to save settings.'
            }
        },
        joinSessionRedirect: {
            heading: 'Redirecting...'
        },
        noAccess: {
            heading: 'The session has either expired or you don\'t have access to it.'
        }
    }
}

const current = languages.en // todo figure out what language to use

export default current