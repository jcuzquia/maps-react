import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { StateCreator, create } from "zustand";
import { directionsApi } from "../../api";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;

  map?: Map | undefined;
  markers: Marker[];

  setMap: (map: Map) => void;
  setMarkers: (markers: Marker[]) => void;
  removeMarkersFromMap: () => void;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

const storeApi: StateCreator<MapState> = (set, get) => ({
  isMapReady: false,
  map: undefined,
  markers: [],

  setMap: (map: Map | undefined) => {
    if (map) {
      const myLocationPopup = new Popup().setHTML(`<h4>Aqui estoy</h4>
      <p>En algun lugar del mundo</p>`);
      new Marker({ color: "#61DAFB" })
        .setLngLat(map.getCenter())
        .addTo(map)
        .setPopup(myLocationPopup);
      set({ isMapReady: true, map });
    }
  },
  setMarkers: (markers: Marker[]) => {
    set((state) => ({ ...state, markers }));
  },

  removeMarkersFromMap: () => {
    get().markers.forEach((marker) => marker.remove());
  },
  getRouteBetweenPoints: async (start, end) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];

    const { coordinates } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms = kms / 100;

    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);
    for (const coordinate of coordinates) {
      const newCoord: [number, number] = [coordinate[0], coordinate[1]];
      bounds.extend(newCoord);
    }
    get().map?.fitBounds(bounds, { padding: 200 });
    // Polyline

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        ],
      },
    };

    if (get().map?.getLayer("RouteString")) {
      get().map?.removeLayer("RouteString");
      get().map?.removeSource("RouteString");
    }

    get().map?.addSource("RouteString", sourceData);
    get().map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: { "line-cap": "round", "line-join": "round" },
      paint: { "line-color": "black", "line-width": 3 },
    });
  },
});

export const useMapStore = create<MapState>()(storeApi);
