const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route GET /expenses
// @desc Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route POST /expenses
// @desc Add a new expense
router.post('/', async (req, res) => {
  const { description, amount } = req.body;

  if (!description || !amount) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const newExpense = new Expense({
    description,
    amount,
  });

  try {
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route DELETE /expenses/:id
// @desc Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
