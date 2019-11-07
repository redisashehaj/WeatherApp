const express = require('express');
const app = express();
const port = 3005;
const body_parser = require('body-parser');
const fetch = require('node-fetch');
const appid = 'YOUR API KEY HERE';
const url = 'http://api.openweathermap.org/data/2.5/';

app.use(express.static('public'));

app.get('/nearby', async(req, res) => {
    if (!req.query) {
        res.status(404).json({
            message: 'Please provide latitude and longitude'
        }).end();
    }

    const latitude = req.query.lat;
    const longitude = req.query.lon;

    if (latitude === undefined || longitude === undefined) {
        res.status(404).json({ Error: 'Latitude and longitude are not found' });
    } else {
        await fetch(`${url}weather?lat=${latitude}&lon=${longitude}&APPID=${appid}&units=metric`)
            .then(response => response.json())
            .then(data => {
                res
                    .status(200)
                    .json(data);
            });
    }

});

app.get('/search/:id', async(req, res) => {
    if (!req.params) {
        res.status(404).json({
            message: 'Please provide a city'
        }).end();
    }

    const city = req.params.id;

    if (city === 'undefined') {
        res.status(404).json({
            message: 'City is not defined'
        }).end();
    } else {
        await fetch(`${url}weather?q=${city}&APPID=${appid}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    res.status(404).json({
                        message: 'City name not found'
                    }).end();
                }
                res.status(200).json(data);
            });
    }
});

app.listen(port, () => console.log('Server listening on port ' + port));

module.exports.app = app;