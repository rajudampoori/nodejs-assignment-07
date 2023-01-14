const express = require('express')
var path = require('path');
const mongoose = require("mongoose");
const methodoverride = require("method-override")
const app = express()
const bodyParser = require("body-parser");
const studentArray = require("../src/InitialData")
const port = 8080
app.use(express.urlencoded());
app.use(methodoverride('_method'))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))


app.set("views", "./views");
app.set("view engine", "ejs");


// your code goes here

const studentsSChema = mongoose.Schema({
    id: Number,
    name: String,
    class: String,
    division: String
})

const studentsdata = mongoose.model("school", studentsSChema)

mongoose.connect("mongodb://localhost/studentsname")

app.get("/",async (req, res) => {
    const gettings = await studentsdata.find();
    res.send(gettings)
})

app.get("/api/student", async (req, res) => {
    try {

        const getting = await studentsdata.find();
        console.log(getting);
        res.redirect('/')
    } catch (e) {
        console.log(e.message);
    }
})

app.post("/api/student", async (req, res) => {
    try {
        res.setHeader( 'content-type', 'application/x-www-form-urlencoded' )
        await studentsdata.create(req.body

            //   {
        //     id : req.body.id,
        //     name :req.body.name,
        //     class : req.body.class,
        //     division : req.body.division
        // }
     )
        res.redirect('/')
        console.log(req.body)
    } catch (e) {
        console.log(e.message)
    }
})

app.put('/api/student/:id', async (req, res) => {
    try {
     const data =   await studentsdata.findByIdAndUpdate({_id : req.params.id},req.body);
        res.send(data)
        console.log(data)
    } catch (e) {
        console.log(e.message)
    }
})

app.delete('/api/student/:id', async (req, res) => {
    try {
   const data =  await studentsdata.findByIdAndDelete({_id:req.params.id});
        res.send(data)
    } catch (e) {
        console.log(e.message)
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
