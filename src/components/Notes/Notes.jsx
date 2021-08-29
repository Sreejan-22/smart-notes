import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NotesCard from "../NotesCard";
import Masonry from "react-masonry-css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notes.css";
import Layout from "../Layout";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  loaderWrapper: {
    position: "absolute",
    top: "75px",
    left: "49%",
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
});

const Notes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/notes", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          if (data.notes) {
            setNotes(data.notes.notes);
          }
          setLoading(false);
        } else {
          notifyError(data.message);
          setLoading(false);
          history.push("/login");
        }
      });
  }, []);

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const notifyInfo = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
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
          setNotes(data.newNotes.notes);
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
          <div className={classes.loaderWrapper}>
            <CircularProgress className={classes.loader} />
          </div>
          <div className={classes.wrapper}></div>
        </>
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
                      handleDelete={() => handleDelete(index)}
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
