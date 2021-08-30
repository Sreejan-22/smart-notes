import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import { yellow, green, blue, orange } from "@material-ui/core/colors";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      backgroundColor: (note) => {
        if (note.category === "work") {
          return yellow[700];
        }
        if (note.category === "money") {
          return green[500];
        }
        if (note.category === "todos") {
          return blue[500];
        }
        return orange[900];
      },
    },
    editButton: {
      // display: "inherit",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    deleteButton: {
      // display: "inherit",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    noteMenuButton: {
      // display: "inherit",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});

const NotesCard = ({ note, handleDelete, setEditing, index, noteToEdit }) => {
  const classes = useStyles(note);

  return (
    <div style={{ border: "none" }}>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <>
              <IconButton
                className={classes.editButton}
                onClick={() => {
                  const currentNote = {
                    title: note.title,
                    details: note.details,
                    category: note.category,
                    index,
                  };
                  noteToEdit.current = currentNote;
                  console.log(noteToEdit);
                  setEditing(true);
                }}
              >
                <EditOutlined />
              </IconButton>
              <IconButton
                className={classes.deleteButton}
                onClick={() => handleDelete(index)}
              >
                <DeleteOutlined />
              </IconButton>
              <IconButton className={classes.noteMenuButton}>
                <MoreVertOutlinedIcon />
              </IconButton>
            </>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotesCard;
