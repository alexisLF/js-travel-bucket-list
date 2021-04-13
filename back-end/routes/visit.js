const express = require('express');
const { getOneVisit, createVisit, updateVisit, deleteVisit, getAllVisit } = require('../controllers/visit');
const router = express.Router();
const sVisit = require('../models/visit');

const mAuth = require('../middlewares/auth');

router.get('/', getAllVisit);

router.post('/', mAuth, createVisit);  
router.get('/:id', getOneVisit);
router.put('/:id', updateVisit);  
router.delete('/:id', deleteVisit);

module.exports = router;