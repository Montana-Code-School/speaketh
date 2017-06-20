const express = require("express")
const Mystery = require("../src/lib/MysteryWordFrequency.js")
const fs = require("fs")
const NUMBER_OF_WORDS = 100;
const bodyParser = require('body-parser')
const loginList = require('./loginList')

const range = (n) => [...Array(n).keys()]

const processFile = (err, stream) => {
	console.log("I read the file", err, stream)
	if (err){
		throw err;
	}
	const completeText = stream.toString();
  const mysteryShakes = new Mystery(completeText)
	const app = express()

	const users = Object.keys(loginList.user)


	// app
	app.use(bodyParser.json())

	app.use((req, res, next) => {
		console.log('request received! ' + req.url)
		console.log('Check out this body', req.body)
		next()
	})

  app.get("/Shake_Rap", (req, res) => {
		 const barderator = range(NUMBER_OF_WORDS).map((x) => mysteryShakes.randomWord(x)).join(" ")
		 res.json({words: barderator})
  })

	app.get("/shake_fill", (req, res) => {
		res.json({text: 'awesome get request, dude'})
	})


	app.post("/login", (req, res) => {
		req.userName = users
		
	})

	app.post("/shake_fill/", (req, res) => {
		  console.log('oooh look at that body', req.body)
			const barderator = range(req.body.numOfWords - 0).map((x) => mysteryShakes.randomWord(x)).join(" ")
			 res.json({words: barderator})
	})

  app.listen(3001)
  console.log('ermagerd berdererter!!')
}
console.log('I haven\'t read the file yet', __dirname)
fs.readFile( __dirname + '/../public/shakespeare.txt', processFile);
