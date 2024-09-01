const bookModel = require('../models/book');
class bookService{
    async storeBookData(data){
       const book = new bookModel(data);
       const result = await book.save();
       console.log('result', result)
       return result;
    }

    async getAllBooks(){
        const books = await bookModel.find();
        return books;
    }
    
    async deleteBook(id){
        const book = await bookModel.deleteOne({_id:id});
        return book;
    }
}

module.exports = bookService;