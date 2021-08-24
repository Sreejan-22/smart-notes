import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
});

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "rgba(0, 0, 0, 0.87)" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => {
              history.push("/");
            }}
          >
            Smart Notes
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
