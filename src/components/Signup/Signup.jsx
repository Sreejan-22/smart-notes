import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../../utils/notifyToasts";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "capitalize",
  },
  loaderWrapper: {
    position: "absolute",
    top: "40px",
    left: "50%",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    zIndex: "5",
  },
  wrapper: {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: "5",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/notes");
    }
  }, [push]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length && password.length) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status === "ok") {
            localStorage.setItem("token", data.token);
            push("/notes");
            notifySuccess("Welcome!");
          } else {
            if (data.status === "error") {
              const errors = data.errors;
              if (errors.email.length) {
                notifyError(errors.email);
              }
              if (errors.password.length) {
                notifyError(errors.password);
              }
            } else if (data.status === "serverError") {
              notifyError(data.message);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          notifyError("There seems to be an error!!");
        });
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "1rem" }}
          >
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  style={{ paddingBottom: "1rem" }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  style={{ paddingBottom: "1rem" }}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      {loading ? (
        <>
          <div className={classes.loaderWrapper}>
            <CircularProgress className={classes.loader} />
          </div>
          <div className={classes.wrapper}></div>
        </>
      ) : null}
      <ToastContainer />
    </>
  );
}
