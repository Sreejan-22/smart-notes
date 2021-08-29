import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Notes from "./components/Notes/Notes";
import Create from "./components/Create/Create";
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
  const [loading, setLoading] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     fetch("http://localhost:3000/notes", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((jsonData) => {
  //         if (jsonData.isLoggedIn) {
  //           setIsAuthenticated(true);
  //         }
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/create">
                <Create />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/notes">
                <Notes />
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
      )}
    </>
  );
};

export default App;
