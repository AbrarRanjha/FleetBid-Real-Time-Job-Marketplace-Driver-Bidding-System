const orderModel = require('./Model');

class orderService {
    async customerOrderHistory(id) {
        try {
            const firstUser = await orderModel.find({ customer_id: id }).sort({ createdAt: -1 }); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async orderDetail(id) {
        try {
            const firstUser = await orderModel.findById(id)
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
}

module.exports = new orderService();
