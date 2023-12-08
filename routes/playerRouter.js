const Router = require('express');
const router = new Router();
const playerController = require('../controllers/playerController');

router.post('/getPlayerNickname', playerController.getPlayerNickname);

module.exports = router;
