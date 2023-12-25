import { BtnMyLocation, MapView, ReactLogo, Searchbar } from "../components";

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
      <Searchbar />
    </div>
  );
};
