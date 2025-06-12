const express = require("express")
const router = express.Router()

var nodemailer = require('nodemailer');
const { MongoClient } = require("mongodb")
// const {getData} = require("../mongodb")
const {ObjectID} = require("mongodb")
const {gtoken} = require('./SellerProfileRoute')
const secretKey = "Swami"
const jwt = require("jsonwebtoken")