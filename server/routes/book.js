const express = require('express');
const router = express.Router();

const bookCtr = require('../controllers/book');

router.post('', bookCtr.saveBook);

router.get('', bookCtr.getBooks);

router.patch('/:id', bookCtr.updateBook);

router.delete('/:id', bookCtr.deleteBook);

module.exports = router;
