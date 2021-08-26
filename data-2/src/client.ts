import axios from 'axios'

import mockHourlyDeffectCount from "./mockHourlyDeffectCount";
import {HourlyDeffectCount} from './types'

const startOfDay = 9;

export async function getDailyDeffectCount(): Promise<number> {
  const response = await axios.get('/dailyDeffectCount');
  return response.data.result;
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
