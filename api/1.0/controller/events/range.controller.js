import getNearbyEvents from "../../model/events/range.model.js";

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

    res.status(200).json({
      data: {
        events: nearbyEvents
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
