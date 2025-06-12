
const cors = require("cors")
const express = require("express");
const app = express();


const port = 8085
const { MongoClient } = require("mongodb")
const dbconnection=require('./Dbconnection')
dbconnection()
// dbconnection()
app.use(express.json())
app.use(cors())
const fs = require("fs")



app.use("*", (req, res) => {    // if no API are made 
        res.send(" Quote generator could not fetch this API")    
})


const http = require("http")
const Server=require('socket.io').Server
const server = http.createServer(app)


const io= new Server(server,{
    cors:{
        origin:"*"
    }
})
// const uns=io.of('/student-namespace')

io.on('connection',  async(socket)=>{
    let token = socket.handshake.auth.token    
    let result =await EmployeeProfileModel.findByIdAndUpdate({_id:token},{$set:{online:true}})
    if(result===null){
    let result =await StudentProfileModel.findByIdAndUpdate({_id:token},{$set:{online:true}})
    }
    socket.on("disconnect", async ()=>{        
        let token = socket.handshake.auth.token
        let result =await StudentProfileModel.findByIdAndUpdate({_id:token},{$set:{online:false}})
        if(result===null){
            let result =await EmployeeProfileModel.findByIdAndUpdate({_id:token},{$set:{online:false}})
            }
    })
})

server.listen(port, () => {
    console.log(`app running on port ${port} for Quote generator`)
})
