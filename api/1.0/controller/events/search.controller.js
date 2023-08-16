import searchEvents from "../../model/events/search.model.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function searchEventHandler(req, res, next) {
  const { keyword, lat, lon } = req.query;

  if (!(keyword && lat && lon)) {
    return res.status(400).json({ error: "Missing Required Input" });
  }

  try {
    const events = await searchEvents(keyword, lat, lon);

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
