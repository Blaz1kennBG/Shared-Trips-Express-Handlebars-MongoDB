const router = require('../controllers/tripController');
const tripController = require('../controllers/tripController')
const authController = require('../controllers/authController')


module.exports = (app) => {

app.get('/', (req, res) => res.redirect('/trip'))
app.use('/trip', tripController)
app.use('/auth', authController)

app.all('*', (req ,res) => res.render('404'))

};