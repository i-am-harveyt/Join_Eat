import getNearbyEvents from "../../model/events/range.model.js";
import transformTimeFormat from "../../util/transfromTimeFormat.js";
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function rangeQueryHandler(req, res, next) {
  const { latitude, longitude } = req.query;

  if (!(latitude && longitude)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const nearbyEvents = await getNearbyEvents(latitude, longitude);

    const events = nearbyEvents.map(event => {
      const { appointment_time, ...eventWithoutTime } = event;
      const time = transformTimeFormat(appointment_time);
      return {
        ...eventWithoutTime,
        "appointment_time": time
      }
    });
    res.status(200).json({
      data: {
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
