const vehicleService = require('./service');

class marketPlaceController {
    async gerOrderHistory(req, res) {
        try {
            const vehicle = await vehicleService.customerOrderHistory();
            if (!vehicle) {
                return res.status(404).json({ message: 'No vehicle found' });
            }
            return res.status(200).json(vehicle);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getVehicle(req, res) {
        try {
            const { company_id } = req.body;
            const vehicle = await vehicleService.getFleetVehicles(company_id);
            if (!vehicle) {
                return res.status(404).json({ message: 'No vehicle found' });
            }
            return res.status(200).json(vehicle);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new marketPlaceController();
