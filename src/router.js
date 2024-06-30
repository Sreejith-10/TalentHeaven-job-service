import express from "express";
import {createNewJob} from "./controllers/createNewJob.js";
import {searchJobs} from "./controllers/searchJobs.js";
import {getCompanyJobs} from "./controllers/getCompanyJobs.js";
import {getSingleJob} from "./controllers/getSingleJob.js";
import {getAllJobs} from "./controllers/getAllJobs.js";
import {applyForJob} from "./controllers/applyForJob.js";
import {rejectApplication} from "./controllers/rejectApplication.js";
import {getAllApplications} from "./controllers/getAllApplications.js";

const router = express.Router();

router.get("/get-jobs", getAllJobs);
router.get("/get-all-applications/:id", getAllApplications);
router.get("/search", searchJobs);
router.get("/get-job/:id", getSingleJob);
router.get("/get-company-jobs/:id", getCompanyJobs);
router.post("/create-job", createNewJob);
router.post("/apply", applyForJob);
router.post("/reject", rejectApplication);

export default router;
