const express = require("express");
const { decodeBase64Middleware } = require("../../utils/middleware");
const marketPlaceController = require("./controller");
const router = express.Router();

router.get("/job-history/:id", marketPlaceController.gerJobHistory);

router.post("/mausool_job", marketPlaceController.mausoolJobCreate);
router.post(
  "/live_jobs",
  decodeBase64Middleware,
  marketPlaceController.getLiveJobs,
);
router.post("/live_jobs_company", marketPlaceController.getLiveJobsCompany);
router.post(
  "/live_job_detail",
  decodeBase64Middleware,
  marketPlaceController.getLiveJobDetail,
);
router.post(
  "/driver_bid",
  decodeBase64Middleware,
  marketPlaceController.driverBidOnLiveJob,
);
router.post(
  "/driver_bid_company",
  marketPlaceController.driverBidOnLiveJobCompany,
);
router.post(
  "/driver_bids",
  decodeBase64Middleware,
  marketPlaceController.getDriverBiddingJob,
);
router.post(
  "/driver_bids_company",
  marketPlaceController.getDriverBiddingJobCompany,
);
router.post(
  "/accepted_jobs_company",
  marketPlaceController.getAcceptedJobsCompany,
);
router.post(
  "/accepted_jobs",
  decodeBase64Middleware,
  marketPlaceController.getAcceptedJobs,
);
router.post(
  "/rejected_jobs",
  decodeBase64Middleware,
  marketPlaceController.getRejectedJobs,
);
router.post(
  "/rejected_jobs_company",
  marketPlaceController.getRejectedJobsCompany,
);
router.post(
  "/customer_Proposals",
  decodeBase64Middleware,
  marketPlaceController.getCustomerBiddingProposals,
);
router.post(
  "/customer_Proposal_detail",
  decodeBase64Middleware,
  marketPlaceController.getCustomerBiddingProposalsDetail,
);
router.post(
  "/customer_Proposal_confirmation",
  decodeBase64Middleware,
  marketPlaceController.getCustomerBiddingProposalsConfirmation,
);
router.put(
  "/update_bid",
  decodeBase64Middleware,
  marketPlaceController.updateBid,
);
router.delete(
  "/delete_bid",
  decodeBase64Middleware,
  marketPlaceController.deleteBid,
);
router.post(
  "/proposal_decision",
  decodeBase64Middleware,
  marketPlaceController.acceptRejectBid,
);
router.post(
  "/reject_proposal",
  decodeBase64Middleware,
  marketPlaceController.rejectBid,
);
router.post(
  "/customer_rating",
  decodeBase64Middleware,
  marketPlaceController.customerRating,
);
router.post("/encoded", marketPlaceController.encoding);
router.post("/decoded", marketPlaceController.decoding);
router.post("/calculateDistance", marketPlaceController.caculateDistancee);
router.post("/status-counts", marketPlaceController.statusCounts);

module.exports = router;
