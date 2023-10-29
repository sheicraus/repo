import moment from 'moment-timezone';

/**
 * 
 * @param dateStr ISO formatted date (ex. "2023-10-29T09:01:15.761042+00:00")
 * @returns a formatted string (ex. "Oct 29, 2023, 2:31:15 PM")
 */
export const formatDate = (dateStr: string) => {
  if (!dateStr) {
    return "Invalid date"
  }
  const parsedDate = moment(dateStr).tz('Asia/Kolkata');
  const formattedDate = parsedDate.format('MMM DD, YYYY, h:mm:ss A');
  return formattedDate;
} 