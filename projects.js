var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', function (req, res) {
    const data = {
        person: {
          firstName: 'Kaiya',
          lastName: 'Walker',
        }
      }
    res.render('projects', data)
    
})

router.get('/about', function (req, res) {
res.send('About me')
})

module.exports = router

