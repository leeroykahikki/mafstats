const Router = require('express');
const router = new Router();
const statsRouter = require('./statsRouter');

router.use('/stats', statsRouter);

module.exports = router;
