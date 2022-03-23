import express from 'express'
import Router from './api'
import db from '../config/db'


const app = express()
app.use(express.json()) // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})
)
app.use(express.static('public')); 
db.authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
  })
  .catch((err) => {
    console.error('ERROR - Unable to connect to the database:', err)
  })

// Connection()
app.use('/api/v1', Router)

app.listen(3000, () => {
  console.log('App is listening on port 3000!')
})
