import { extname } from "path";
import express from "express";
import multer, { diskStorage } from "multer";
import uploadPicture from "../../model/users/uploadPicture.model.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";

// multer setup
const storage = diskStorage({
	destination: (req, file, cb) => cb(null, "static/"),
	filename: (req, file, cb) => {
		const ext = extname(file.originalname);
		cb(null, `${req.user_id}${ext}`);
	},
});
const picUploader = multer({ storage: storage });

/**
 * @param { express.Request } req
 * @param { express.Response } res
 */
const uploadPictureHandler = async (req, res) => {
	const url = `/static/${req.file.filename}`;
	try {
		await uploadPicture(req.user_id, url);
	} catch (err) {
		switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			case ER_WRONG_VALUE_FOR_TYPE.errno:
				return res.status(403).json({ error: ER_WRONG_VALUE_FOR_TYPE.message });

			default:
				return res.status(400).json({ error: err });
		}
	}
	res.status(200).json({
		data: {
			picture: `http://${process.env.JOINEAT_HOST}${url}`,
		},
	});
};

export { picUploader, uploadPictureHandler };
