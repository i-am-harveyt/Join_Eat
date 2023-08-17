/**
 * @param {string} stirngTime
 */

export default function transformTimeFormat(stringTime) {
  const time = new Date(stringTime);
  console.log(time.getMonth())
  return {
     "year": time.getFullYear(),
     "month": time.getMonth(),
     "date": time.getDate(),
     "hour": time.getHours(),
     "minute": time.getMinutes()
  }
}