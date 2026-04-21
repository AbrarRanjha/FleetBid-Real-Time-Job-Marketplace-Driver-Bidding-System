const marketPlaceService = require("./service");
const userService = require("../user/service");
const { returnApiResult } = require("../../utils/middleware");
const { calculateDistance } = require("../../utils/utils");

class marketPlaceController {
  async gerJobHistory(req, res) {
    try {
      const { id } = req.params;
      const jobs = await marketPlaceService.customerJobHistory(id);
      if (!jobs) {
        return res.status(404).json({ message: "No jobs found", status: true });
      }
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getLiveJobs(req, res) {
    try {
      const { driver_id } = req.body;

      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);

      if (!driver_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "driver_id not found",
          },
        };
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.liveJobs(driver_id, limit, skip);
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Live jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);

      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getLiveJobsCompany(req, res) {
    try {
      const { company_id, name, jobId } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);
      if (!company_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "company_id not found",
          },
        };

        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.liveJobsCompany(
        company_id,
        name,
        jobId,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Live jobs",
        },
      };
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getAcceptedJobs(req, res) {
    try {
      const { driver_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);
      if (!driver_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "driver_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.acceptedJobs(
        driver_id,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "accepted jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getAcceptedJobsCompany(req, res) {
    try {
      const { company_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);
      if (!company_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "company_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.acceptedJobsCompany(
        company_id,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(200).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "accepted jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getRejectedJobsCompany(req, res) {
    try {
      const { company_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      if (!company_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "company_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse.data);
      }
      const jobs = await marketPlaceService.rejectedJobsCompany(
        company_id,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(200).json(errorResponse.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "rejected jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getRejectedJobs(req, res) {
    try {
      const { driver_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      if (!driver_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "driver_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.rejectedJobs(
        driver_id,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Rejected jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data); // return res.status(200).json({ message: "Live jobs", jobs });
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getLiveJobDetail(req, res) {
    try {
      const { bid_id } = req.body;
      if (!bid_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "bid_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobDetail = await marketPlaceService.liveJobDetail(bid_id);

      if (!jobDetail) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobDetail(jobDetail);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Detail Live job",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async driverBidOnLiveJob(req, res) {
    try {
      console.log("body", req.body);

      const { driver_id, job_item_id, vehicle_id, quotation_amount } = req.body;

      const job = await marketPlaceService.driverBidding(
        driver_id,
        job_item_id,
        vehicle_id,
        quotation_amount,
      );
      if (!job) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const response = {
        data: {
          new_api: true,
          status: true,
          data: job,
          message: "you bid the job successfully",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async compantDriverBidOnLiveJob(req, res) {
    try {
      console.log("body", req.body);

      const { driver_id, job_item_id, vehicle_id, quotation_amount, bid_id } =
        req.body;

      const job = await marketPlaceService.companyDriverBidding(
        driver_id,
        job_item_id,
        vehicle_id,
        quotation_amount,
        bid_id,
      );
      if (!job) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const response = {
        data: {
          new_api: true,
          status: true,
          data: job,
          message: "you bid the job successfully",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }

  async driverBidOnLiveJobCompany(req, res) {
    try {
      console.log("body", req.body);

      const {
        driver_id,
        job_item_id,
        vehicle_id,
        quotation_amount,
        company_id,
      } = req.body;

      const job = await marketPlaceService.driverBiddingCompany(
        driver_id,
        job_item_id,
        vehicle_id,
        quotation_amount,
        company_id,
      );
      if (!job) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const response = {
        data: {
          new_api: true,
          status: true,
          data: job,
          message: "you bid the job successfully",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getDriverBiddingJob(req, res) {
    try {
      const { driver_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);
      if (!driver_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,

            message: "driver_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.getDriverBidding(
        driver_id,
        limit,
        skip,
      );
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Bid jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getDriverBiddingJobCompany(req, res) {
    try {
      const { company_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("limit", limit, skip);
      if (!company_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "company_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.getDriverBiddingCompany(
        company_id,
        limit,
        skip,
      );
      console.log(jobs);
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(200).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatLiveJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Bid jobs",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getCustomerBiddingProposals(req, res) {
    try {
      const { customer_id } = req.body;
      const limit = req.body.limit || 20;
      const skip = req.body.skip || 0;
      console.log("customer_id", customer_id);
      if (!customer_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "customer_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }

      const jobs = await marketPlaceService.getCustomerProposals(
        customer_id,
        limit,
        skip,
      );
      // return res.status(200).json(jobs)
      if (!jobs.length) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatProposals(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Proposals for orders",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getCustomerBiddingProposalsDetail(req, res) {
    try {
      const { bid_id } = req.body;
      console.log("bid_id", req.body);
      if (!bid_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "bid_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const job = await marketPlaceService.getCustomerProposalDetail(bid_id);

      if (!job) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatProposalsDetail(job);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Proposals for orders",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async getCustomerBiddingProposalsConfirmation(req, res) {
    try {
      const { bid_id } = req.body;
      if (!bid_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "bid_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const job = await marketPlaceService.getCustomerProposalDetail(bid_id);

      if (!job) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatProposalsConfirmation(job);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "Proposals for orders",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }

  async updateBid(req, res) {
    try {
      const { bid_id, quotation_amount } = req.body;
      const jobs = await marketPlaceService.updateDriverBidding(
        bid_id,
        quotation_amount,
      );
      if (!jobs) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };

        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatUpdateJobs(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "bid updated successfully",
        },
      };

      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);

      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async deleteBid(req, res) {
    try {
      const { bid_id } = req.body;
      const jobs = await marketPlaceService.deleteDriverBidding(bid_id);
      if (!jobs) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };

        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const response = {
        data: {
          new_api: true,
          status: true,
          message: "bid deleted successfully",
        },
      };
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);

      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async acceptRejectBid(req, res) {
    try {
      const { bid_id, status } = req.body;
      if (!bid_id) {
        return res.status(404).json({
          data: {
            new_api: true,
            status: false,
            message: "bid_id not found",
          },
        });
      }

      const jobAction =
        status === "approved" ? "acceptDriverBidding" : "rejectDriverBidding";
      const { jobs, remaingBids } = await marketPlaceService[jobAction](bid_id);

      if (!jobs) {
        return res.status(404).json({
          data: {
            new_api: true,
            status: false,
            data: [],
            message: "No job found",
          },
        });
      }

      const formattedJobs = marketPlaceService.formatProposalsDecision(
        jobs,
        remaingBids,
      );
      const responseMessage =
        status === "approved" ? "your bid is accepted" : "your bid is rejected";

      return res.status(200).json({
        new_api: true,
        status: true,
        data: formattedJobs,
        message: responseMessage,
      });
    } catch (error) {
      console.error("Error processing bid:", error);
      return res.status(500).json({
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      });
    }
  }

  async rejectBid(req, res) {
    try {
      const { bid_id } = req.body;
      if (!bid_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "bid_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const jobs = await marketPlaceService.rejectDriverBidding(bid_id);
      if (!jobs) {
        const errorResponse = {
          data: {
            new_api: true,
            status: true,
            data: [],
            message: "No job found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const formattedJobs = marketPlaceService.formatProposalsDetail(jobs);
      const response = {
        data: {
          new_api: true,
          status: true,
          data: formattedJobs,
          message: "your bid is rejected",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);

      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async customerRating(req, res) {
    try {
      const { customer_id, rating, review, driver_id } = req.body;
      const ratting = await marketPlaceService.createRating(
        customer_id,
        rating,
        driver_id,
        review,
      );
      const response = {
        data: {
          new_api: true,
          status: true,
          data: ratting,
          message: "rating added by customer",
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      console.log("Error getting", error);
      const errorResponse = {
        data: {
          new_api: true,
          status: false,
          message: error.message,
        },
      };
      // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      return res.status(500).json(errorResponse?.data);
    }
  }
  async encoding(req, res) {
    try {
      const { data } = req.body;
      const encodedData = marketPlaceService.encodeData(data);
      return res
        .status(200)
        .json({
          message: "rating added by customer",
          status: true,
          encodedData,
        });
    } catch (error) {
      console.log("Error getting", error);
      return res.status(500).json({ message: error.message, status: false });
    }
  }
  async decoding(req, res) {
    try {
      if (req.body && req.body.data) {
        const resp = JSON.parse(
          Buffer.from(req.body.data, "base64").toString("utf-8"),
        );
        console.log("data: " + JSON.stringify(resp), typeof res);
        return res.status(200).json(resp);
      } else {
        return res
          .status(400)
          .json({
            message: "Missing data field in request body",
            status: false,
          });
      }
    } catch (error) {
      console.log("Error decoding", error);
      return res
        .status(400)
        .json({ message: "Invalid Base64 data format", status: false });
    }
  }
  async caculateDistancee(req, res) {
    try {
      // Example usage:
      const originLat = 25.276987; // Example: New York latitude
      const originLon = 55.296249; // Example: New York longitude
      const destinationLat = 24.453884; // Example: Los Angeles latitude
      const destinationLon = 54.377344; // Example: Los Angeles longitude
      const distance = calculateDistance(
        originLat,
        originLon,
        destinationLat,
        destinationLon,
      );
      console.log(`Distance: ${distance.toFixed(2)} km`);
    } catch (error) {
      console.log("Error decoding", error);
      return res
        .status(400)
        .json({ message: "Invalid Base64 data format", status: false });
    }
  }
  async mausoolJobCreate(req, res) {
    try {
      const { job_id } = req.body;
      if (!job_id) {
        const errorResponse = {
          data: {
            new_api: true,
            status: false,
            message: "job_id not found",
          },
        };
        // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
        // return res.status(404).json(encodedErrorResponse);
        return res.status(404).json(errorResponse?.data);
      }
      const { mausool_cost_amount } = req.body;
      const jobData = await marketPlaceService.prepareJobData(job_id);
      const nearestDrivers = await userService.findNearestDrivers(
        jobData?.job_id?.branch_latitude,
        jobData?.job_id?.branch_longitude,
      );
      // if (!nearestDrivers || nearestDrivers.length === 0) {
      //     const errorResponse = {
      //         data: {
      //             new_api: true,
      //             status: true,
      //             message: 'No nearest drivers found'
      //         }
      //     };
      //     // const encodedErrorResponse = returnApiResult(req, res, errorResponse);
      //     // return res.status(404).json(encodedErrorResponse);
      //     return res.status(404).json(errorResponse?.data);
      // }

      const customerPro = await marketPlaceService.createCustomerProposals(
        mausool_cost_amount,
        jobData,
        nearestDrivers,
      );
      const response = {
        data: {
          new_api: true,
          jobData,
          status: true,
          nearestDrivers,
        },
      };
      // const encodedResponse = returnApiResult(req, res, response);
      // return res.status(200).json(encodedResponse);
      return res.status(200).json(response?.data);
    } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
    }
  }

  async statusCounts(req, res) {
    const { company_id } = req.body;

    try {
      const statusCounts = await marketPlaceService._counts(company_id);
      console.log(statusCounts);
      const response = {
        data: {
          new_api: true,
          statusCounts,
          status: true,
        },
      };
      return res.status(200).json(response?.data);
    } catch (error) {
      return res.status(500).json({ message: error.message, status: false });
    }
  }
}

module.exports = new marketPlaceController();
