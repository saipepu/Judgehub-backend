const express = require('express');
const { getAll, create23Teams, updateTotalTeamsFund } = require('../controller/allTeams');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({ success: true, message: 'AllTeamsRoute'})
})

router.get('/getAll', getAll);


router.post('/create23Teams', create23Teams)

router.post('/updateTotalTeamsFund', updateTotalTeamsFund)

module.exports = router;