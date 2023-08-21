/**
 * @param {string} stirngTime
 */
export default function transformTimeFormat(stringTime) {
  const time = new Date(stringTime);
  return {
     "year": time.getFullYear().toString(),
     "month": (time.getMonth() + 1).toString(),
     "date": time.getDate().toString(),
     "hour": time.getHours().toString().padStart(2,'0'),
     "minute": time.getMinutes().toString().padStart(2,'0'),
  }
}
