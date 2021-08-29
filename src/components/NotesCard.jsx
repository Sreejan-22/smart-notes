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

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.noteType == "work") {
        return yellow[700];
      }
      if (note.noteType == "money") {
        return green[500];
      }
      if (note.noteType == "todos") {
        return blue[500];
      }
      return orange[900];
    },
  },
});

const NotesCard = ({ note, handleDelete, handleEdit, index }) => {
  const classes = useStyles(note);

  const currNote = {
    title: note.title,
    details: note.details,
    category: note.noteType,
  };

  return (
    <div style={{ border: "none" }}>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.noteType[0].toUpperCase()}
            </Avatar>
          }
          action={
            <>
              <IconButton onClick={() => handleEdit(index, currNote)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteOutlined />
              </IconButton>
            </>
          }
          title={note.title}
          subheader={note.noteType}
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
