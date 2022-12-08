var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const key = '9f6775d0501bfeb651cc6efcaf868354';
let city = 'Tartu';

/* GET home page. */
router.get('/', function(req, res, next) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data) {
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp)-273.15);
            res.render('index', {
              description: description,
              city: city,
              temp: temp
            });
        })
        .catch(function() {
            // catch any errors
        })
});

module.exports = router;

router.post('/', function(req, res) {
    let city = req.body.cityname;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(function(resp) {
            return resp.json()
        })
        .then(function(data) {
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp)-273.15);
            res.render('index', {
              description: description,
              city: city,
              temp: temp
            });
        })
        .catch(function() {
            // catch any errors
        })
});