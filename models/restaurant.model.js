const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
    name: String,
    description: String,
    speciality: String,
    tel: Number,
    url: String,
    email: String,
    street: String,
    houseNumber: Number,
    area: String,
    imgName: String,
	imgPath: String,
	publicId: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: true,
    }
)

const Restaurant = model("Restaurant", restaurantSchema)
module.exports = Restaurant;
