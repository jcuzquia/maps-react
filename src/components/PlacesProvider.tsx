import { useEffect } from "react";
import { usePlacesStore } from "../stores";

interface Props {
  children: React.ReactNode;
}

export const PlacesProvider = ({ children }: Props) => {
  const setUserLocation = usePlacesStore((state) => state.setUserLocation);
  const setIsLoading = usePlacesStore((state) => state.setIsLoading);
  useEffect(() => {
    setIsLoading(true);
    setUserLocation()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [setIsLoading, setUserLocation]);

  return <>{children}</>;
};
