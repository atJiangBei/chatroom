var app = require('./app')
var http = require('http')

var port = '2021'

var server = http.createServer(app.callback())

const arrIo = []
const io = require('socket.io')(server, { cors: true })
io.on('connection', (client) => {
  arrIo.push(client)
  client.on('msg', (data) => {
    const fromAuth = client.handshake.auth
    console.log(data)
    const {
      to: { id },
      type,
    } = data
    arrIo.forEach((s) => {
      if (s !== client) {
        if (type === 'personal') {
          if (s.handshake.auth.id === id) {
            s.emit('msg', {
              ...data,
              from: fromAuth,
            })
          }
        } else if (type === 'group') {
          s.emit('msg', {
            ...data,
            from: fromAuth,
          })
        }
      }
    })
  })
  client.on('disconnect', () => {
    const index = arrIo.indexOf(client)
    if (index !== -1) {
      arrIo.splice(index, 1)
    }
  })
})
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log('启动成功')
}
