const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');
const qs = require('qs')


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

app.post('/bybit/search', async (req, res) => {
  const response = await axios({
    method: 'post',
    url: 'https://api2.bybit.com/spot/api/otc/item/list',
    headers: {
      'referer': 'https://www.bybit.com/',
      'Content-type': 'application/x-www-form-urlencoded',
      'Cookie': '_abck=62F3639F0BBAFAAEB0CF5C0344B442B4~-1~YAAQoFsDF4Bl6y6CAQAAXQKEWghHybIc/2PaHCjQwqGNcH1fKZ9X/8P55kS3cvyheaPg+qCDU9t4NEZCDjUk85xdBgh/TcKtGwD+rOrohPh640lZAN7sIZ431MeYzE1Pv8NUSpm7Nu56w9u6FU3yyjHB+/Xb8lO5GZowQGyppFzbJIJsE+ve1sZyvNIufsL8IUO9YW7zL2lo9G/zoZazyw4sLH2LlELoKsAE6BUrhEijqkDEXzSLfMCbltV6mdT8XAbExaCLC11IIfJH1Wb4VdtaGZfyOiSy1j1YNF8uRogXKiI5y/1zVuGi2UYZcsmZEYo94QqvNY+OASr5SiNDDPFWp7NHxU85mDXJpZlqbOe5F1xC0IHmuQ==~-1~-1~-1; ak_bmsc=7D98A346665F476FE14E9CF376DD98F0~000000000000000000000000000000~YAAQoFsDF4Fl6y6CAQAAXQKEWhCqG3dlUMRj/+d7EpAyNyN6nwyIhxVMZOhWwHqPIY6uRhND6frzwLXN+C4dDG5jNyxWbIkzNmsqFY0a/h4aaMbP7XTdY8bGSEOWUACA3FRE64i/4g8aDpHY+D5ZrlnD06v1i7JlcNy8fjpXTrNxHEMM3iKFTb/8uPCoKq9FOjJveBaTWnTAHhbaHizRqMYptTiimJx6tXhpAVRedZTFO26osG2FuwBsg+Gc2CTWwAlnT9obca87p0SmR4ItfJDgasIxEDtBFpS0cEYJ1HJP3GfkLweynRZmKf+UhGu39wVfBKwWh61mVxrMa3uCICx9eYPeMBnup+tENzAXuw308mnLTQGLYfHigxl4; bm_sz=A5297BC22D82E93A76C694050FA6C766~YAAQoFsDF4Jl6y6CAQAAXQKEWhA5HbCwTb5qc1cAuP8wUArCa+/JKdGk9NB/gBl0om5+z9yF0r0cQ9MUT5OtzO/SzP80CgphunfUa9CKp0ywC7N2hFQTRDLwLFHKHfYkk+7F5+VaZtliWX+MynHIkLch+R3UFT+Y51OJQJ90ukQG25Vjz3PNybrMKER46XSW42tAnJNJx5erlq2FnSXRxrLjf8wz88xNz6AYmPejI7Pmv92FsIV79K6HQsU0MDy1Akcbmdys4gf731MJ3Rpp3LxZSQkVMIt6m/xCkjC9h6bitw==~4605490~3749682'
    },
    data: qs.stringify(req.body)
  })

  res.json(response.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})