import ChatCompletion from "./ChatCompletion";
import Navigation from "./components/Navigation/Navigation";
import ChooseTest from "./components/ChooseTest/ChooseTest";

function App() {
  return (
    <>
      <Navigation />
      <ChooseTest />
      <ChatCompletion />
    </>
  );
}

export default App;
