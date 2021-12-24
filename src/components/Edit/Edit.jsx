import { useState } from "react";
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

const Edit = ({ currTitle, currDetails, currCategory, index, handleEdit }) => {
  const classes = useStyles();

  const [title, setTitle] = useState(currTitle);
  const [details, setDetails] = useState(currDetails);
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState(currCategory);

  function handleSubmit(e) {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (!title.length) {
      setTitleError(true);
    }

    if (!details.length) {
      setDetailsError(true);
    }

    if (title.length && details.length) {
      const note = {
        title,
        details,
        category,
      };
      handleEdit(index, note);
    }
  }

  return (
    <>
      <Layout>
        <Container>
          <Typography variant="h4" align="center" className={classes.heading}>
            Edit note
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.field}
              label="Note Title"
              variant="outlined"
              fullWidth
              required
              defaultValue={title}
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
              defaultValue={details}
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

export default Edit;
