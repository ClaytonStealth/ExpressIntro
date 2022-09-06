//Bring in Express code
const express = require('express')

//Initialize the Server and Port
const app = express()
const port = 3000
const favoriteMovieList = ["Star Wars", "The Avengers"]

// Define the default server route (aka "/") for your server
app.get('/', (req, res) => {
    console.log("Default Route")
    res.send('Hello World!')
})

app.get('/list-movies', (req, res) => {
    console.log("Movie List")
    res.send(favoriteMovieList)
})

//Finally, run the server
app.listen(port, () => {
    //Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})