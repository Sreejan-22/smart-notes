import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { format } from "date-fns";

const drawerWidth = 240;
const drawerWidthMd = 180;
const drawerWidthXl = 360;

const useStyles = makeStyles((theme) => {
  return {
    authPage: {
      backgroundColor: "#f9f9f9",
      width: "100%",
    },
    root: {
      display: "flex",
    },
    page: {
      backgroundColor: "#f9f9f9",
      width: "100%",
      height: window.document.documentElement.scrollHeight,
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      [theme.breakpoints.up("xl")]: {
        width: drawerWidthXl,
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: drawerWidthMd,
      },
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("xl")]: {
        width: drawerWidthXl,
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: drawerWidthMd,
      },
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    active: {
      backgroundColor: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
      cursor: "pointer",
    },
    titleMobile: {
      flexGrow: 1,
      padding: theme.spacing(2),
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.up("xl")]: {
        width: `calc(100% - ${drawerWidthXl}px)`,
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: `calc(100% - ${drawerWidthMd}px)`,
      },
      [theme.breakpoints.only("xs")]: {
        width: `100%`,
      },
    },
    // we are using mixins here
    // it's a collection of styles used by one of Material UI's components
    // basically the styles including the height of the Toolbar component will be assigned to the
    // component with className "spaceBelowToolbar"
    spaceBelowToolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
      color: "gray",
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    logout: {
      color: "gray",
      cursor: "pointer",
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
    },
    menuButton: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlinedIcon />,
      path: "/notes",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlinedIcon />,
      path: "/create",
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar color="inherit" className={classes.appbar} elevation={1}>
        <Toolbar>
          <Typography className={classes.date}>
            {format(new Date(), "do MMMM y")}
          </Typography>
          <Typography
            variant="h5"
            className={classes.titleMobile}
            onClick={() => history.push("/notes")}
          >
            Smart Notes
          </Typography>
          <Typography className={classes.logout} onClick={handleLogout}>
            Logout
          </Typography>
          <IconButton className={classes.menuButton} onClick={handleClick}>
            <MenuOutlinedIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/create");
              }}
            >
              Create note
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={() => history.push("/notes")}
          >
            Smart Notes
          </Typography>
        </div>

        {/* list of links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        {/* create some space above using a div to prevent the notes from getting overlapped; height of this div needs to be equal to the height of the toolbar */}
        <div className={classes.spaceBelowToolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
