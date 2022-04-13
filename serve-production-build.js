const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const httpsOptions = {
    pfx: fs.readFileSync('./cert.pfx'),
    passphrase: 'password'
}
const httpsServer = https.createServer(httpsOptions, app)
    .addListener('error', error => console.log(error))
    .addListener('listening', () => console.log('Listening.'))

httpsServer.listen(443)