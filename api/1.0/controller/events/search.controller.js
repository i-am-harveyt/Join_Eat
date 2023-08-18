import getSearchEvents from "../../model/events/search.model.js";
import transformTimeFormat from "../../util/transfromTimeFormat.util.js";
import { ECONNREFUSED } from "../../util/sqlErr.util.js";
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function searchEventHandler(req, res, next) {
  const user_id = req.user_id
  const { keyword, latitude, longitude } = req.query;

  if (!(keyword && latitude && longitude)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const searchEvents = await getSearchEvents(user_id, keyword, latitude, longitude);
    const events = searchEvents.map(event => {
      const { appointment_time, ...eventWithoutTime } = event;
      const time = transformTimeFormat(appointment_time);
      return {
        ...eventWithoutTime,
        "appointment_time": time
      }
    });
    
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
