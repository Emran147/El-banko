const express = require('express')
const router = express.Router()
const Transaction = require('../model/Transaction')

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
    
  const computeSumsByCategory = (transactions) => {
    const sumByCategoryDeposits = {}
    const sumByCategoryWithdrawals = {};

    transactions.forEach(transaction => {
        const categoryGroup = transaction.amount > 0 ? sumByCategoryDeposits : sumByCategoryWithdrawals
        if (!categoryGroup[transaction.category]) {
            categoryGroup[transaction.category] = 0
        }
        categoryGroup[transaction.category] += transaction.amount
    })

    return { sumByCategoryDeposits, sumByCategoryWithdrawals }
}

const convertSumObjectToArray = (sumObject) => {
    return Object.keys(sumObject).map(category => ({
        category: category,
        totalAmount: sumObject[category]
    }))
}

router.get("/Transactions/SumByCategory", async (req, res) => {
    try {
        const transactions = await Transaction.find({})
        const { sumByCategoryDeposits, sumByCategoryWithdrawals } = computeSumsByCategory(transactions)
        console.log('thats what i send ' ,sumByCategoryDeposits )
        const depositsArray = convertSumObjectToArray(sumByCategoryDeposits)
        console.log('thats what i recive ' ,depositsArray )
        const withdrawalsArray = convertSumObjectToArray(sumByCategoryWithdrawals)

        res.send({
            deposits: depositsArray,
            withdrawals: withdrawalsArray
        })
    } catch (error) {
        console.error("Failed to fetch transactions:", error)
        res.status(500).send({ error: 'Failed to fetch transactions' })
    }
})
  router.get("/Transactions/", function(req, res) {
    try {
      Transaction.find({}).then(function (transaction) {
      res.send(transaction)
      })
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch  data' });
    }
  })

router.post('/Transaction', function (req, res) {
  console.log(req.body)
  const newTransaction = new Transaction(req.body)
  newTransaction.save()
    .then((savedTransaction) => {
        res.status(201).json(savedTransaction)
    })
    .catch((err) => {
        console.error('Error saving :', err)
        res.status(500).send('Error saving ')
    })
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
      console.error('Error updating :', err)
      return res.status(500).send('Error updating ')
  }
})


module.exports = router