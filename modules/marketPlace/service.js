const marketPlaceModel = require("./Model");
const ratingModel = require("./ratingModel");
const JobItemsModel = require("../job/jobItemsModel");
const companyModel = require("../company/Model");
const { calculateDistance } = require("../../utils/utils");
const { default: mongoose } = require("mongoose");

class marketPlaceService {
  async customerJobHistory(id) {
    try {
      const firstUser = await UserModel.find({ customer_id: id }); // Get the first user
      return firstUser;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async liveJobs(driver_id, limit, skip) {
    try {
      console.log("driver_id: " + driver_id);

      const jobs = await marketPlaceModel
        .find({
          driver_id,
          bid_status: "available",
          is_approved: false,
          is_deleted: false,
          is_close: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async liveJobsCompany(company_id, name, jobId, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({
          company_id,
          bid_status: "available",
          is_approved: false,
          is_deleted: false,
          is_close: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async acceptedJobs(driver_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({
          driver_id,
          is_approved: true,
          bid_status: "accepted",
          is_deleted: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async acceptedJobsCompany(company_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({
          company_id,
          is_approved: true,
          bid_status: "accepted",
          is_deleted: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async rejectedJobs(driver_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({
          driver_id,
          is_rejected: true,
          bid_status: "rejected",
          is_deleted: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async rejectedJobsCompany(company_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({
          company_id,
          is_rejected: true,
          bid_status: "rejected",
          is_deleted: false,
        })
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the company bids: ${error.message}`);
    }
  }
  async liveJobDetail(id) {
    try {
      const jobs = await marketPlaceModel
        .findById(id)
        .populate({
          path: "job_item_id",
          populate: [
            {
              path: "product_id",
              populate: { path: "category_id" },
            },
            {
              path: "job_id",
              populate: {
                path: "vehicle_id",
                populate: { path: "vehicle_type" },
              },
            },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .populate("driver_id");
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }

  async driverBidding(driver_id, job_item_id, vehicle_id, quotation_amount) {
    try {
      const jobs = await marketPlaceModel.updateOne(
        { job_item_id, driver_id },
        {
          $set: {
            driver_id,
            vehicle_id,
            quotation_amount,
            quotation_date: Date.now(),
            bid_status: "pending",
            is_quotation_submitted: true,
          },
        },
      );
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the bidding request: ${error.message}`);
    }
  }

  async driverBiddingCompany(
    driver_id,
    job_item_id,
    vehicle_id,
    quotation_amount,
    company_id,
  ) {
    try {
      const jobs = await marketPlaceModel.updateOne(
        { job_item_id, company_id },
        {
          $set: {
            driver_id,
            vehicle_id,
            quotation_amount,
            quotation_date: Date.now(),
            bid_status: "pending",
            is_quotation_submitted: true,
          },
        },
      );
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the bidding request: ${error.message}`);
    }
  }

  async getDriverBidding(driver_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({ driver_id, bid_status: "pending" }) // Populating the order data
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async getDriverBiddingCompany(company_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({ company_id, bid_status: "pending" }) // Populating the order data
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id")
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async getCustomerProposals(customer_id, limit, skip) {
    try {
      const jobs = await marketPlaceModel
        .find({ customer_id, bid_status: "pending" }) // Populating the order data
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate({
          path: "vehicle_id",
          populate: [{ path: "vehicle_type" }],
          // { path: "vehicle_category" },]
        })
        .populate("customer_id")
        .populate({ path: "driver_id", populate: [{ path: "company_id" }] })
        .limit(limit)
        .skip(skip);
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async getCustomerProposalDetail(id) {
    try {
      console.log("id: " + id);

      const jobs = await marketPlaceModel
        .findById(id) // Populating the order data
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },

            { path: "order_id" },
          ],
        })
        .populate({
          path: "vehicle_id",
          // { path: "vehicle_type" }]
          // { path: "vehicle_category" },]
        })
        .populate("customer_id")
        .populate({ path: "driver_id", populate: [{ path: "company_id" }] });
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async updateDriverBidding(bid_id, quotation_amount) {
    try {
      console.log("Updating", quotation_amount, bid_id);

      const update = await marketPlaceModel.updateOne(
        { _id: bid_id },
        { $set: { quotation_amount } },
      );
      const jobs = await marketPlaceModel
        .findById(bid_id)
        .populate({
          path: "job_item_id",
          populate: [
            { path: "product_id" },
            { path: "job_id" },
            { path: "order_id" },
          ],
        })
        .populate("customer_id");
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async deleteDriverBidding(bid_id) {
    try {
      const deleteBid = await marketPlaceModel.deleteOne({ _id: bid_id });
      return deleteBid;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  encodeData(data) {
    try {
      const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
      return encodedData;
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async acceptDriverBidding(bid_id) {
    try {
      const bid = await marketPlaceModel.findOne({ _id: bid_id });
      // const updateAll = await marketPlaceModel.updateMany({ job_item_id: bid.job_item_id }, { $set: { is_approved: true, is_close: true, approved_date: Date.now(), bid_status: "closed" } })
      const allBids = await marketPlaceModel.countDocuments({
        job_item_id: bid.job_item_id,
      });
      const updateOne = await marketPlaceModel.updateOne(
        { _id: bid_id },
        {
          $set: {
            is_approved: true,
            is_close: true,
            approved_date: Date.now(),
            assigned_to: bid?.driver_id,
            bid_status: "accepted",
          },
        },
      );

      const jobs = await marketPlaceModel
        .findById(bid_id)
        .populate("job_item_id")
        .populate("vehicle_id")
        .populate("customer_id")
        .populate("driver_id");
      return { jobs, remaingBids: allBids - 1 };
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async rejectDriverBidding(bid_id) {
    try {
      const bid = await marketPlaceModel.findOne({ _id: bid_id });
      const updateOne = await marketPlaceModel.updateOne(
        { _id: bid_id },
        { $set: { is_rejected: true, is_close: true, bid_status: "rejected" } },
      );
      const allBids = await marketPlaceModel.countDocuments({
        job_item_id: bid.job_item_id,
      });

      const jobs = await marketPlaceModel
        .findById(bid_id)
        .populate("job_item_id")
        .populate("vehicle_id")
        .populate("customer_id")
        .populate("driver_id");
      return { jobs, remaingBids: allBids - 1 };
    } catch (error) {
      throw new Error(`Error fetching the first user: ${error.message}`);
    }
  }
  async prepareJobData(job_id) {
    const jobItem = await JobItemsModel.findOne({ job_id }).populate("job_id");
    return jobItem;
  }
  async createCustomerProposals(mausool_cost_amount, jobData, drivers) {
    for (let index = 0; index < drivers.length; index++) {
      const driver = drivers[index];
      const propObj = {
        job_item_id: jobData?._id,
        driver_id: driver?._id,
        mausool_cost_amount,
        customer_id: jobData?.job_id?.customer_id,
      };
      await marketPlaceModel.create(propObj);
    }
    const fleetCompany = await companyModel.find({
      company_type: "fleet_company",
    });
    for (let index = 0; index < fleetCompany.length; index++) {
      const company = fleetCompany[index];
      const propObj = {
        job_item_id: jobData?._id,
        company_id: company?._id,
        mausool_cost_amount,
        customer_id: jobData?.job_id?.customer_id,
      };
      await marketPlaceModel.create(propObj);
    }
    return;
  }
  async createRating(customer_id, rating, driver_id, review) {
    const res = await ratingModel.create({
      customer_id,
      rating,
      driver_id,
      review,
    });
    return res;
  }
  formatProposals = (jobs) => {
    return (
      jobs?.map((job) => {
        const originLat =
          job?.job_item_id?.job_id?.order_billing_address?.latitude; // Example: New York latitude
        const originLon =
          job?.job_item_id?.job_id?.order_billing_address?.longitude; // Example: New York longitude
        const destinationLat =
          job?.job_item_id?.job_id?.order_shipping_address?.latitude; // Example: Los Angeles latitude
        const destinationLon =
          job?.job_item_id?.job_id?.order_shipping_address?.longitude;
        const distance = calculateDistance(
          originLat,
          originLon,
          destinationLat,
          destinationLon,
        );
        return {
          _id: job?._id,
          driverName: `${job?.driver_id?.first_name || ""} ${job?.driver_id?.last_name || ""}`,
          driverImage:
            `https://www.mausool.com/public/frontend/uploads/user/${job?.driver_id?.profile_image}` ||
            "",
          customerName: `${job?.customer_id?.first_name || ""} ${job?.customer_id?.last_name || ""}`,
          driverRating: job?.driver_id?.average_rating || 0,
          driverId: job?.driver_id?._id,
          fromLocation:
            job?.job_item_id?.job_id?.order_billing_address?.location || "",
          toLocation:
            job?.job_item_id?.job_id?.order_shipping_address?.location || "",
          branchName:
            job?.job_item_id?.job_id?.branch_descriptions?.en?.branch_name ||
            "",
          deliveryCharges: job?.job_item_id?.job_id?.delivery_charges || 0,
          vehicleType: job?.vehicle_id?.vehicle_type?.vehicle_type || "",
          vehicleImage:
            `https://www.mausool.com/public/frontend/uploads/vehicle_type/${job?.vehicle_id?.vehicle_type?.image}` ||
            "",
          category:
            job?.job_item_id?.product_id?.pages_descriptions?.en
              ?.product_name || "",
          weight: job?.vehicle_id?.capacity || "0",
          quotationAmount: job?.quotation_amount || 0,
          currency: job?.currency || "SAR",
          companyName: job?.driver_id?.company_id?.company_name || "",
          fleetLogo:
            `https://www.mausool.com/public/frontend/uploads/company/${job?.driver_id?.company_id?.logo}` ||
            "",
          jobStatus: job?.bid_status || "",
          isApproved: job?.is_approved || false,
          distance: distance || 100,
          distanceUnit: "KM",
          jobNo: job?.job_no,
        };
      }) || []
    );
  };

  formatLiveJobs = (jobs) => {
    const refinedJobs = jobs?.map((job) => {
      // console.log("job", JSON.stringify(job));
      const jobItem = job?.job_item_id;
      const jobDetails = jobItem?.job_id;
      const product = jobItem?.product_id;
      const originLat = jobDetails?.order_billing_address?.latitude; // Example: New York latitude
      const originLon = jobDetails?.order_billing_address?.longitude; // Example: New York longitude
      const destinationLat = jobDetails?.order_shipping_address?.latitude; // Example: Los Angeles latitude
      const destinationLon = jobDetails?.order_shipping_address?.longitude;
      const distance = calculateDistance(
        originLat,
        originLon,
        destinationLat,
        destinationLon,
      );
      console.log("distance", distance);

      return {
        _id: job._id,
        jobNo: jobDetails?.job_no,
        productName: product?.product_name || jobItem?.product_name,
        from: {
          location:
            jobDetails?.pick_up_location ||
            jobDetails?.order_billing_address?.location,
          companyName: jobDetails?.branch_descriptions?.en?.branch_name,
        },
        to: {
          location: jobDetails?.order_shipping_address?.location,
          receiverName: jobItem?.order_id?.customer_name,
        },
        price: jobDetails?.delivery_charges, // Adjust to include VAT if needed
        currency: jobDetails?.currency || "SAR",
        customerName: job.customer_id ? job.customer_id?.full_name : "",
        customerAddress: job.customer_id ? job.customer_id?.address : "",
        customerProfile:
          `https://www.https://www.mausool.com/public/frontend/uploads/user/${job.customer_id?.profile_image}` ||
          "",
        distance: distance || 100,
        distanceUnit: "KM",
        bidStatus: job?.bid_status,
      };
    });
    return refinedJobs;
  };
  formatUpdateJobs = (job) => {
    console.log("job", JSON.stringify(job));

    const jobItem = job?.job_item_id;
    const jobDetails = jobItem?.job_id;
    const product = jobItem?.product_id;

    return {
      _id: job._id,
      jobNo: jobDetails?.job_no,
      productName: product?.product_name || jobItem?.product_name,
      from: {
        location:
          jobDetails?.pick_up_location ||
          jobDetails?.order_billing_address?.location,
        companyName: jobDetails?.branch_descriptions?.en?.branch_name,
      },
      to: {
        location: jobDetails?.order_shipping_address?.location,
        receiverName: jobItem?.order_id?.customer_name,
      },
      price: jobDetails?.delivery_charges, // Adjust to include VAT if needed
      customerName: job.customer_id ? job.customer_id?.full_name : "",
      customerAddress: job.customer_id ? job.customer_id?.address : "",
      customerProfile: job.customer_id ? job.customer_id?.profile_image : "",
    };

    return refinedJobs;
  };
  formatLiveJobDetail = (jobDetail) => {
    const originLat =
      jobDetail?.job_item_id?.job_id?.order_billing_address?.latitude; // Example: New York latitude
    const originLon =
      jobDetail?.job_item_id?.job_id?.order_billing_address?.longitude; // Example: New York longitude
    const destinationLat =
      jobDetail?.job_item_id?.job_id?.order_shipping_address?.latitude; // Example: Los Angeles latitude
    const destinationLon =
      jobDetail?.job_item_id?.job_id?.order_shipping_address?.longitude;
    const distance = calculateDistance(
      originLat,
      originLon,
      destinationLat,
      destinationLon,
    );
    const formattedResponse = {
      _id: jobDetail._id,
      jobId: jobDetail?.job_item_id?.job_id?.job_no || "N/A",
      job_item_id: jobDetail?.job_item_id?._id || "",

      vehicle: {
        id: jobDetail?.job_item_id?.job_id?.vehicle_id?._id || "",
        licensePlate:
          jobDetail?.job_item_id?.job_id?.vehicle_id?.licence_plate_no || "N/A",
        category:
          jobDetail?.job_item_id?.job_id?.vehicle_id?.vehicle_type
            ?.vehicle_type || "Unknown Category",
        distance: distance || 100,
        distanceUnit: "KM",
        imageUrl:
          `https://www.mausool.com/public/frontend/uploads/vehicle_type/${jobDetail?.job_item_id?.job_id?.vehicle_id?.vehicle_type?.image}` ||
          "default_vehicle_image.jpg", // Placeholder if not available
      },
      customer: {
        name: jobDetail?.customer_id
          ? `${
              jobDetail.customer_id?.first_name || ""
            } ${jobDetail.customer_id?.last_name || ""} `
          : "Customer Name",
        email: jobDetail?.customer_id?.email || "customer@example.com",
        rating: jobDetail?.customer_id?.average_rating
          ? jobDetail.customer_id.average_rating.toFixed(1)
          : "N/A",
        profileImage:
          `https://www.mausool.com/public/frontend/uploads/user/${jobDetail?.customer_id?.profile_image}` ||
          "https://www.mausool.com/public/frontend/uploads/user/APR2021//1619098248965-userimg.png",
      },
      driver_id: jobDetail?.driver_id?._id || "",
      price: jobDetail?.job_item_id?.job_id?.deliveryCharges || 440,
      orderDetails: {
        pickUpLocation: {
          city: "UK, Bristol", // Placeholder, adapt based on your data structure
          address: jobDetail?.job_item_id?.job_id?.pick_up_location || "N/A",
          latitude: jobDetail?.job_item_id?.job_id?.branch_latitude,
          longitude: jobDetail?.job_item_id?.job_id?.branch_longitude,
        },
        dropOffLocation: {
          city: "UK, Charles Gate", // Placeholder, adapt based on your data structure
          address:
            jobDetail?.job_item_id?.job_id?.order_shipping_address?.location ||
            "N/A",
        },
        typeOfMaterial:
          jobDetail?.job_item_id?.product_id?.category_id?.category_name ||
          "Unknown Material",
        weightOfCargo: `${jobDetail?.job_item_id?.product_quantity || 0} kilogram`,
      },
      // Uncomment and add default values if needed for bid details
      // bid: {
      //     suggestedAmount: `$${ jobDetail?.job_item_id?.job_id?.delivery_charges?.toFixed(2) || "0.00" } `,
      //     totalAmount: `$${ jobDetail?.job_item_id?.job_id?.quotation_amount_with_vat?.toFixed(2) || "0.00" } `
      // }
    };
    return formattedResponse;
  };

  formatProposalsDetail = (job) => {
    const originLat = job?.job_item_id?.job_id?.order_billing_address?.latitude; // Example: New York latitude
    const originLon =
      job?.job_item_id?.job_id?.order_billing_address?.longitude; // Example: New York longitude
    const destinationLat =
      job?.job_item_id?.job_id?.order_shipping_address?.latitude; // Example: Los Angeles latitude
    const destinationLon =
      job?.job_item_id?.job_id?.order_shipping_address?.longitude;
    const distance = calculateDistance(
      originLat,
      originLon,
      destinationLat,
      destinationLon,
    );
    return {
      _id: job._id,
      jobNo: job?.job_item_id?.job_id?.job_no || "",
      vehicle: {
        id: job?.vehicle_id?._id || "",
        model: job?.vehicle_id?.registration_no || "N/A",
        category:
          job?.job_item_id?.product_id?.pages_descriptions?.en?.product_name ||
          "Unknown Category",
        capacity: `${job?.vehicle_id?.capacity || "0"} ${job?.job_item_id?.product_id?.weight_unit || "kg"} `,
        imageUrl:
          `https://www.mausool.com/public/frontend/uploads/vehicle_type/${job?.job_item_id?.job_id?.vehicle_id?.vehicle_type?.image}` ||
          "default_vehicle_image.jpg",
      },
      driver: {
        name: job?.driver_id
          ? `${job.driver_id?.first_name || ""} ${job.driver_id?.last_name || ""} `
          : "Driver Name",
        email: job?.driver_id?.email || "driver@example.com",
        rating: job?.driver_id?.average_rating
          ? job.driver_id.average_rating.toFixed(1)
          : "N/A",
        profileImage: job?.driver_id?.profile_image
          ? `https://www.mausool.com/public/frontend/uploads/user/${job?.driver_id?.profile_image}`
          : "https://www.https://www.mausool.com/public/frontend/uploads/user/APR2021//1619098248965-userimg.png",
      },
      orderDetails: {
        pickUpCity: "UK, Bristol",
        dropOffCity: "UK, Charles Gate",
        pickUpLocation:
          job?.job_item_id?.job_id?.order_billing_address?.location || "N/A",
        dropOffLocation:
          job?.job_item_id?.job_id?.order_shipping_address?.location || "N/A",
        typeOfMaterial:
          job?.job_item_id?.product_id?.pages_descriptions?.en?.product_name ||
          "N/A",
        weightOfCargo: `${job?.job_item_id?.product_quantity || "0"} ${job?.job_item_id?.product_id?.weight_unit || "kg"} `,
        bidProposalAmount: job?.quotation_amount || 0,
        distance: distance || 100,
        distanceUnit: "KM",
      },
    };
  };
  formatProposalsDecision = (job, remaingBids) => {
    return {
      _id: job._id,
      vehicle: {
        id: job?.vehicle_id?._id || "",
        category:
          job?.job_item_id?.product_id?.pages_descriptions?.en?.product_name ||
          "Unknown Category",
      },
      orderDetails: {
        dropOffLocation:
          job?.job_item_id?.job_id?.order_shipping_address?.location || "N/A",
        moreBids: remaingBids,
      },
    };
  };

  formatProposalsConfirmation = (job) => {
    return {
      _id: job._id,
      orderDetail: {
        orderId: job?.vehicle_id?.registration_no || "N/A",
        location:
          job?.job_item_id?.job_id?.order_billing_address?.location || "N/A",
        date: job?.job_item_id?.job_id?.created
          ? new Date(job.job_item_id.job_id.created).toLocaleDateString()
          : "N/A",
        truckNo: job?.vehicle_id?.licence_plate_no || "N/A",
      },
      driverDetail: {
        driverId: job?.driver_id?._id,
        name:
          `${job?.driver_id?.first_name || ""} ${job?.driver_id?.last_name || ""} `.trim() ||
          "Driver Name",
        location: job?.driver_id?.city_name
          ? `${job?.driver_id?.country_id || "Country"}, ${job.driver_id.city_name} `
          : "N/A",
        contactNumber: job?.driver_id?.mobile_number || "N/A",
        profileImage: job?.driver_id?.profile_image
          ? `https://www.mausool.com/public/frontend/uploads/user/${job?.driver_id?.profile_image}`
          : "https://www.https://www.mausool.com/public/frontend/uploads/user/APR2021//1619098248965-userimg.png",
      },
      totalAmount: {
        amount: job?.quotation_amount || 0,
        gst: job?.quotation_amount
          ? parseFloat((job.quotation_amount * 0.1).toFixed(2))
          : 0, // Assuming GST is 10%
        gstPercentage: 10, // Assuming GST is 10%
      },
    };
  };

  async _counts(company_id) {
    try {
      // Convert company_id to ObjectId if it's not already one
      const companyObjectId = new mongoose.Types.ObjectId(company_id);

      // Group documents by status and count each
      const statusCounts = await marketPlaceModel.aggregate([
        {
          $match: { company_id: companyObjectId }, // Filter by company_id as ObjectId
        },
        {
          $group: {
            _id: "$bid_status", // Group by the "bid_status" field
            count: { $sum: 1 }, // Count the occurrences of each status
          },
        },
      ]);

      // Initialize the counts with default values
      const counts = {
        available: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
      };

      // Map the aggregated results to the counts object
      statusCounts.forEach((item) => {
        switch (item._id) {
          case "available":
            counts.available = item.count;
            break;
          case "pending":
            counts.pending = item.count;
            break;
          case "accepted":
            counts.accepted = item.count;
            break;
          case "rejected":
            counts.rejected = item.count;
            break;
          default:
            break;
        }
      });

      return counts;
    } catch (error) {
      throw new Error(`Error fetching counts: ${error.message}`);
    }
  }
}

module.exports = new marketPlaceService();
