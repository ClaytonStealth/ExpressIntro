//Bring in Express code
const express = require('express')

//Initialize the Server and Port
const app = express()
const port = 3000
let favoriteMovieList = ["Sunshine", "Inside Out", "Inception", "Fight Club"]
const today = new Date();
let moviesString = null
let queryParamFirstName = null
let queryParamLastName = null
let queryParamNewMovie = null

let firstName = "Initial Value"
// Define the default server route (aka "/") for your server
app.get('/', (req, res) => {
    console.log("Default Route")
    res.send(`Clayton Sestak , DATE/TIME: \n ${today} `)
})

app.get('/add-movie', (req, res) => {
    console.log("ADD Movie List")
    queryParamNewMovie = req.query.newMovie
    favoriteMovieList.push(queryParamNewMovie)
    // moviesString = favoriteMovieList.join()
    res.send(`movie list: ${queryParamNewMovie}`)
})

app.get('/list-movies', (req, res) => {
    console.log("Movie List")
    moviesString = favoriteMovieList.join(', ')
    res.send(`${moviesString}`)
})



app.get('/save-user-info', (req, res) => {
    // req.query is an object containing key/value pairs of the query params entered into the url after the ?
    console.log("req.query", req.query)
    // These lines are getting the firstName and lastName query param values from req.query
    queryParamFirstName = req.query.firstName
    queryParamLastName = req.query.lastName
    res.send('User Info =>' + 'Name:' + queryParamFirstName + " " + queryParamLastName)
})


app.get("/show-user-info", (req, res) => {
    // This route will only work AFTER /save-user-info has been run
    res.send("User Info => " + "Name: " + globalFirstName + " " + globalLastName)
})

//Finally, run the server
app.listen(port, () => {
    //Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})