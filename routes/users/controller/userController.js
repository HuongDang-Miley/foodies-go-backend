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
                    status: 500,
                    message: 'User not found, please try again or sign up'
                })
                throw {
                    status: 500,
                    message: 'User not found, please sign up'
                }

            }
            let comparedPassword = await comparePassword(req.body.password, foundUser.password);
            if (comparedPassword === 409) {
                res.send({
                    status: 500,
                    message: 'Check your email and password'
                })
                throw {
                    status: 409,
                    message: 'Check your email and password'
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