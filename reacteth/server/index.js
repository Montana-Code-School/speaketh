const express = require("express")
const Mystery = require("../src/lib/MysteryWordFrequency.js")
const fs = require("fs")
const bodyParser = require('body-parser')
const loginList = require('./loginList')

//the variable NUMBER_OF_WORDS in all caps represents a "constant" variable assigned a
//constant value that should never change due to mutation in the program.
//alight to be altered by the editer of the program
const NUMBER_OF_WORDS = 100;

// range function for making an array on length n
const range = (n) => [...Array(n).keys()]

/*
  processFile function to update the browser content
	with server commands on different url routes

	routes - ends of urls
*/

const processFile = (err, stream) => {

	if (err){
		throw err;
	}

	const completeText = stream.toString();

  const mysteryShakes = new Mystery(completeText)
	const app = express()

	const users = Object.keys(loginList.user)


// ---------------------------- app.use -------------------------------
	app.use((req, res, next) => {
		console.log('request received! ' + req.url)
		console.log('Check out this body', req.body)
		next()
	})

	app.use((req, res, next) => {
		req.username = users
	})

	app.use(bodyParser.json())

	// -------------------------- app.get ---------------------------------

  app.get("/Shake_Rap", (req, res) => {
		 const barderator = range(NUMBER_OF_WORDS).map((x) => mysteryShakes.randomWord(x)).join(" ")
		 res.json({words: barderator})
  })

	app.get("/shake_fill", (req, res) => {
		res.json({text: 'awesome get request, dude'})
	})

	app.get("/login", (req, res) => {
		users.map( person => person === "timothy" ? res.json(person) : res.json({err: "no username for timothy found"}))
	})

// ---------------------------- app.post --------------------------------

	app.post("/login", (req, res) => {
		req.userName = users

	})

	app.post("/shake_fill/", (req, res) => {
		  console.log('oooh look at that body', req.body)
			const barderator = range(req.body.numOfWords - 0).map((x) => mysteryShakes.randomWord(x)).join(" ")
			 res.json({words: barderator})
	})

	// --------------------------- app.listen -----------------------------

  app.listen(3001)
  console.log('ermagerd berdererter!!')
}

fs.readFile( __dirname + '/../public/shakespeare.txt', processFile);
