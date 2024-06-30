import {sendToQueue} from "../config/amqp.js";
import {JobModel} from "../models/jobModel.js";

export const rejectApplication = async (req, res) => {
	try {
		const {job_id, user_id} = req.body;

		await JobModel.findOneAndUpdate(
			{
				_id: job_id,
			},
			{
				$set: {
					"applications.$[elem].status": "rejected",
				},
			},
			{
				arrayFilters: [{"elem.user_id": user_id}],
			}
		);

		sendToQueue("JOB_REJECTION", {job_id, user_id});
		return res.status(200).json({message: "application rejected"});
	} catch (error) {
		console.log(error);
		return res.status(500).json({message: "something went wrong"});
	}
};
