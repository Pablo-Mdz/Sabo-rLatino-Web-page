const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");

//create restaurant
router.get('/restaurants/create', (req, res) => {
    res.render('restaurants/new')
});

router.post('/restaurants/create', (req, res) => {
    const {name, description, speciality, tel, url, email, street, houseNumber, area, /* owner */ } = req.body

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
        /* owner: req.user._id */
    })
        .then(createdRestaurant => res.redirect('/restaurants'))
        .catch(err => ("restaurants/new"))
});

//get restaurant
router.get('/restaurants', (req, res) => {
	Restaurant.find()
		.then(restaurant => res.render('restaurants/restaurants', { restaurant }))
		.catch(err => console.log(err))
});

//get details
router.get("/restaurants/:id", (req, res) => {
    const id= req.params.id

    Restaurant.findById(id)
    .then(restaurant => res.render("restaurants/details", {restaurant}))
    .catch(err=> console.log(err))
})

//delete restaurant
router.get('restaurants/:id/delete', (req, res) => {
	const id = req.params.id
	/* const query = { _id: id }
	if (req.user.role !== 'admin') {
		query.owner = req.user._id
	} */
	Restaurant.findByIdAndRemove(id)
		.then(deletedRestaurant => res.redirect('/restaurants'))
		.catch(err => console.log(err))
});

//edit service
router.get("/restaurants/:id/edit", (req, res) => {
    const id = req.params.id

    Restaurant.findById(id)
    .then(restaurant => {
        res.render("restaurants/edit", { restaurant })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/restaurants/:id/edit", (req, res) => {
    const id = req.params.id
    const { name, description, speciality, tel, url, email, street, houseNumber, area, /* owner */ } = req.body

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
        /* owner */
    }

    Restaurant.findByIdAndUpdate(id, restaurant)
    .then(createdRestaurant => {
        res.redirect(`/restaurants/${id}`)
    })
    .catch(err => console.log(err))
})

module.exports = router;