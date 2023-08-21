import getShopEvents from "../../model/events/rangeShop.model.js";
import transformTimeFormat from "../../util/transfromTimeFormat.util.js";
import { ECONNREFUSED } from "../../util/sqlErr.util.js";
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function searchEventHandler(req, res, next) {
  const user_id = req.user_id
  const shop_latitude = req.body.latitude
  const shop_longitude = req.body.longitude 
  const { latitude, longitude } = req.query; // self-position
  console.log("self", latitude, longitude)
  console.log("shop", shop_latitude, shop_longitude)
  if (!(latitude && longitude && shop_latitude && shop_longitude)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const shopEvents = await getShopEvents(user_id, latitude, longitude, shop_latitude, shop_longitude);

    const events = shopEvents.map(event => {
      const { appointment_time, ...eventWithoutTime } = event;
      const time = transformTimeFormat(appointment_time);
      return {
        ...eventWithoutTime,
        "appointment_time": time
      }
    });
    res.status(200).json({
      "data": {
        "events": events
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
