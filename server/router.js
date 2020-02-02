const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/getAllRes', (req, res, next) => {
  api.getAllRes(req, res, next);
});
module.exports = router;