import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/notifyToasts";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout";

const useStyles = makeStyles({
  heading: {
    marginTop: 20,
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles();

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("work");

  // error state variables for title and details
  // they'll initially be false
  // if the user submits a blank value in any of the 2 fields, it will be assigned true
  // and the same will reflect in the "error" prop in the respective TextField material ui components

  function handleSubmit(e) {
    e.preventDefault();

    // initialized to false in the beginning to handle the edge case when a user submits with a blank field(s)
    // and fillls the field(s) and submits again
    // if we don't set this false initially, for the above case, an error alert in the field(s) will persist
    setTitleError(false);
    setDetailsError(false);

    if (!title.length) {
      setTitleError(true);
    }

    if (!details.length) {
      setDetailsError(true);
    }

    if (title.length && details.length) {
      fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          details,
          type: category,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            history.push("/notes");
          } else {
            notifyError(data.message);
          }
        });
    }
  }

  return (
    <>
      <Layout>
        <Container>
          <Typography variant="h4" align="center" className={classes.heading}>
            Create a new note
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.field}
              label="Note Title"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setTitle(e.target.value)}
              error={titleError}
            />
            <TextField
              className={classes.field}
              label="Details"
              variant="outlined"
              fullWidth
              required
              multiline
              minRows={4}
              maxRows={8}
              onChange={(e) => setDetails(e.target.value)}
              error={detailsError}
            />
            <FormControl className={classes.field}>
              <FormLabel>
                <Typography variant="h5">Note Category</Typography>
              </FormLabel>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                color="primary"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="work"
                  label="Work"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="todos"
                  label="Todos"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="reminders"
                  label="Reminders"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="money"
                  label="Money"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              // color="secondary"
              // disableElevation
            >
              Submit
            </Button>
          </form>
        </Container>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default Create;
