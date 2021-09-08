const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {

    res.render('home')
})
router.get('/sharedTrips', async (req, res) => {
    const ctx = {
        trips: await req.storage.getAllTrips()
    }
    console.log()
    res.render('shared-trips', {
        title: 'Shared Trips',
        ctx
    })
})
//------- CREATE ---------\\
router.get('/create', (req, res) => {
    res.render('trip-create')
})
router.post('/create', async (req, res) => {
    req.body.creator = req.user._id

    await req.storage.createTrip(req.body)

    res.redirect('/trip/sharedTrips')
})
router.get('/details/:id', async (req, res) => {

    const trip = await req.storage.getTripById(req.params.id)
    const user = await req.auth.getUserByEmail(req.user.email)
    trip.isOwner = req.user && (req.user._id == trip.creator._id)
    trip.isFull = trip.seats > 0
    trip.isBooked = trip.buddies.find(x => x == req.user._id)


    const ctx = {
        trip
    }

    res.render('trip-details', ctx)
})
router.get('/details/:id/edit', async (req, res) => {
    const trip = await req.storage.getTripById(req.params.id)
    const ctx = {
        trip
    }
    res.render('trip-edit', ctx)
})
router.post('/details/:id/edit', async (req, res) => {
    await req.storage.editTrip(req.body, req.params.id)
    res.redirect(`/trip/details/${req.params.id}`)
})
router.get('/details/:id/delete', async (req, res) => {
    try {
        req.storage.deleteTrip(req.params.id)
        res.redirect('/trip/sharedTrips')
    }
    catch (err) {
        console.log(err.message)
        res.render('details', { title: 'Delete trip', error: err.message })
    }
})
router.get('/details/:id/book', async (req, res) => {
    try {
        await req.storage.bookTrip(req.params.id, req.user._id)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.render('details', { title: 'Details', error: err.message })
    }
})
module.exports = router