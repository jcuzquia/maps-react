import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getUserLocation } from "../../helpers";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];

  setUserLocation: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
}

const storeApi: StateCreator<PlacesState> = (set) => ({
  isLoading: false,
  userLocation: undefined,

  setUserLocation: async () => {
    console.log("Finding User Location");
    const [lon, lat] = await getUserLocation();
    set((state) => ({ ...state, userLocation: [lon, lat] }));
  },

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },
});

export const usePlacesStore = create<PlacesState>()(
  devtools(persist(storeApi, { name: "places-store" }))
);
