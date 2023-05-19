const express = require("express");
const Userrouter = require("./routes/User.route");
const Todorouter = require("./routes/Todos.route");
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors({
    origin:'*'
}))

app.get("/",(req,res)=>{
    return res.status(200).json("TODO App ");
})
app.use('/users',Userrouter);
app.use(auth);
app.use('/todos',Todorouter);

app.listen(8081,()=>{
    console.log("Runnig on port 8081");
})