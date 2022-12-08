var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const key = '9f6775d0501bfeb651cc6efcaf868354';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let description = data.weather[0].description;
                let city = data.name;
                let temp = Math.round(parseFloat(data.main.temp)-273.15);
                let result = {
                    description: description,
                    city: city,
                    temp: temp,
                    error: null
                }
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
    });
}

router.all('/', function(req, res) {
    let city
    if(req.method == 'GET') {
        city = 'Tartu';
    } else if(req.method == 'POST') {
        city = req.body.cityname;
    }
    if(city === '') {
        res.render('index', {error: 'City not specified'});
        return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    getWeatherDataPromise(url)
        .then(data => {
           res.render('index', data);
        })
        .catch(error => {
            res.render('index', {error: 'Problem while getting data, try again'});
        })
});

module.exports = router;