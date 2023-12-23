import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiamN1enF1aWEiLCJhIjoiY2xxaGtnZ2ZvMG5scDJxbzdiZHR1NDU1ZyJ9.4UV8691frL8pFiFzSaQFCw";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opcion de geolocation");
  throw new Error("Tu navegador no tiene opcion de geolocation");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
