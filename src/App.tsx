import "./App.css";
import HimnoStack from "./HimnoStack";
import { OfflineIndicator, OfflineReadyIndicator } from "./components/OfflineIndicator";

const App = () => {
  return (
    <>
      <OfflineIndicator />
      <OfflineReadyIndicator />
      <HimnoStack />
    </>
  );
};

export default App;
