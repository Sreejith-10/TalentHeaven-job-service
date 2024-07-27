import express from "express";
import {createNewJob} from "./controllers/createNewJob.js";
import {searchJobs} from "./controllers/searchJobs.js";
import {getCompanyJobs} from "./controllers/getCompanyJobs.js";
import {getSingleJob} from "./controllers/getSingleJob.js";
import {getAllJobs} from "./controllers/getAllJobs.js";
import {applyForJob} from "./controllers/applyForJob.js";
import {rejectApplication} from "./controllers/rejectApplication.js";
import {getAllApplications} from "./controllers/getAllApplications.js";
import {recentJobs} from "./controllers/recentJobs.js";
import {withdrawApplication} from "./controllers/withdrawApplication.js";
import {getApplicationWithUser} from "./controllers/getApplicationWithUser.js";
import {getApplicationsByJobId} from "./controllers/getApplicationByJobId.js";
import {updateApplicationStatus} from "./controllers/updateApplicationStatus.js";

const router = express.Router();

router.get("/recent-jobs", recentJobs);
router.get("/get-jobs", getAllJobs);
router.get("/get-all-applications/:id", getAllApplications);
router.get("/get-applications-by-jobid/:id", getApplicationsByJobId);
router.get("/get-user-application/:id", getApplicationWithUser);
router.get("/search", searchJobs);
router.get("/get-job/:id", getSingleJob);
router.get("/get-company-jobs/:id", getCompanyJobs);
router.post("/create-job", createNewJob);
router.post("/apply", applyForJob);
router.post("/reject", rejectApplication);
router.post("/update-application-status", updateApplicationStatus);
router.delete("/withdraw-application", withdrawApplication);

export default router;
