const vehicleModel = require('./Model');

class marketPlaceService {
    async customerOrderHistory() {
        try {
            const firstUser = await vehicleModel.findOne(); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async getFleetVehicles(company_id) {
        try {
            const vehicles = await vehicleModel.find({ company_id }); // Get the first user
            return vehicles;
        } catch (error) {
            throw new Error(`Error fetching the vehicles: ${error.message}`);
        }
    }
}

module.exports = new marketPlaceService();
