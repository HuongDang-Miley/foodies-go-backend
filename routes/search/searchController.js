const axios = require('axios')
const sushiPlaces = require('../sushiPlaces.json')
const SushiRyuseiDetail = require('../SushiRyuseiDetail.json')
const key = process.env.GOOGLE_API_KEY

module.exports = {
    nearBySearch: async (req, res) => {
        try {
            // // console.log('==================', req.query)
            // const parameters = {
            //     key: process.env.GOOGLE_API_KEY,
            //     // location: req.params.location,
            //     location: '40.67,-73.95',
            //     keyword: req.params.keyword,
            //     radius: '1500',
            // }
            // const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
            // let response = await axios.get(baseUrl + new URLSearchParams(parameters))
            // res.status(200).send(response.data)
            res.status(200).send(sushiPlaces)
        }
        catch (err) {
            res.status(400).send(err)
        }
    },

    placeDetail: async (req, res) => {
        try {
            // const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json?'
            // const parameters = {
            //     key: process.env.GOOGLE_API_KEY,
            //     place_id: req.params.id,
            //     fields: 'place_id,geometry,name,rating,vicinity,website,formatted_phone_number,url,types,reviews'
            // }
            // let response = await axios.get(baseUrl + new URLSearchParams(parameters))
            // res.status(200).send(response.data)
            res.status(200).send(SushiRyuseiDetail)
        } catch (err) {
            res.status(400).send(err)
        }
    }
}


//======================================SAVED CODE===================================

  // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${process.env.GOOGLE_API_KEY}`)
            //===========================================================================================================
            // NEAR BY SEARCH          
            // const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
            // const parameters = {
            //     key: process.env.GOOGLE_API_KEY,
            //     location: "40.67,-73.95",
            //     radius: '14500',
            //     type: "textquery",
            //     // keyword: 'sushi',
            //     keyword: req.body.keyword,
            //     // fields: 'photos,formatted_address,name,rating,opening_hours,geometry',
            //     v: "20182507"
            // }
            // let response = await axios.get(baseUrl + new URLSearchParams(parameters))
            // res.status(200).json(response.data)
            //===========================================================================================================
            // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=vietnam&key=${process.env.GOOGLE_API_KEY}`)