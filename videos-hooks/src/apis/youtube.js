import axios from 'axios';

const KEY = "AIzaSyCDT61-pjGPk0d6tO754icq3BNWql_POvg";

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY,
    type: 'video'
  }
})
