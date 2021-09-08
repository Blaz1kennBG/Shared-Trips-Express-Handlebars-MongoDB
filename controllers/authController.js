const {Router } = require('express')
const isAuth = require('../guards/isAuth')
const isNotAuth = require('../guards/isNotAuth')

const router = Router()

router.get('/login', isAuth(),(req, res) => {
    res.render('login')
})
router.post('/login', async(req, res) => {
    try {

        await req.auth.login(req.body)
        res.redirect('/')
    } catch (err) {
        console.log(err.message)
        res.render('login', {title: 'Login', error: err.message})
    }
})
router.get('/register',isAuth(), (req, res) => {
   
    res.render('register')
})
router.post('/register', async (req, res) => {
   
    try {
        await req.auth.register(req.body)
        res.redirect('/')
    } catch (err) {
        console.log(err.message)
        res.render('register', {title: 'Register', error: err.message})
    }
   
   
})

router.get('/profile', isNotAuth(), async(req, res) => {
   
    const ctx = {
        
    }
    try {
        const user = await req.auth.getUserByEmail(req.user.email)
        ctx.user = user
    }
    catch (err) {
        ctx.err = err.message
        res.redirect('/auth/login')
    }
    
    res.render('profile',{title: 'Profile', ctx})
})
router.get('/logout', async(req, res) => {
    try {
        await req.auth.logout()
        
    } catch (err) {
        console.log(err.message)
        
    }
  
})

module.exports = router