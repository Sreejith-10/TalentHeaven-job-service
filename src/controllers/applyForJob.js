import {listenToQueue, sendToQueue} from "../config/amqp.js";
import {ApplicationModel} from "../models/applicationModel.js";

export const applyForJob = async (req, res) => {
	try {
		const {company_id, job_id, user_id, user_name, user_profile} = req.body;

		await ApplicationModel.updateOne(
			{job_id},
			{
				$push: {
					applications: {
						user_id,
						user_name,
						user_profile,
					},
				},
			}
		);

		sendToQueue("APPLY_JOB", {
			job_id,
			user_id,
			cmp_id: company_id,
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
