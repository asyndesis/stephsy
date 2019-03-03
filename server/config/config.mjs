export default {
  development: {
    webServerPort : 3000,
    mongoDatabaseUri : "mongodb://localhost:27017/stephsy",
    socketPort: 9999, /* update socket server file when you find out how to pass a socket */
  },
  production : {
    webServerPort : 80,
    mongoDatabaseUri : "mongodb://xxxxx/stephsy",
    socketPort: 999
  }
}   