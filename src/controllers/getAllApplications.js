import {JobModel} from "../models/jobModel.js";

export const getAllApplications = async (req, res) => {
	try {
		const {id} = req.params;

		const jobList = await JobModel.find({company_id: id});

		const applications = jobList.map((item) => item.applications);
		return res.status(200).json({applications});
	} catch (error) {
		console.log(error);
	}
};
