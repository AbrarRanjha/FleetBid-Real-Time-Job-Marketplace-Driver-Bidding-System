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
    async updateDriverLocation(req, res) {
        try {
            const { driver_id } = req.params
            const { latitude, longitude } = req.body;
            const user = await UserService.updateDriver(driver_id, latitude, longitude);
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getNearestDrivers(req, res) {
        try {
            const { latitude, longitude } = req.body;
            const user = await UserService.findNearestDrivers(latitude, longitude);
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getCompanyDrivers(req, res) {
        try {
            const { company_id, latitude, longitude } = req.body;
            if (!company_id) {
                return res.status(404).json({ message: 'company_id is required' });
            }
            const user = await UserService.findNearestDriversCompany(latitude, longitude, company_id);
            if (!user.length) {
                return res.status(200).json({ message: 'No user found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.log("Failed to get company drivers", error);

            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new marketPlaceController();
