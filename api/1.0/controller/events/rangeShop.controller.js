import getShopEvents from "../../model/events/rangeShop.model.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function searchEventHandler(req, res, next) {
  const { latitude, longitude } = req.body // shop position
  const { lat, lon } = req.query; // self-position
  if (!(lat && lon) || !(latitude && longitude)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const events = await getShopEvents(lat, lon, latitude, longitude);

    res.status(200).json({
      data: {
        events: events
      }
    });
  } catch (err) {
    switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			default:
				return res.status(500).json({ error: err });
		}
  }
}
