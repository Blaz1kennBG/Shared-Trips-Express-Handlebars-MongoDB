const Trip = require('../models/Trip')
const User = require('../models/User')
async function createTrip(data) {
     const trip = new Trip(data)
    await trip.save() 
}
async function getAllTrips() {
    return await Trip.find({}).lean()
}
async function getTripById(id) {
    return await Trip.findById(id).populate('creator').lean()
}
async function bookTrip(tripId, userId) {
  const trip = await Trip.findById(tripId).populate('creator')
  const user = await User.findById(userId)
  trip.buddies.push(user._id)
  trip.seats--
  trip.save()
  user.trips.push(trip._id)
  user.save()
}
async function editTrip(data, id) {
    const trip = await Trip.findById(id)
    Object.assign(trip, data)
    trip.save()
}
async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id)
}
module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    editTrip,
    deleteTrip,
    bookTrip
}