import {sendToQueue} from "../config/amqp.js";
import {JobModel} from "../models/jobModel.js";

export const createNewJob = async (req, res) => {
	const {jobData, company_id} = req.body;

	if (!company_id) {
		return res.status(400).json({message: "id not provided"});
	}

	const {
		role,
		vaccany,
		job_type,
		job_mode,
		job_description,
		job_requirements,
		experience,
		salary,
		skill_rquired,

		applications_end_date,
	} = jobData;

	const job = await JobModel.create({
		company_id,
		role,
		vaccany,
		job_type,
		job_mode,
		job_description,
		job_requirements,
		skill_rquired,
		experience,
		salary,
		applications_end_date,
	});

	// sendToQueue("JOB_POST", {job_id: job._id, createdOn: job.createdOn});

	return res.json({job_id: job._id});
};
