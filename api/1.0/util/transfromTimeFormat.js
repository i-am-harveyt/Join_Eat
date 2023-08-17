/**
 * @param {string} stirngTime
 */

export default function transformTimeFormat(stringTime) {
  const time = new Date(stringTime);
  return {
     "year": time.getFullYear(),
     "month": time.getMonth() + 1,
     "date": time.getDate(),
     "hour": time.getHours(),
     "minute": time.getMinutes()
  }
}