const router = require("express").Router();
const { auth } = require("../middleware");
// Import Models
const bookService = require("../controllers/book");
const book = new bookService();

router.get("/get", auth, async (req, res, next) => {
    try {
        const result = await book.getAllBooks();
        res.status(200).send({ data: result, message: "Books fetched successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.post("/add", async (req, res, next) => {
    try {
        console.log("req.body", req.body);
        const result = await book.storeBookData(req.body);
        console.log("result", result);
        res.status(201).send({ data: result, message: "Book created successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await book.deleteBook(id);
        res.status(200).send({ data: result, message: "Book deleted successfully", success: true });
    } catch (err) {
        console.log(err);
        next({ data: [], message: err, success: false });
    }
});

module.exports = router;