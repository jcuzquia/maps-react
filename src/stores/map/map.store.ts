import { Map } from "mapbox-gl";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface MapState {
  isMapReady: boolean;
  map?: Map;

  setMap: (map: Map) => void;
}

const storeApi: StateCreator<MapState> = (set) => ({
  isMapReady: false,
  map: undefined,

  setMap: (map: Map) => {
    console.log("setting map");
    console.log(map);
    set((state) => ({ ...state, isMapReady: true, map: map }));
  },
});

export const useMapStore = create<MapState>()(
  devtools(persist(storeApi, { name: "map-store" }))
);
