const mongoose = require('mongoose')

const JudgeModel = {
  name: {
    type: String,
    maxlength: 50
  },
  login_id: {
    type: String,
    maxlength: 50
  },
  password: {
    type: String,
    minlength: 3,
  },
  totalFund: {
    type: Number,
    default: 5000000
  },
  teamList: {
    type: Array
  },
  transactionHistory: {
    type: String
  },
  logHistory: {
    type: String
  }
}

const JudgeSchema = new mongoose.Schema(JudgeModel)
module.exports = mongoose.model('Judge', JudgeSchema)