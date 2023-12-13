const Router = require('express');
const router = new Router();
const statsController = require('../controllers/statsController');

router.post('/getTournamentPlayers', statsController.getTournamentPlayers);
router.post('/getToursInfo', statsController.getToursInfo);
router.post('/getExtraPointsList', statsController.getExtraPointsList);
router.post('/getTournamentInfo', statsController.getTournamentInfo);
router.get('/getTournamentsList', statsController.getTournamentsList);

module.exports = router;
