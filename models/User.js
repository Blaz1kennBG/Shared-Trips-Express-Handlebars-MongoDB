const {Schema, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    trips: [{type: Schema.Types.ObjectId, ref: 'trip'}]
})

module.exports = model('user', schema)