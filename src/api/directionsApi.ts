import axios from "axios";

const directions = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    access_token:
      "pk.eyJ1IjoiamN1enF1aWEiLCJhIjoiY2xxaGtnZ2ZvMG5scDJxbzdiZHR1NDU1ZyJ9.4UV8691frL8pFiFzSaQFCw",
  },
});

export default directions;
