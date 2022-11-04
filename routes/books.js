//Initializing
const express = require('express');
const book = require('../model/book');
const router = express.Router()
const Book = require('../model/book')

//Displaying all the Books using get request in REST API
router.get('/', async(req,res) => { 
 
    try{
       const books= await Book.find()
       res.json(books)

    }
    catch(err)
    {
        res.send("Error"+err);
    }
});

//Displaying only one book by id using get request in REST API
router.get('/:id',async(req,res) => {
    const { id } = req.params;
    const book = await Book.findOne({regno : id})
    if(!book) return res.send("The book doesn't exists")
    
    res.send(book);
   
});

//Inserting the Books using post request in REST API
router.post('/',async(req, res) => {
     const book = new Book({
        name : req.body.name,
        author: req.body.author,
        regno : req.body.regno,
        price: req.body.price,
        available_status: req.body.available_status

     })

     try{
         const book_list = await book.save()
         res.json(book_list)
     }
     catch(err)
     {
        res.send("Error"+err)
     }
});

//Updating the Books using put request in REST API
router.put('/:id',async(req,res) => {
   const { id } = req.params;
    const {
        name,
        author,
    } = req.body;

    const bookExist = await Book.findOne({regno : id});
    if (!bookExist) return res.send('Book Do Not exist');

    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        name: updateField(name, bookExist.name),
        author: updateField(author, bookExist.author),
        
    };

    await Book.updateOne({regno: id},{$set :{name : updatedBook.name, author: updatedBook.author}})
    
    res.send("Book Updated");
});

//Deleting the Books using delete request in REST API
router.delete('/:id',async(req,res) => {
   const {id} = req.params

   const existBook = await Book.findOne({regno : id})
   if(!existBook) return res.send("Book doesn't exist")

   await Book.deleteOne({regno : id}).then(() => {
     
       console.log("Data Deleted Succesfully")
       res.send("The Book has been deleted Successfully from the result")

   }).catch((err) => {
      res.send("Error"+err);
   });
})


router.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});



module.exports = router;