const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');
const { json } = require('body-parser');


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
const port = process.env.PORT || 5050;

app.post('/binance/search', async (req, res) => {

  const response = await axios({
    method: 'post',
    url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
    data: req.body
  })
  res.json(response.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})