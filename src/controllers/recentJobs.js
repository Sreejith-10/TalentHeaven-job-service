import { JobModel } from "../models/jobModel.js";

export const recentJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();

    return res.status(200).json({ recentJobs: jobs.reverse().slice(0, 5) });
  } catch (error) {
    return res.json({ mesage: "something went wrong", error });
  }
};
