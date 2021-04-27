
const URL = require('url')
const User = require('../users/model/User.js')
module.exports = {
    addToFavorites: async (req, res) => {
        try {
            let foundUser = await User.findById(req.body.userId)
            let targetPlace = req.body.place
            let targetPlaceId = req.body.place.place_id

            // Filter favlist array, if there's no target place, add target place to the list.
            let updatedFavList = []
            let foundPlace = foundUser.favList.filter(item => item.place_id === targetPlaceId)

            if (foundPlace.length === 0) {
                updatedFavList = [...foundUser.favList, targetPlace]
            } else {
                updatedFavList = [...foundUser.favList]
            }

            // update favList and save the user
            foundUser.favList = updatedFavList
            await foundUser.save()

            res.status(200).send({ foundUser })
        } catch (err) {
            res.status(404).send(err)
        }
    },

    loadFavorites: async (req, res) => {
        try {
            // USE QUERY IN THE URL LINK ===============================================================
            // const url_path = URL.parse(req.url, true)
            // const query = url_path.query
            // res.status(200).send(query)
            // console.log(',=======================================', URL.parse(req.url, true).query)

            // USE QUERY NOT IN THE URL LINK ============================================================
            let foundUser = await User.findById(req.query.userId)
            if (foundUser) {
                res.status(200).send(foundUser.favList)
            } else { throw 'no user found' }

        } catch (err) {
            res.status(404).send(err)
        }
    },

    addNote: async (req, res) => {
        try {
            let foundUser = await User.findById(req.body.userId)
            let updateFavList = foundUser.favList.map(item => {
                if (item.place_id === req.body.placeId) {
                    item.note = req.body.note
                }
                return item
            })

            await User.updateOne({ _id: req.body.userId }, {
                favList: updateFavList
            });

            res.status(200).send(foundUser.favList)
        }
        catch (err) { res.send(err) }

    },

    deletePlace: async (req, res) => {
        try {
            let foundUser = await User.findById(req.query.userId)

            let updateFavList = foundUser.favList.filter(item =>
                item.place_id !== req.query.placeId
            )
            
            let updateUser = await User.updateOne({ _id: req.query.userId }, {
                favList: updateFavList
            })

            res.status(200).send(updateUser)
        } catch (err) { res.status(404).send(err) }

    },
}

