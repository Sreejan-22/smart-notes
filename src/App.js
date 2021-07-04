import { Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";

const App = () => {
  return (
    <Switch>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/">
        <Notes />
      </Route>
    </Switch>
  );
};

export default App;
