import axios from 'axios';

export default axios.create({
  baseURL: 'https://staging-timesheet.railsfactory.com'
});
