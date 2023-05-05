const PORT = 3023
const express = require('express')
const cors = require('cors')
const server = express()

/*
const corsOptions = {
  origin: 'https://www.acme.com'
};
app.use(cors(corsOptions)); */

server.use(cors())
server.use(express.json())

let airlines = [
  { iataId: 'GA', name: 'Garuda Indonesia' },
  { iataId: 'SU', name: 'Aeroflot' },
  { iataId: 'LH', name: 'Lufthansa' },
  { iataId: 'QR', name: 'Qatar Airways' },
  { iataId: 'EK', name: 'Emirates' }
]

server.post('/airlines', (req, res) => {
  const airline = req.body

  console.log('*****', req)
  if (!airline.iataId) {
    return res.status(400).json({
      error: 'required "iataId" field is missing'
    })
  }

  const newAirline = {
    iataId: airline.iataId,
    name: airline.name
  }

  airlines = airlines.concat(newAirline)

  res.json(airlines)
})

server.delete('/airlines/:code', (req, res) => {
  const code = req.params.code
  airlines = airlines.filter(airline => airline.iataId !== code)
  res.status(204).end()
})

server.get('/airlines/:code', (req, res) => {
  const code = req.params.code
  const airline = airlines.find(airline => airline.iataId === code)

  if (airline) {
    return res.json(airline)
  } else {
    res.status(404).end()
  }
})

server.get('/airlines', (req, res) => {
  res.json(airlines)
})

server.get('/', (req, res) => {
  res.send(airlines)
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
