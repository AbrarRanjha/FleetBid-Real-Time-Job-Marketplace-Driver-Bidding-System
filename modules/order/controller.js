const orderService = require('./service');

class marketPlaceController {
    async gerOrderHistory(req, res) {
        try {
            const { id } = req.params
            const order = await orderService.customerOrderHistory(id);
            if (!order.length) {
                return res.status(404).json({ message: 'No order found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async gerOrderDetail(req, res) {
        try {
            const { id } = req.params
            const order = await orderService.orderDetail(id);
            if (!order) {
                return res.status(404).json({ message: 'No order found' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new marketPlaceController();
