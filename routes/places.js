const express = require("express");
const router = express.Router();
const Place = require("../models/places");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/", async (req, res, next) => {
  try {
    let places = await Place.find();

    res.render("places/home", { places });
  } catch (err) {
    next(err);
  }
});

router.get("/new", (req, res) => {
  res.render("places/new");
});

router.post("/", upload.single("Place[image]"), async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    let place = new Place(req.body.Place);
    place.image = { url, filename };
    await place.save();
    req.flash("success", "New Place Created");
    res.redirect("/places");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      req.flash("error", "Please Logged in or Signed up");
      res.redirect("/places");
    } else {
      let { id } = req.params;
      let place = await Place.findByIdAndUpdate(id);
      res.render("places/show", { place });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    let { id } = req.params;
    let place = await Place.findById(id);
    res.render("places/edit", { place });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", upload.single("Place[image]"), async (req, res, next) => {
  try {
    let { id } = req.params;
    let place = await Place.findByIdAndUpdate(id, { ...req.body.Place });
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      place.image = { url, filename };
      await place.save();
    }
    res.redirect(`/places/${id}`);
    req.flash("success", "Place Updated");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash("success", "Place Deleted");
    res.redirect("/places");
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:id/site",
  upload.single("sites[siteimage]"),
  async (req, res, next) => {
    try {
      let { id } = req.params;
      let site = await Place.findById(id);
      let sita = req.file.path;
      let sitname = req.body.sites.sitename;
      site.sites.push({ sitename: sitname, siteurl: sita });
      let sit = await site.save();
      req.flash("success", "New Site Created");
      res.redirect(`/places/${id}`);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id/adventure",
  upload.single("adventures[adventureimage]"),
  async (req, res, next) => {
    try {
      let { id } = req.params;
      let adv = await Place.findById(id);
      let advimg = req.file.path;
      let advname = req.body.adventures.adventurename;
      adv.adventures.push({ adventurename: advname, adventureurl: advimg });
      let sit = await adv.save();
      req.flash("success", "New Adventure Created");
      res.redirect(`/places/${id}`);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id/site/:siteid", async (req, res, next) => {
  try {
    let { id, siteid } = req.params;
    let sitedel = await Place.findByIdAndUpdate(id, {
      $pull: { sites: { _id: siteid } },
    });
    req.flash("success", "Place Site Deleted");
    res.redirect(`/places/${id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/adventure/:advid", async (req, res, next) => {
  try {
    let { id, advid } = req.params;
    let advdel = await Place.findByIdAndUpdate(id, {
      $pull: { adventures: { _id: advid } },
    });
    req.flash("success", "Place Adventure Deleted");
    res.redirect(`/places/${id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
