const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express()
app.use(cors())
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const getBankRate = async (payType, tradeType) => {
  const res = await axios({
    method: 'post',
    url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
    data: {
      page: 1,
      rows: 1,
      payTypes: [payType],
      countries: [],
      publisherType: null,
      fiat: "KZT",
      tradeType: tradeType,
      asset: "USDT",
      transAmount: "5000",
      merchantCheck: false
    }
  })

  return res.data.data[0]?.adv.price
}
let data = {}


const fetchRates = async () => {
  const banks = ['Kaspi Bank', 'Halyk Bank', 'Jysan Bank', 'Forte Bank', 'Eurasian Bank', 'CenterCredit Bank', 'Altyn Bank', 'AdvCash', 'QIWI']
  let buyPrices = []
  let sellPrices = []

  let response = {}

  await Promise.all([
    getBankRate('KaspiBank', 'BUY'),
    getBankRate('HalykBank', 'BUY'),
    getBankRate('JysanBank', 'BUY'),
    getBankRate('ForteBank', 'BUY'),
    getBankRate('EurasianBank', 'BUY'),
    getBankRate('CenterCreditBank', 'BUY'),
    getBankRate('AltynBank', 'BUY'),
    getBankRate('AdvCash', 'BUY'),
    getBankRate('QIWI', 'BUY'),
  ]).then(rates => buyPrices = rates)

  await Promise.all([
    getBankRate('KaspiBank', 'SELL'),
    getBankRate('HalykBank', 'SELL'),
    getBankRate('JysanBank', 'SELL'),
    getBankRate('ForteBank', 'SELL'),
    getBankRate('EurasianBank', 'SELL'),
    getBankRate('CenterCreditBank', 'SELL'),
    getBankRate('AltynBank', 'SELL'),
    getBankRate('AdvCash', 'SELL'),
    getBankRate('QIWI', 'SELL'),
  ]).then(rates => sellPrices = rates)

  for (let i in banks) {
    response[banks[i]] = {
      buy: buyPrices[i],
      sell: sellPrices[i]
    }
  }

  data = response
}

setInterval(() => fetchRates(), 60000)
fetchRates()

app.get('/binance/rates', async (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})