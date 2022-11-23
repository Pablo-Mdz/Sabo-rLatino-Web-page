const router = require("express").Router();
const Restaurant = require("../models/restaurant.model");
/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/profile", (req, res, next) => {
    const userId = req.session.user._id
    Restaurant.find({owner : userId})
        .then(restaurant => {
            console.log(restaurant)
            res.render('profile', {user:req.session.user , restaurant: restaurant})})
        .catch(err => console.log(err))
});


router.get('/restaurants/:id/delete', (req, res) => {
    const userId = req.session.user._id
    Restaurant.find({owner : userId})

        .then(restaurant => {
                res.render("profile")
                Restaurant.findByIdAndRemove(id)
                .then(deletedRestaurant => res.redirect('/profile'))
            }
         )
        
        .catch(err => console.log(err))
});



router.get("/aboutus", (req, res) => {
    res.render("aboutus")
})





module.exports = router;
