import {sendToQueue} from "../config/amqp.js";
import {JobModel} from "../models/jobModel.js";

export const applyForJob = async (req, res) => {
	try {
		const {job_id, user_id} = req.body;

		const job = await JobModel.findByIdAndUpdate(job_id, {
			$addToSet: {
				applications: {
					user_id,
					applied_on: new Date().getTime(),
				},
			},
		});

		const cmp_id = job.company_id;

		sendToQueue("APPLY_JOB", {
			job_id,
			user_id,
			cmp_id,
			applied_on: new Date().getTime(),
		}).then(() => {
			return res.status(200).json({message: "applied for job"});
		});

		// push the job_id and date on queue
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
