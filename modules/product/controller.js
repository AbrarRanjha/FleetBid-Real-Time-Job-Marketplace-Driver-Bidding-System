const UserService = require('./service');

class marketPlaceController {
    async gerOrderHistory(req, res) {
        try {
            const user = await UserService.customerOrderHistory();
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new marketPlaceController();
