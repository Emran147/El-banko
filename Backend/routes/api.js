const express = require('express')
const router = express.Router()
const externalAPi = require('./externalAPI')
const weatherDataManager = require('../weatherDataManager')
const CityWeather = require('../model/Weather')
const Transaction = require('../model/Transaction')


router.get("/Weather/:city", async function(req, res) {
    try {
      const city = req.params.city
      let cityWeather = await externalAPi.getWeather(city);
      cityWeather =  weatherDataManager.arrangeWeather(cityWeather)
      res.send(cityWeather);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch weather data' });
    }
  })

  // router.get("/Transactions/:category", async function(req, res) {
  //   const category = req.params.category;
  
  //   try {
  //     Transaction.find({ category: category }).then(function (transactions) {
  //       const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  //       res.send({ totalAmount: totalAmount });
  //     });
  //   } catch (error) {
  //     console.error("Failed to fetch transactions:", error);
  //     res.status(500).send({ error: 'Failed to fetch transactions' });
  //   }
  // })
  
  
  router.get("/Transactions/SumByCategory", async function(req, res) {
    try {
        Transaction.find({}).then(function(transactions) {
            const sumByCategoryDeposits = {};
            const sumByCategoryWithdrawals = {};

            transactions.forEach(transaction => {
                const categoryGroup = transaction.amount > 0 ? sumByCategoryDeposits : sumByCategoryWithdrawals;
                if (!categoryGroup[transaction.category]) {
                    categoryGroup[transaction.category] = 0;
                }
                categoryGroup[transaction.category] += transaction.amount;
            });

            const depositsArray = Object.keys(sumByCategoryDeposits).map(category => ({
                category: category,
                totalAmount: sumByCategoryDeposits[category]
            }));

            const withdrawalsArray = Object.keys(sumByCategoryWithdrawals).map(category => ({
                category: category,
                totalAmount: sumByCategoryWithdrawals[category]
            }));

            res.send({
                deposits: depositsArray,
                withdrawals: withdrawalsArray
            });
        });
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        res.status(500).send({ error: 'Failed to fetch transactions' });
    }
});

  

  
router.get("/Weather/", function(req, res) {
    try {
      CityWeather.find({}).then(function (weather) {
      res.send(weather)
      })
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch weather data' });
    }
  })


  router.get("/Transactions/", function(req, res) {
    try {
      Transaction.find({}).then(function (transaction) {
      res.send(transaction)
      })
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch weather data' });
    }
  })


  router.post('/Weather', function (req, res) {
    console.log(req.body)
    const newWeather = new CityWeather(req.body)
    newWeather.save()
      .then((savedWeather) => {
          res.status(201).json(savedWeather)
      })
      .catch((err) => {
          console.error('Error saving expense:', err)
          res.status(500).send('Error saving expense')
      })
})

router.post('/Transaction', function (req, res) {
  console.log(req.body)
  const newTransaction = new Transaction(req.body)
  newTransaction.save()
    .then((savedTransaction) => {
        res.status(201).json(savedTransaction)
    })
    .catch((err) => {
        console.error('Error saving expense:', err)
        res.status(500).send('Error saving expense')
    })
})


router.delete('/Weather/:cityName', async function (req, res) {
  const { cityName  } = req.params
  try {

      const city = await CityWeather.findOneAndDelete({ name: cityName } )
      if (!city) {
          return res.status(404).send(`No city found`)
      }

      return res.send(`city  ${cityName} deleted`)

  } catch (err) {
      console.error('Error updating expense:', err)
      return res.status(500).send('Error updating expense')
  }
})


router.delete('/Transactions/:_id', async function (req, res) {
  const { _id  } = req.params
  console.log(_id)
  try {
      const TransactiontoDelete = await Transaction.findOneAndDelete({ _id: _id } )
      if (!TransactiontoDelete) {
          return res.status(404).send(`No Transaction found`)
      }

      return res.send(`Transaction  ${TransactiontoDelete} deleted`)

  } catch (err) {
      console.error('Error updating expense:', err)
      return res.status(500).send('Error updating expense')
  }
})


module.exports = router