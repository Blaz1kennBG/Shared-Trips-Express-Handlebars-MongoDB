const {Schema, model} = require('mongoose')

const schema = new Schema({
    startPoint: {type: String, required: true},
    endPoint: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    carImage: {type: String, required: true},
    carBrand: {type: String, required: true},
    seats: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'user'},
    buddies: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

module.exports = model('trip', schema)