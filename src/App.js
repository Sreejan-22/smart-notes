import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Notes from "./components/Notes/Notes";
import Create from "./components/Create/Create";
// import { createTheme, ThemeProvider } from "@material-ui/core";
// import { purple, yellow } from "@material-ui/core/colors";

// customizing our theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#fefefe",
//     },
//     secondary: yellow,
//   },
//   typography: {
//     fontFamily: "Arial",
//     fontWeightLight: 400,
//     fontWeightRegular: 500,
//     fontWeightMedium: 600,
//     fontWeightBold: 700,
//   },
// });

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/">
          <Notes />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
