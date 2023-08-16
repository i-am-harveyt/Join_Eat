import getShopEvents from "../../model/events/rangeShop.model.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function searchEventHandler(req, res, next) {
  const shop_latitude = req.body.latitude
  const shop_longitude = req.body.longitude 
  const { latitude, longitude } = req.query; // self-position
  if (!(latitude && longitude && shop_latitude && shop_longitude)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const events = await getShopEvents(latitude, longitude, shop_latitude, shop_longitude);

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
