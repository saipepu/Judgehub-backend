const { judgeList } = require("../data/teams");
const Judge = require("../models/judge")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const allTeams = require("../models/allTeams");
const { updateTotalTeamsFund } = require("./allTeams");

exports.createJudge = async(req, res) => {

  try {
    await Judge.deleteMany({})
  } catch(err) {
    return res.status(400).json({ success: false, error: err + 'error reseting'})
  }
  for(let i=0; i<judgeList.length; i++) {
    let judge = new Judge();
    if(judge) {
      judge.login_id = judgeList[i].login_id
      judge.password = judgeList[i].password
      judge.teamList = judgeList[i].teamList
    }
    try {
      const result = await judge.save();
    } catch(err) {
      return res.status(400).json({ success: false, error: err + 'error reseting'})
    }
  }
  res.status(200).json({ success: true, message: judgeList})
}

exports.getAll = async(req, res) => {
  try {
    const result = await Judge.find().exec();
    console.log('==============================')
    for(let i=0; i<result.length; i++) {
      let totalBank = 5000000
      let used = 0;
      for(let j=0; j<result[i].teamList.length; j++) {
          used += result[i].teamList[j].fund;
      }
      console.log(result[i].login_id + " " + result[i].name + ' left -> ', result[i].totalFund, 'used -> ', used);
    }
    return res.status(200).json({ success: true, message: result })
  } catch(err) {
    return res.status(400).json({ success: false, error: err })
  }
}

exports.login = async(req, res) => {
  console.log('logging in')
  const { name, login_id, password } = req.body;
  try {
    const Registered = await Judge.find().exec();
    let found = false;
    let judge;
    for(let i=0; i<Registered.length; i++) {
      if(login_id == Registered[i].login_id && password == Registered[i].password) {
        found = true;
        judge = Registered[i];
      }
    }
    console.log('login')
    if(!found) return res.status(200).json({ success: false, error: 'Not Registered Yet'})
    logHistory = judge.logHistory + ", logged_in " + new Date().getDate() + "-" + new Date().getHours() + "hr-" + new Date().getMinutes() + "min-" + new Date().getSeconds() + "sec / as" + name;
    await Judge.findOneAndUpdate({ _id: judge._id}, {name: name, logHistory: logHistory})

    const token = jwt.sign({ _id: judge._id }, 'SECRET')
    res.cookie('ddi_judge_token', token, { expire: new Date() + 9999 });
    return res.status(200).json({ success: true, message: { judge, token }})

  } catch(err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err})
  }
}

exports.judgeById = async(req, res, next, id) => {
  console.log('judgeBYId')
  try {
    const judge = await Judge.findOne({ _id: id})
    req.profile = judge
  } catch(err) {
    return res.status(400).json({ success: false, error: "User not found, Please Refresh the Page"})
  }
  next();
}

exports.updateTeamFund = async(req, res) => {
  const { teamName, fund, totalFund, action } = req.body;
  console.log(action);
  let judge = req.profile;
  try {
    if(judge) {
      for(let i=0; i<judge.teamList.length; i++) {
        let total = 0;
        if(judge.teamList[i].name == teamName) {
          judge.teamList[i].fund = fund
        }
        if (action == "Invest") {
          totalFund -= judge.teamList[i].fund;
        } else {
          totalFund += 500000
        }
      }
    }
    let history = judge.transactionHistory + "," + teamName + " " + judge.login_id + " " + action + " 500k " + new Date().getDate() + "-" + new Date().getHours() + "hr-" + new Date().getMinutes() + "min-" + new Date().getSeconds() + "sec ";
    const data = await Judge.findOneAndUpdate({ _id: judge._id }, { teamList: judge.teamList, totalFund: totalFund, transactionHistory: history})
    return res.status(200).json({ success: true, message: data })
  } catch(err) {
    console.log(err)
    return res.status(400).json({ success: false, error: err})
  }
}

exports.getOne = async (req, res) => {
  if(req.profile) {
    return res.status(200).json({ success: true, message: req.profile})
  } else {
    return res.status(400).json({ success: false, error: 'user not found try to refresh please'})
  }
}

exports.getHistory = async(req, res) => {
  console.log('geting history')
  try {
    const allJudges = await Judge.find().exec();
    let hist = "";
    for(let i=0; i<allJudges.length; i++) {
      if(allJudges[i].transactionHistory != undefined && allJudges[i].transactionHistory != "")
      hist += allJudges[i].transactionHistory;
    }
    return res.status(200).json({ success: true, history: hist})
  } catch(err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err})
  }
}