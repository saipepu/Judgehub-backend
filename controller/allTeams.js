const { teamList } = require('../data/teams');
const AllTeams = require('../models/allTeams');

exports.getAll = async (req, res) => {
  try {
    const result = await AllTeams.find().exec();
    return res.status(200).json({ success: true, message: result})
  } catch(err) {
    return res.status(400).json({ success: false, error: error})
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
  console.log(action);
  try {
    let result = await AllTeams.find().exec();
    let holder = result[0];
    let id = holder._id;
    let updatedTeamsList = [];
    let checkName = false;
    for(let i=0; i<holder.allTeams.length; i++) {
      let obj = {name: "", fund: 0};
      obj.name = holder.allTeams[i].name;
      if(obj.name === name) {
        if(action == 'decrease') {
          obj.fund = holder.allTeams[i].fund - 5000;
        } else if(action == 'increase') {
          obj.fund = holder.allTeams[i].fund + 5000;
          console.log(obj.fund);
        }
        checkName = true;
      } else {
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
}