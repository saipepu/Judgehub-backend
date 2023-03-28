const mongoose = require('mongoose');

const AllTeamModels = {
  allTeams: {
    type: Array,
  }
}

const AllTeamsSchema = new mongoose.Schema(AllTeamModels)

module.exports = mongoose.model('allTeams', AllTeamsSchema)