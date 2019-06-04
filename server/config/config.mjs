export default {
  development: {
    jwtSecret: 'arfarfarfarf123123farts',
    webServerPort : 3000,
    mongoDatabaseUri : "mongodb://localhost:27017/stephsy",
    socketPort: 9999, /* update socket server file when you find out how to pass a socket */
  },
  production : {
    jwtSecret: 'arfarfarfarf123123farts',
    webServerPort : 80,
    mongoDatabaseUri : "mongodb://xxxxx/stephsy",
    socketPort: 9999
  }
}   