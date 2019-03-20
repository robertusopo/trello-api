const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth.controller');

router.post('/authenticate',
  authController.authenticate
  );

router.post('/register',
  authController.register
  );

router.post('/logout',
  authController.logout
  );

module.exports = router;
