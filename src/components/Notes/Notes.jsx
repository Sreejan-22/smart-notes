import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NotesCard from "../NotesCard";
import Masonry from "react-masonry-css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyInfo } from "../../utils/notifyToasts";
import "react-toastify/dist/ReactToastify.css";
import "./Notes.css";
import Layout from "../Layout";
import Edit from "../Edit/Edit";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  loaderWrapper: {
    position: "absolute",
    top: "125px",
    // left: "55%",
    // display: "flex",
    // justifyContent: "center",
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
});

const Notes = () => {
  const classes = useStyles();
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const noteToEdit = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/notes", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          if (data.notes) {
            setNotes(data.notes);
          }
          setLoading(false);
        } else {
          if ("isLoggedIn" in data) {
            if (!data.isLoggedIn) {
              setLoading(false);
              history.push("/login");
            }
          } else {
            notifyError(data.message);
          }
        }
      });
  }, []);

  const handleEdit = (index, note) => {
    setLoading(true);
    const { title, details, category } = note;
    fetch(`http://localhost:3000/notes/${index}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        details,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setNotes(data.notes);
          setEditing(false);
          setLoading(false);
          noteToEdit.current = null;
        } else {
          notifyError(data.message);
        }
      });
  };

  const handleDelete = (index) => {
    fetch(`http://localhost:3000/notes/${index}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setNotes(data.updatedNotes);
          notifyInfo("Note deleted!");
        } else {
          notifyError(data.message);
        }
      });
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      {loading ? (
        <>
          <Layout>
            <div className={classes.loaderWrapper}>
              {/* <CircularProgress className={classes.loader} /> */}
              <h2 style={{ textAlign: "center" }}>Loading...</h2>
            </div>
          </Layout>
          {/* <div className={classes.wrapper}></div> */}
        </>
      ) : editing ? (
        <Edit
          currTitle={noteToEdit.current.title}
          currDetails={noteToEdit.current.details}
          currCategory={noteToEdit.current.category}
          index={noteToEdit.current.index}
          handleEdit={handleEdit}
        />
      ) : (
        <Layout>
          <div>
            <Container>
              <Masonry
                breakpointCols={breakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {notes.map((note, index) => (
                  <div item xs={12} md={6} lg={4} key={index}>
                    <NotesCard
                      note={note}
                      handleDelete={handleDelete}
                      setEditing={setEditing}
                      index={index}
                      noteToEdit={noteToEdit}
                    />
                  </div>
                ))}
              </Masonry>
            </Container>
          </div>
        </Layout>
      )}
      <ToastContainer />
    </>
  );
};

export default Notes;
