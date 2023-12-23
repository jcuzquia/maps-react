import "./App.css";
import { PlacesProvider } from "./components/PlacesProvider";
import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <PlacesProvider>
      <HomeScreen />
    </PlacesProvider>
  );
}

export default App;
