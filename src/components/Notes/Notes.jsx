import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import NotesCard from "../NotesCard";
import Masonry from "react-masonry-css";
import "./Notes.css";

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

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Container>
        <Masonry
          breakpointCols={breakPoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((note) => (
            <div item xs={12} md={6} lg={4} key={note.id}>
              <NotesCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
        </Masonry>
      </Container>
    </div>
  );
};

export default Notes;
