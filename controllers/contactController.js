const asyncHandler = require("express-async-handler");
const Contact=require('../models/contactModel');


//Get all contacts
//route GET /api/contacts
//private

const getAllContacts =asyncHandler( async (req,res)=>{
    const contacts= await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
})


//Get single contact with id
//route GET /api/contacts/:id
//private

const getContact =asyncHandler( async  (req,res)=>{
    const contact=await Contact.findOne({id :req.params.id});
    console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(200).json(contact);
})


//route POST /api/contacts
//private

const createContact = asyncHandler( async (req,res)=>{
    const {name , email , phone}=req.body;
    const user_id=req.user.id;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        user_id,
        name,
        email,
        phone,
    });
    console.log(req.body);

    res.status(201).json(contact);
})

//Get single contact with id
//route PUT /api/contacts
//private

const updateContact =asyncHandler( async  (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if(contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other user contacts");
    }


    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedContact);
});

//Get single contact with id
//route DELETE /api/contacts
//private

const deleteContact =asyncHandler( async  (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("User do not have permission to delete other user contacts");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
})





module.exports={getAllContacts , getContact , createContact ,updateContact ,deleteContact};