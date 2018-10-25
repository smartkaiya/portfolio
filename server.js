const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var Mailchimp = require('mailchimp-api-v3')
 
var mailchimp = new Mailchimp('a45141feae94ed0fe5a23c73467b2d9c-us19');
// var profile = require('./profile')
// app.use('/profile', profile)

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extented: true}))
app.use(express.static('public'))

app.set('views', './views');

app.set('view engine', 'ejs');

var projects = require('./projects')
app.use('/projects', projects)

app.get('/', (req, res) => {
    const data = {
        person: {
          firstName: 'Kaiya',
          lastName: 'Walker',
        }
      }
    res.render('index', data);
});

app.get('/contact', (req, res) => {
    const data = {
        person: {
          firstName: 'Kaiya',
          lastName: 'Walker',
        }
      }
    res.render('contact', data);
  });
  
  app.get('/about', (req, res) => {
    const data = {
        person: {
          firstName: 'Kaiya',
          lastName: 'Walker',
        }
      }
    res.render('about', data);
  });

  
  app.post('/thanks', (req, res) => {
    const data = {
      person: {
        firstName: 'Kaiya',
        lastName: 'Walker',
      }
    }
console.log(req.body);

    mailchimp.post('/lists/86f8c4977c/members', {
        email_address : req.body.email,
        status : 'subscribed'
      })
        .then((resp) => {
            console.log('Terms from MailChimp API', resp);
            res.render('thanks', { 
              contact: req.body,
              person:  {firstName: 'Kaiya',
              lastName: 'Walker'}
            })
          }).catch(err => res.send('You are already a member'));

  });

app.listen(3001, () => {
console.log('listening at http://localhost:3001');
});
 