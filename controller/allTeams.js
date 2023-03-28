const { teamList } = require('../data/teams');
const AllTeams = require('../models/allTeams');
const judge = require('../models/judge');

exports.getAll = async (req, res) => {
  try {
    const allJudges = await judge.find().exec();
    let arr2 = []
      for(let i=0; i<teamList.length; i++) {
        let sum = 0;
        let obj = {};
        for(let j=0; j<allJudges.length; j++) {
          sum += allJudges[j].teamList[i].fund;
          obj.name = allJudges[j].teamList[i].name;
        }
        obj.fund = sum;
        arr2.push(obj);
      }

      return res.status(200).json({ success: true, message: arr2 })
    } catch(err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err})
  }
}
exports.create23Teams = async (req, res) => {

  const allTeams = new AllTeams();
  if(allTeams) {
    allTeams.allTeams = teamList;
  }
  try {
    await AllTeams.deleteMany({})
    const result = await allTeams.save();
    return res.status(200).json({ success: true, message: result })
  } catch(err) {
    return res.status(400).json({ success: false, error: err })
  }
}
exports.updateTotalTeamsFund = async (req, res) => {
  const { name, action } = req.body;
  try {
    let result = await AllTeams.find().exec();
    let holder = result[0];
    let id = holder._id;
    let updatedTeamsList = [];
    let checkName = false;
    for(let i=0; i<holder.allTeams.length; i++) {
      let obj = {name: "", fund: 0, history: ""};
      obj.name = holder.allTeams[i].name;
      if(obj.name === name) {
        obj.history = holder.allTeams[i].history + action + " ,";
        if(action == 'decrease' && holder.allTeams[i].fund-500000 > 0) {
          obj.fund = holder.allTeams[i].fund - 500000;
        } else if(action == 'increase') {
          obj.fund = holder.allTeams[i].fund + 500000;
        }
        checkName = true;
      } else {
        obj.history = holder.allTeams[i].history;
        obj.fund = holder.allTeams[i].fund;
      }
      updatedTeamsList.push(obj);
    }
    if(!checkName) {
      return res.status(400).json({ success: false, error: "Can't find team " + name })
    }

    const data = await AllTeams.findOneAndUpdate({ _id: id}, { allTeams: updatedTeamsList })

    console.log('getTotalTeamsFund')
    return res.status(200).json({ success: true, message: data })
  } catch(err) {
    return res.status(400).json({ success: false, error: err })
  }
}