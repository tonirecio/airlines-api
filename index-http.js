const http = require('http')
const PORT = 3023
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('<h1>Hello API nodemon</h1>')
})
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT)
})
