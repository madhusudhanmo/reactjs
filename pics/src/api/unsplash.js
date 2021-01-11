import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 59fKSy03mUtZxoO8S4vh9WwhW9aLa_C0XhtZI89QiHM"
  }
})
