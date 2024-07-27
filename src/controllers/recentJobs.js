import {JobModel} from "../models/jobModel.js";

export const recentJobs = async (req, res) => {
	try {
		const jobs = await JobModel.find();

		return res.status(200).json({recent_jobs: jobs.reverse().slice(0, 5)});
	} catch (error) {
		console.log(error);
		return res.status(500).json({mesage: "something went wrong"});
	}
};
