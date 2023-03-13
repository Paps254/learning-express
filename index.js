const express = require('express');
var bodyParser = require('body-parser')
const path =require("path");
const mysql =require("mysql");

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname,'public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
app.use(express.json());

var con=mysql.createConnection(
{
    host: "127.0.0.1",
    user: "root",
    password: "",
    database:"learning_express"
}
);

con.connect(function(err){
    if (err) throw(err)
    console.log("Connected!");

});

app.get("/", (req, res) => {
    con.connect(function(err) {
        con.query("SELECT * FROM user", function (err, result, fields) {
          if (err) throw err;
          res.send(result)
        });
      });

   
});
app.post("/register",(req,res)=>{
    const body=req.body;
    console.log(body);
    con.connect(function(err){
        con.query(`insert into user (email) values ("${body.email}")`,function(err,result,fields){
            if (err) throw err;
            res.send(body);

        })
    });
    
})



app.get("/register",(req,res)=>{
    res.render("register")
});

app.post("/login",(req,res)=>{

    console.log("data",req.body);
    // res.redirect("/");
    res.send(req.body);
})

app.listen(3000, () => {
    console.log(`Server started on port`);
});

// array.forEach(element => {
    
// });