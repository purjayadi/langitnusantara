import express from 'express'
import db from '../config/db'
import { Category, Gallery, Hotel, Service  } from './api'


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
Category(app);
Gallery(app);
Service(app);
Hotel(app);

app.listen(3000, () => {
  console.log('App is listening on port 3000!')
})
