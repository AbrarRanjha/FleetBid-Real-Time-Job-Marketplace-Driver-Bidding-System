const JobModel = require('./Model');
const jobItemsModel = require('./jobItemsModel');

class marketPlaceService {
    async customerJobHistory(id) {
        try {
            const firstUser = await JobModel.find({ customer_id: id }).sort({ createdAt: -1 }); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async createJob(jobData) {
        try {
            const job = await JobModel.create(jobData);
            return job;
        } catch (error) {
            throw new Error(`Error creating job: ${error.message}`);
        }
    }


}

module.exports = new marketPlaceService();
