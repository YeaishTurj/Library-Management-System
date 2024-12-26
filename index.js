const express=require('express');

const {v4:uuidv4}=require('uuid');

const path=require('path');

const methodOverride=require('method-override');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use(methodOverride('_method'));

let port=8080;

let books=[];

app.use(express.urlencoded({extended: true}));

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
});

app.get('/books',(req,res)=>{
    res.render('allBooks.ejs',{books:books});
});

app.get('/books/newBook',(req,res)=>{
    res.render('addBook.ejs');
});

app.post('/books',(req,res)=>{
    let {title,author,copies}=req.body;
    let id=uuidv4();
    books.push({id,title,author,copies});
    res.redirect('http://localhost:8080/books');
});

app.get('/books/:id',(req,res)=>{
    let {id}=req.params;
    let book=books.find((b)=>id===b.id);
    res.render('updateBook.ejs',{book:book});
});

app.patch('/books/:id',(req,res)=>{
    let {id}=req.params;
    let {title,author,copies}=req.body;
    let book=books.find((b)=>id===b.id);
    book.title=title;
    book.author=author;
    book.copies=copies;
    res.redirect('http://localhost:8080/books');
});

app.delete('/books/:id',(req,res)=>{
    let {id}=req.params;
    books=books.filter((b)=>id!==b.id);
    res.redirect('http://localhost:8080/books');
});