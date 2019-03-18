const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')

const uploader = require('../configs/storage.config')
const cardsController = require('../controllers/cards.controller');

router.get('/',
secure.isAuthenticated,
cardsController.list
  );
//attachment es el nombre del campo en el body
router.post('/', 
secure.isAuthenticated,
uploader.single('attachment'),
cardsController.create
  );

router.get('/:id',
secure.isAuthenticated,
  cardsController.details
  )

router.put('/:id',
secure.isAuthenticated,
cardsController.edit
  );

router.delete('/:id',
secure.isAuthenticated,
cardsController.delete
  );

module.exports = router;