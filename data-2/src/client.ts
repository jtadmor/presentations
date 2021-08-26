import mockHourlyDeffectCount from "./mockHourlyDeffectCount";
import {HourlyDeffectCount} from './types'

const startOfDay = 9;

export async function getDailyDeffectCount(): Promise<number> {
  const startTime = getStartOfDayTimestamp();
  // TODO: plug in actual API call
  return 18;
}

export async function getDeffectsPerHour(): Promise<HourlyDeffectCount[]> {
  const startTime = getStartOfDayTimestamp();
  // TODO: plug in actual API call
  return mockHourlyDeffectCount;
}

// Get timestamp of the start of the day in ms
function getStartOfDayTimestamp() {
  const date = new Date()
  date.setHours(startOfDay, 0, 0, 0)
  return date.getTime()
}
