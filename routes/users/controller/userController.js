const { createUser,
    hashPassword,
    errorHandler,
    findOneUser,
    comparePassword,
    createJwtToken } = require('./authHelper');

module.exports = {
    register: async (req, res) => {
        try {
            let newUser = await createUser(req.body);
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            await newUser.save();
            res.status(200).send({
                message: 'Successfully signed up',
                newUser: newUser
            });

        } catch (error) {
            let errorMessage = await errorHandler(error);
            res.status(errorMessage.status).send({
                message: errorMessage.message
            })
        }
    },
    login: async (req, res) => {
        try {
            let foundUser = await findOneUser(req.body.email);
            console.clear()
            console.log('============================================= foundUser ', foundUser)
            if (foundUser === 404) {
                res.send({
                    status: 404,
                    message: 'User not found, please try again or register'
                })
                throw {
                    status: 404,
                    message: 'User not found, please try again or register'
                }

            }
            let comparedPassword = await comparePassword(req.body.password, foundUser.password);
            if (comparedPassword === 409) {
                res.send({
                    status: 409,
                    message: 'Password incorrect, try again'
                })
                throw {
                    status: 409,
                    message: 'Password incorrect, try again'
                }
            }
            let jwtToken = await createJwtToken(foundUser);
            res.status(200).json({
                token: jwtToken
            });

        } catch (error) {
            res.status(error.status)
                // .json({message: error.message})
                .send({ message: error.message })
        }

    }
}