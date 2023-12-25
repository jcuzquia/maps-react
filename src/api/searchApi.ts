import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiamN1enF1aWEiLCJhIjoiY2xxaGtnZ2ZvMG5scDJxbzdiZHR1NDU1ZyJ9.4UV8691frL8pFiFzSaQFCw",
  },
});

export default searchApi;
