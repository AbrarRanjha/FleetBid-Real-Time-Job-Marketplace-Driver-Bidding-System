const { default: mongoose } = require('mongoose');
const UserModel = require('./Model');

class userService {
    async customerOrderHistory() {
        try {
            const firstUser = await UserModel.findOne(); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async updateDriver(driver_id, latitude, longitude) {
        try {
            const coordinates = {
                type: "Point",
                coordinates: [
                    longitude,
                    latitude
                ]
            };
            const firstUser = await UserModel.updateOne({ _id: driver_id }, { $set: { location: coordinates } }); // Get the first user
            return firstUser;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async findNearestDrivers(latitude, longitude) {
        try {
            console.log("latitude, longitude: " + latitude, longitude);

            // Initial search with 30 km max distance
            let nearestDrivers = await UserModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [parseFloat(longitude), parseFloat(latitude)],
                        },
                        maxDistance: 30000, // 30 km in meters
                        distanceField: "distance",
                        spherical: true,
                        key: "location",
                    },
                },
                {
                    $match: {
                        user_type: "driver"
                    }
                }
            ]);

            console.log("near: " + nearestDrivers?.length);

            // If no drivers are found within 30 km, expand to 50 km
            if (nearestDrivers.length === 0) {
                nearestDrivers = await UserModel.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            },
                            maxDistance: 50000, // 50 km in meters
                            distanceField: "distance",
                            spherical: true,
                            key: "location",
                        },
                    },
                    {
                        $match: {
                            user_type: "driver"
                        }
                    }
                ]);
            }

            return nearestDrivers;
        } catch (error) {
            throw new Error(`Error fetching nearest drivers: ${error.message}`);
        }
    }

    async findNearestDriversCompany(latitude, longitude, company_id) {
        try {
            const companyObjectId = new mongoose.Types.ObjectId(company_id);

            console.log("latitude, longitude: " + latitude, longitude, companyObjectId);

            // Initial search with 30 km max distance
            let nearestDrivers = await UserModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [parseFloat(longitude), parseFloat(latitude)],
                        },
                        maxDistance: 30000, // 30 km in meters
                        distanceField: "distance",
                        spherical: true,
                        key: "location",
                    },
                },
                {
                    $match: {
                        user_type: "driver",
                        company_id: companyObjectId
                    }
                }
            ]);

            console.log("near: " + nearestDrivers?.length);

            // If no drivers are found within 30 km, expand to 50 km
            if (nearestDrivers.length === 0) {
                nearestDrivers = await UserModel.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [parseFloat(longitude), parseFloat(latitude)],
                            },
                            maxDistance: 50000, // 50 km in meters
                            distanceField: "distance",
                            spherical: true,
                            key: "location",
                        },
                    },
                    {
                        $match: {
                            user_type: "driver",
                            company_id: companyObjectId

                        }
                    }
                ]);
            }

            return nearestDrivers;
        } catch (error) {
            throw new Error(`Error fetching nearest drivers: ${error.message}`);
        }
    }

}

module.exports = new userService();
