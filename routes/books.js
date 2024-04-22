const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const processImage = require("../middleware/sharp-config");

const bookCtrl = require('../controllers/books');

router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.bestRatings);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, multer, processImage, bookCtrl.createBook);
router.put('/:id', auth, multer, processImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.createRating);


module.exports = router;

