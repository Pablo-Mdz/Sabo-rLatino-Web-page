const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");
const { uploader, cloudinary } = require("../config/cloudinary")
const { isLoggedIn } = require('../middleware/route-guard')

//create restaurant
router.get('/restaurants/create', (req, res) => {
    res.render('restaurants/new')
});

// read restaurant
router.get('/restaurants/read', (req, res) => {
     Restaurant.find()
        .then(restaurant => res.render('restaurants', { restaurant }))
        .catch(err => console.log(err))
    res.render('restaurants/details')
});

router.post('/restaurants/create', uploader.single("Image"), (req, res) => {
    const userId = req.session.user._id
    const { name, description, speciality, tel, url, email, street, houseNumber, area /* owner */ } = req.body
    console.log(req.body)
    const imgName = req.file.originalname
    const imgPath = req.file.path
    const publicId = req.file.filename
    Restaurant.create({
        name,
        description,
        speciality,
        tel,
        url,
        email,
        street,
        houseNumber,
        area,
        imgName, 
        imgPath, 
        publicId,
        owner: userId
    })
        .then(createdRestaurant => res.redirect('/profile'))
        .catch(err => res.render("restaurants/new"))
});

//get all restaurant
router.get('/restaurants/rest', (req, res) => {
    Restaurant.find()
        .then(restaurant => res.render('restaurants/rest', { restaurant }))
        .catch(err => console.log(err))
});



router.get('/restaurants/results', (req, res) => {
    const query = req.query.q
    console.log(query)
    const restaurantsFound = []
    Restaurant.find({ }) 
    .then(restaurantsFromDB => {  
      if(restaurantsFromDB === null){
          res.render("restaurants/results", { message : 'Sorry, no results found'/* , isLoggedIn */})
          return
        } 
        else {
        for (let restaurant of restaurantsFromDB){ 
            console.log(restaurant)
          if(restaurant.name.includes(query)) { 
            restaurantsFound.push(restaurant)
          }
          else if (restaurant.speciality.includes(query)) { 
            restaurantsFound.push(restaurant)
          }
        } 
        res.render("restaurants/results", {restaurantsFound: restaurantsFound /* , isLoggedIn */ }) 
      }
    })
    })



//get details
router.get("/restaurants/:id", (req, res) => {
    const id = req.params.id
    console.log(id)
    Restaurant.findById(id)
        // .populate("User")
        .then(restaurant => {
            console.log(restaurant)
            res.render("restaurants/details", { restaurant })
        }
        )
        .catch(err => console.log(err))
})


//edit service get

router.get("/restaurants/:id/edit", async (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)
    try {
        const restaurant = await Restaurant.findById(id)
        console.log(restaurant)
        res.render("restaurants/edit", restaurant)
    } catch (err) {
        console.log(err)
    }
})


//edit post
router.post("/restaurants/:id", (req, res, next) => {
    const id = req.params.id
    const { name, description, speciality, tel, url, email, street, houseNumber, area, owner } = req.body
    console.log(req.body)
    const restaurant = {
        name,
        description,
        speciality,
        tel,
        url,
        email,
        street,
        houseNumber,
        area,
        owner: userId
    }
    Restaurant.findById(id)
        .then(data => {

            if (data.owner._id.toString() !== req.session.user._id) {
                res.render("restaurants/rest", { message: "Oops! you can not Edit." })
            } else {
                Restaurant.findByIdAndUpdate(id, restaurant, { new: true })
                    .then(createdRestaurant => {
                        console.log(createdRestaurant)
                        res.redirect("/profile")
                    })
            }
        })
        .catch(err => {
            next(err)
        })
})

//delete restaurant
router.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    Restaurant.findById(id)

        .then(data => {
            if (data.owner._id.toString() !== req.session.user._id) {
                res.render("restaurants/rest", { message: "Oops! you can not delete." })
            } else {

                Restaurant.findByIdAndRemove(id)
                    .then(deletedRestaurant => res.redirect('/profile'))
            }
        })
        .catch(err => console.log(err))
});

//search




module.exports = router;