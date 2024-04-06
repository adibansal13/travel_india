const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    url: String,
    filename: String,
  },
  description: {
    type: String,
    required: true,
  },
  sites: [
    {
      sitename: {
        type: String,
      },
      siteurl: {
        type: String,
      },
    },
  ],
  adventures: [
    {
      adventurename: {
        type: String,
      },
      adventureurl: {
        type: String,
      },
    },
  ],
  location: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
