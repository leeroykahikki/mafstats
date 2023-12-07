const Router = require('express');
const router = new Router();
const statsController = require('../controllers/statsController');

router.post('/getTournamentPlayers', statsController.getTournamentPlayers);
router.post('/getToursInfo', statsController.getToursInfo);

module.exports = router;
