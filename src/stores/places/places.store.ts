import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { searchApi } from "../../api";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces";

export interface PlacesState {
  isLoading: boolean;
  isLoadingPlaces: boolean;
  userLocation?: [number, number];
  places: Feature[];

  setUserLocation: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
  setPlaces: (features: Feature[]) => void;
  setLoadingPlaces: (loading: boolean) => void;
}

const storeApi: StateCreator<PlacesState> = (set, get) => ({
  isLoading: false,
  isLoadingPlaces: false,
  userLocation: undefined,
  places: [],

  setUserLocation: async () => {
    console.log("Finding User Location");
    const [lon, lat] = await getUserLocation();
    set((state) => ({ ...state, userLocation: [lon, lat] }));
  },

  setIsLoading: (isLoading: boolean) => {
    set((state) => ({ ...state, isLoading }));
  },
  searchPlacesByTerm: async (query: string) => {
    if (query.length === 0) {
      get().setPlaces([]);
      return []; //TODO: limpiar state
    }
    if (!get().userLocation) throw new Error("No hay hubicacion del usuario");
    get().setLoadingPlaces(true);
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: { proximity: get().userLocation?.join(",") },
    });
    return resp.data.features;
  },
  setLoadingPlaces: (loading: boolean) => {
    set((state) => ({ ...state, isLoadingPlaces: loading }));
  },

  setPlaces: (places: Feature[]) => {
    set((state) => ({ ...state, isLoadingPlaces: false, places }));
  },
});

export const usePlacesStore = create<PlacesState>()(devtools(storeApi));
