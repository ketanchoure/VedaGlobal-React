const express = require("express");
const app = express();
const cors = require("cors");
const Database = require("./Database/Database");
const Allrouters = require("./router/Router");

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/product', express.static("./Uploads"));


app.listen(1111, () => {
    Database()
    console.log(`${1111} is connected`)
})

app.use("/", Allrouters)

app.get("/Veda_global",  (req, res) => {
 
    res.send("Dosel Technologies")
})