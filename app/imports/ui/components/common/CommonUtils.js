import { DateTime } from 'luxon';

// displays timestamp like '10/14/1983, 9:30 AM'
// see https://moment.github.io/luxon/api-docs/index.html#datetimedatetime_short
export function displayLocalTime(jsdate) {
  console.log(jsdate);
  const localTime = DateTime.fromJSDate(jsdate).toFormat('M/d/yy, h:m a');
  console.log('local time', localTime);
  return localTime;
}

function getRelativeText(hours, unit) {
  return DateTime.now().minus({ hours }).toRelative({ unit });
}

// simple logic to either display full timestamp
// or relative timestamp if jsdate was within one day
export function displayRelativeTime(jsdate) {
  const m = DateTime.fromJSDate(jsdate);
  const { hours } = DateTime.now().diff(m, 'hours');
  if (hours > 24) {
    return displayLocalTime(jsdate);
  }
  if (hours > 1) {
    return getRelativeText(hours, 'hours');
  }
  if (hours > 2 / 60) {
    return getRelativeText(hours, 'minutes');
  }
  return 'just now';
}
