import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Notes from "./components/Notes/Notes";
import Create from "./components/Create/Create";
// import Layout from "./components/Layout";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
// import { purple, yellow } from "@material-ui/core/colors";

function NotFound() {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Oops!! 404 Not Found</h1>
    </div>
  );
}

// customizing our theme
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#fefefe",
  //   },
  //   secondary: yellow,
  // },
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
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Layout> */}
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
        {/* </Layout> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
