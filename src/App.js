import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Notes from "./components/Notes/Notes";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
import { createTheme, ThemeProvider } from "@material-ui/core";

// customizing our theme
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/notes">
              <Notes />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/edit/:index">
              <Edit />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              {localStorage.getItem("token") ? (
                <Redirect to="/notes" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
