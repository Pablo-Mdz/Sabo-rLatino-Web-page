const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
    res.render("profile", {user: req.session.user});
  });

  router.get("/aboutus", (req, res) => {
    res.render("aboutus")
  })

module.exports = router;
