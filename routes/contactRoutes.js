const express=require('express');

const {getAllContacts , getContact ,createContact ,updateContact ,deleteContact}=require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

const router=express.Router();

router.use(validateToken);

router.route('/').get(getAllContacts).post(createContact);

router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports=router;