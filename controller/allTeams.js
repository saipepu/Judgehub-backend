const { teamList } = require('../data/teams');
const AllTeams = require('../models/allTeams');
const judge = require('../models/judge');

exports.getAll = async (req, res) => {
  try {
    const result = await AllTeams.find().exec();
    const allJudges = await judge.find().exec();
    let arr = result[0].allTeams;
    // console.log(result[0].allTeams);
    for(let z=0; z<arr; z++) {
      for(let i=0; i<allJudges.length; i++) {
        for(let j=0; j<allJudges[i].teamList.length; j++) {
          if(arr[z].name == allJudges[i].teamList[j].name) {
            arr[z].fund +=  allJudges[i].teamList[j].fund
          }
        }
      }
    }
    return res.status(200).json({ success: true, message: arr})
  } catch(err) {
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
          console.log(obj);
        } else if(action == 'increase') {
          obj.fund = holder.allTeams[i].fund + 500000;
          console.log(obj);
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

    console.log('updated')
    return res.status(200).json({ success: true, message: data })
  } catch(err) {
    return res.status(400).json({ success: false, error: err })
  }
  // try {
  //   const result = await AllTeams.find().exec();
  //   const allJudges = await judge.find().exec();
  //   let arr = result[0].allTeams;
  //   for(let z=0; z<arr; z++) {
  //     for(let i=0; i<allJudges.length; i++) {
  //       for(let j=0; j<allJudges[i].teamList.length; j++) {
  //         if(arr[z].name == allJudges[i].teamList[j].name) {
  //           arr[z].name = arr[z].name
  //           arr[z].fund +=  allJudges[i].teamList[j].fund
  //         }
  //       }
  //     }
  //   }
  //   let holder = result[0];
  //   let id = holder._id;
  //   const data = await AllTeams.findOneAndUpdate({ _id: id}, { allTeams: arr })

  //   return res.status(200).json({ success: true, message: data})
  // } catch(err) {
  //   return res.status(400).json({ success: false, error: err})
  // }
}