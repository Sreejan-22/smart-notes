import React from "react";
// import { Switch, Route } from "react-router-dom";
// import Notes from "./pages/Notes";
// import Create from "./pages/Create";
import Checkout from "./Checkout";

const App = () => {
  return (
    // <Switch>
    //   <Route path="/create">
    //     <Create />
    //   </Route>
    //   <Route path="/">
    //     <Notes />
    //   </Route>
    // </Switch>
    <React.Fragment>
      <Checkout />
    </React.Fragment>
  );
};

export default App;
