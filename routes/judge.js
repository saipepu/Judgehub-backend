const express = require('express');
const { login, createJudge, getAll, judgeById, updateTeamFund, getOne, getHistory } = require('../controller/judge');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'judge routes'})
})
router.post('/login', login);
router.put('/updateTeamFund/:judgeById', updateTeamFund)

router.get('/createJudges', createJudge)
router.get('/getAll', getAll)
router.get('/getHistory', getHistory)
router.get('/:judgeById', getOne)

router.param('judgeById', judgeById)

module.exports = router;