'use strict';
const express = require('express')
const app = express()
const port = 3000

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stock');
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var request = require('request');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', __dirname + '/views');
module.exports = app;

var stockSchema = new mongoose.Schema({
    Name:               String,
    Symbol:             String,
    LastPrice:          Number,
    Change:             Number,
    ChangePercent:      Number,
    MarketCap:          Number,
    Volume:             Number,
    ChangeYTD:          Number,
    ChangePercentYTD:   Number,
    High:               Number,
    Low:                Number,
    Open:               Number,
    DateCreated:       {
        type:       Date,
        default:    Date.now
    },
    user : String
});
var favSchema = new mongoose.Schema({
    Name:               String,
    Symbol:             String,
    LastPrice:          Number,
    Change:             Number,
    ChangePercent:      Number,
    MarketCap:          Number,
    Volume:             Number,
    ChangeYTD:          Number,
    ChangePercentYTD:   Number,
    High:               Number,
    Low:                Number,
    Open:               Number,
    DateCreated:       {
        type:       Date,
        default:    Date.now
    }
});
var lookupSchema = new mongoose.Schema({
  Name:  String ,
  Symbol: String,
  Exchange: String
});

var userSchema = new mongoose.Schema({
  Name: String,
  Password: String,
  Email: String
})
var Stock = mongoose.model('Stock', stockSchema);
var Company = mongoose.model('Company',lookupSchema);
var Favourites = mongoose.model('Favourites', favSchema);
var User = mongoose.model('User',userSchema);
var session="";
var company={}
 var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
app.get('/', (req, res) => {
  if(session===""){
  res.render('login', {user:{}})
}
  else {
    res.render('index', { title: "Welcome " +session, stocks:  company })
  }
  console.log(session);
  console.log(req.body);
});
app.get('/api/signup', (req, res) => {
  res.render('register', {})
});
app.get('/api/charts', (req, res) => {
  res.render('interactivechart', {})
});
app.get('/api/logout', (req, res) => {
  session="";
  res.render('login', {user:{}})
});
app.post('/login', (req, res) => {
  console.log(req.body.email);

  User.findOne({"Email": req.body.email, "Password": req.body.password}, function(err, login) {
    if (err) {
      console.log(err)
      res.render('error', {})
    } else {
      if (login === null) {

        res.render('error', { message: "Username or password incorrect" })
      }else {
      Favourites.find({}, function(err, stocks) {
    if (err) {
      console.log(err)
      res.render('error', {})
    } else {
      session = login.Name;
      res.render('index', { title: "Welcome " +login.Name ,  stocks:  stocks })
    }
  });
  }
}
});
});
app.post('/register', (req, res) => {
  //res.render('index', {})
  console.log(req.body);

      var newUser = new User(req.body);

      newUser.save(function(err) {
          if (err) {
              throw err;
          } else{

           res.render('login',{user:req.body})
          }
      });
    });
  app.get('/home', (req, res) => {
    Favourites.find({}, function(err, stocks) {
      if (err) {
        console.log(err)
        res.render('error', {})
      } else {
        res.render('index', { stocks:  stocks })
      }
    });
    });

app.post('/api/stock', function(req, res) {

       var query = {
           'symbol': req.body.id
       };

       var options = {
           url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json',
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           qs: query
       }

       request(options, function(err, request, body) {
           // markitondemand return status 200 whether if found stock or not
           // if it found stock there will not be a message field
           // if found stock then and only then save data to MongoDB
           var jsonBody = JSON.parse(body);
           jsonBody.user =session;
           if (!jsonBody.Message) {

               var newStocks = new Stock(jsonBody);

               newStocks.save(function(err) {
                   if (err) {
                       throw err;
                   } else{
                     console.log(jsonBody);
                     res.render('landingpage',{company:newStocks})
                   }
               });
            //   res.render('landingpage',{company:newStocks})
           }
       });
   });
   app.post('/api/lookup', function(req, res) {

          var query = {
              'input': req.body.id
          };

          var options = {
              url: 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              qs: query
          }

          request(options, function(err, request, body) {
              // markitondemand return status 200 whether if found stock or not
              // if it found stock there will not be a message field
              // if found stock then and only then save data to MongoDB
              var jsonBody = JSON.parse(body);
              if (!jsonBody.Message) {
                  console.log(jsonBody);
                  var lookupInfo = new Company(jsonBody);

                  lookupInfo.save(function(err) {
                      if (err) {
                          throw err;
                      } else{
                        console.log(jsonBody);
                       res.render('lookup-detail',{query:jsonBody})
                      }
                  });
                  //remove next line and uncomment above
                  //res.render('lookup-detail',{query:jsonBody})
              }
          });
      });
app.get('/api/stock', (req, res) => {
  res.render('find-stock', { title: "Find Stock", company: {} })
  console.log(req.body.id);

});
app.get('/api/history', (req, res) => {
  Stock.find({}, function(err, stocks) {
    if (err) {
      console.log(err)
      res.render('error', {})
    } else {
      res.render('history', { stocks:  stocks })
    }
  });
  });
app.get('/api/lookup', (req, res) => {
  res.render('look-up', { title: "Look Up", query: {} })
  console.log(req.body.id);

});
app.get('/stock/new/:Symbol', (req, res) => {


  Stock.findOne({"symbol": req.params.Symbol}, function(err, stocks) {
    if (err) {
      console.log(err)
      res.render('error', {})
    } else {
      console.log(stocks)
      if (stocks === null) {
        res.render('error', { message: "Not found" })
      } else {
       // res.status(200).send(book)
        // res.render('index', { stocks: stocks})
        var fav = new Favourites(stocks);
        fav.save(function(err) {
            if (err) {
                throw err;
            } else{
              console.log(jsonBody);
              res.render('index',{stocks:stocks})
            }
        });
      }
    }
  });
});
app.get('/stock/:symbol', (req, res) => {
  var query = {
      'symbol': req.params.symbol
  };

  var options = {
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      qs: query
  }

  request(options, function(err, request, body) {
      // markitondemand return status 200 whether if found stock or not
      // if it found stock there will not be a message field
      // if found stock then and only then save data to MongoDB
      console.log("inside");
      var jsonBody = JSON.parse(body);
      if (!jsonBody.Message) {
          jsonBody.user=session;
          var newStocks = new Stock(jsonBody);

          newStocks.save(function(err) {
              if (err) {
                  throw err;
              } else{
                console.log(jsonBody);
                res.render('landingpage',{company:newStocks})
              }
          });
        //  res.render('landingpage',{company:newStocks})
      }
  });
});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))