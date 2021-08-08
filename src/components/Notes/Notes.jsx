import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "blue",
    },
  },

  customText: {
    textDecoration: "underline",
    margin: "auto",
  },
});

const Notes = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
        // style={{ marginBottom: "20px" }}
      >
        Create a New Note
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AcUnitOutlinedIcon />}
        endIcon={<AddShoppingCartIcon />}
      >
        Sample Button
      </Button>
      <br />
      <br />
      <ButtonGroup variant="contained" color="secondary">
        <Button>One</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disableElevation
      >
        Submit
      </Button>
      <br />
      <br />
      <Button className={classes.btn}>Custom Styles</Button>
      <br />
      <Typography variant="h3" className={classes.customText}>
        Custom Styled Text
      </Typography>
    </div>
  );
};

export default Notes;
