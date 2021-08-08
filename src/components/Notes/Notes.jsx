import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NotesCard from "../NotesCard";

// const useStyles = makeStyles({
//   btn: {
//     fontSize: 60,
//     backgroundColor: "violet",
//     "&:hover": {
//       backgroundColor: "blue",
//     },
//   },

//   customText: {
//     textDecoration: "underline",
//     margin: "auto",
//   },
// });

const Notes = () => {
  // const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });

    // after deletion of the note in the db.json,
    // which will be deployed on heroku afterwards, hoisted by json server at localhost:8000
    // the same needs to reflect in the notes component i.e. the "notes" state variable
    // so we make a copy of "notes" and remove the note corresponding to this particular "id"
    // and assign the "notes" state variable this "newNotes" array
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} md={6} lg={4} key={note.id}>
              <NotesCard note={note} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Notes;
