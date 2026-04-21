const UserModel = require('./Model');

class marketPlaceService {
    async customerOrderHistory() {
        try {
            const firstUser = await UserModel.findOne(); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
}

module.exports = new marketPlaceService();
