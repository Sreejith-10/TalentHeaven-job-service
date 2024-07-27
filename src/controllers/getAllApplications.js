import {ApplicationModel} from "../models/applicationModel.js";

export const getAllApplications = async (req, res) => {
	try {
		const {id} = req.params;
		const applications = await ApplicationModel.find({company_id: id});
		return res.status(200).json({applications});
	} catch (error) {
		console.log(error);
	}
};
