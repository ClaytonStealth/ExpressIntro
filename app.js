//Bring in Express code
const express = require('express')
var bodyParser = require('body-parser')
//Initialize the Server and Port
const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

const port = 3000

const favoriteMovieList = [{
    title: "Sunshine",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Inside Out",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Inception",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Fight Club",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}]


const today = new Date();
let moviesString = null
let queryParamFirstName = null
let queryParamLastName = null
let queryParamNewMovie = null

let firstName = "Initial Value"
// Define the default server route (aka "/") for your server
app.get('/', (req, res) => {
    console.log("Default Route")
    res.send(`Clayton Sestak , DATE/TIME: ${today} `)
})

// app.get('/add-movie', (req, res) => {
//     console.log("ADD Movie List")
//     queryParamNewMovie = req.query.newMovie
//     favoriteMovieList.push(queryParamNewMovie)
//     // moviesString = favoriteMovieList.join()
//     res.send(`movie list: ${queryParamNewMovie}`)
// })

// app.get('/list-movies', (req, res) => {
//     console.log("Movie List")
//     moviesString = favoriteMovieList.join(', ')
//     res.send(`${moviesString}`)
// })
// //requesting a single resource of a set of resources is done with a route param
// //the url will be: localhost:3000/single-movie/star wars
// app.get('/single-movie/:movieName', (req, res) => {
//     console.log("req.params", req.params)
//     res.send("")
// })


app.post('/save-user-info', (req, res) => {
    // req.query is an object containing key/value pairs of the query params entered into the url after the ?
    console.log("req.body", req.body)
    // These lines are getting the firstName and lastName query param values from req.query
    // queryParamFirstName = req.query.firstName
    // queryParamLastName = req.query.lastName
    queryParamFirstName = req.body.firstName
    queryParamLastName = req.body.lastName
    res.send('User Info =>' + 'Name:' + queryParamFirstName + " " + queryParamLastName)
})


app.get("/show-user-info", (req, res) => {
    // This route will only work AFTER /save-user-info has been run
    res.send("User Info => " + "Name: " + queryParamFirstName + " " + queryParamLastName)
})

//Create

//Post a new movie into the movies array
app.post("/new-movie", (req, res) => {
    console.log("POST to /new-movie")
    //well use req.body to get the body payload from the post request that contains our new movie

    console.log(req.body)

    const newMovie = {
        title: "",
        starRating: 0,
        isRecommended: false,
        createdAt: new Date(),
        lastModified: new Date()
    }
    newMovie.title = req.body.title
    newMovie.starRating = req.body.starRating

    if (req.body.title === undefined) {
        //should trigger when req.body.title is undefined
        console.log("title is not defined")
        res.json({
            success: false,
            message: "title is a required field"
        })
        return;
    } else {
        console.log("title is defined")
        newMovie.title = req.body.title
    }
    if (req.body.starRating === undefined) {
        //should trigger when req.body.starRating is undefined
        console.log("starRating is not defined")
        res.json({
            success: false,
            message: "starRating is a required field"
        })
        return;
    } else {
        console.log("starRating is defined")
        newMovie.starRating = req.body.starRating
    }

    if (req.body.isRecommended === undefined) {
        //should trigger when req.body.isRecommended is undefined
        console.log("isRecommended is not defined")
        res.json({
            success: false,
            message: "isRecommended is a required field"
        })
        return;
    } else {
        console.log("isRecommended is defined")
        newMovie.isRecommended = req.body.isRecommended
    }



    console.log("newMovie", newMovie)

    favoriteMovieList.push(newMovie)
    //We must respond to the requerst for now we'll send back a hardcoded object
    res.json({
        success: true
    })
})
//Read

//get all movies in our movie list
app.get("/all-movies", (req, res) => {
    console.log("GET to /all-movies")
    //res.send only sends strings. From now on, we want to use res.json to send JSON objects or JS arrays
    res.json(favoriteMovieList)
})


//Update
//find a movie and update the title
app.put("/update-movie/:titleToUpdate", (req, res) => {
    console.log("PUT to /update-movie")
    // We hjave a route parameter /:titleToUpdate to specify which movie in our list to update
    //the value of this route parameter will come through the req.params object
    console.log("req params ", req.params)

    const titleToUpdate = req.params.titleToUpdate

    // const newTitle = req.body.newTitle



    const originalMovieIndex = favoriteMovieList.findIndex((movie) => {
        console.log("movie", movie)
        console.log()
        return movie.title === req.params.titleToUpdate

        if (movie.title === req.params.titleToUpdate) {
            console.log("movie titles match")
            return true
        } else {
            console.log("movie titles do not match")
            return false
        }
    })
    console.log("originalmovieINDEX", originalMovieIndex)

    const originalMovie = favoriteMovieList[originalMovieIndex]
    console.log("originalMovie", originalMovie)

    const updatedMovie = {
        title: originalMovie.title,
        starRating: originalMovie.starRating,
        isRecommended: originalMovie.isRecommended,
        createdAt: originalMovie.createdAt,
        lastModified: new Date()
    }

    console.log("updateMovie before update ", updatedMovie)

    //we need to find the original movie in our movie array so that we can keep the original values that we dont want to modify. hint: we need to use .findIndex()

    if (req.body.title !== undefined) {
        updatedMovie.title = req.body.title
    }

    if (req.body.starRating !== undefined) {
        updatedMovie.starRating = req.body.starRating
    }

    if (req.body.isRecommended !== undefined) {
        updatedMovie.isRecommended = req.body.isRecommended
    }

    console.log("updateMovie after update ", updatedMovie)



    // Overwrite the value of favoriteMovieList at indexOfMovie with newTitle
    // favoriteMovieList[indexOfMovie] = newTitle
    favoriteMovieList[originalMovieIndex] = updatedMovie;
    console.log(favoriteMovieList)

    console.log("favoriteMovieList after", favoriteMovieList)

    res.json({
        success: true
    })
})

//Delete

app.delete("/delete-movie/:titleToDelete", (req, res) => {
    console.log("DELETE to /delete-movie")

    //This is t he title of the movie we want to find in the mopvies array and delete
    // const titleToDelete = req.params.titleToDelete

    //find the inddex of the movie in the movie list
    const indexOfMovie = favoriteMovieList.findIndex((movie) => {
        // return movie.title === req.params.titleToUpdate
        console.log(movie.title + "===" + req.params.titleToDelete)
        if (movie.title === req.params.titleToDelete) {
            console.log("movie titles match")
            return true
        } else {
            console.log("movie titles do not match")
            return false
        }
    })
    console.log(indexOfMovie)


    if (indexOfMovie < 0) {
        //if the movie was not found in the array, respond with hasBeenDeleted: false and return so that no code underneath executes
        res.json({
            hasBeenDeleted: false
        })
        return;
    }
    console.log("Before Delete", favoriteMovieList)
    //remove the movie title from the array at the index
    favoriteMovieList.splice(indexOfMovie, 1)
    console.log("After Delete", favoriteMovieList)
    res.json({
        hasBeenDeleted: true
    })
})

app.get("/single-movie/:titleToFind", (req, res) => {
    const titleToFind = req.params.titleToFind
    const foundMovieIndex = favoriteMovieList.findIndex((movie) => {
        console.log("movie", movie)
        console.log()
        // return movie.title === req.params.titleToUpdate

        if (movie.title === titleToFind) {
            console.log("Found Movie")
            return true
        } else {
            console.log("Movie not found")
            return false
        }
    })
    const foundMovie = favoriteMovieList[foundMovieIndex]
    res.json(foundMovie)
})

//Finally, run the server
app.listen(port, () => {
    //Console.log app listening on port when the server is running
    console.log(`Example app listening on port ${port}`)
})