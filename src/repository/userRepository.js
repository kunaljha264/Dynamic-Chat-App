const User = require('../models/user');

class UserRepository{

    async create(data){
        try {
            console.log(data);
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({email : userEmail});
            return user;
        } catch (error) {
            console.log("Something went wrong at repository layer");
            throw error;
        }
    }

    async getByFilter(data){
        try {
            const user = await User.find(data);
            return user;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = UserRepository;