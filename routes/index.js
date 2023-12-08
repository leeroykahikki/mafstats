const Router = require('express');
const router = new Router();
const statsRouter = require('./statsRouter');
const playerRouter = require('./playerRouter');

router.use('/stats', statsRouter);
router.use('/player', playerRouter);

module.exports = router;
