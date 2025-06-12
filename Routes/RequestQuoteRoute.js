const express = require("express")
const router = express.Router()
const getQuoteModel = require("../Schema/RequestQuoteSchema")
const QuotesubmittedModel = require("../Schema/QuoteSubmittedSchema")
const sellerprofileModel = require("../Schema/SellerProfileSchema")
const buyerprofileModel = require("../Schema/BuyerProfileSchema")
var nodemailer = require('nodemailer')
const mongoose = require("mongoose")

const { MongoClient } = require("mongodb")
// const {getData} = require("../mongodb")
const {ObjectID} = require("mongodb")
const {gtoken} = require('./EmpProfileRoutes')
const secretKey = "Swami"
const jwt = require("jsonwebtoken")

// Middleware
function verifyToken(req, res, next){
    if(req.headers['authorization']){
    let token = req.headers['authorization'].split(" ")[1]
    let id = req.headers['authorization'].split(" ")[0]
    if(token){
        jwt.verify(token, secretKey, (err, valid)=>{
    if(err){
        res.send("invalid token")
        }else{
    let validid=valid.id
    if(validid===id){
        next()
    }
        }   })
    }else{
        res.send("Unauthorised Access")
    }
}
}


// ............get all Quotes for all......
router.get("/getQuotes", verifyToken, async (req, res) => {
    try {
        let Items = await getQuoteModel.find()
        res.send(Items)
    } catch (err) {
        res.status(401).send("server issue")
    }
})

function verifyHomeJobs(req, res, next){
    let valid=req.headers['authorization']
    if(valid==='BlueItImpulseWalkinIn'){
        next()
}else{
    res.send("Unauthorised Access")
}
}
// Seller Quote postings
router.post("/postQuote", verifyToken, async (req, res) => {
    try {
        const { } = (req.body)
        if ( !jobDescription || !companyName || !experiance || !jobLocation) {
            res.send("fields are missing")
        } else {
            let jobs = new getQuoteModel(req.body)
            let result = await jobs.save()
            res.send("success")
        }
    } catch (error) {
        // console.log(error.message)
        res.send("server issue ")
    }
})