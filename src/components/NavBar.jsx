import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import './NavBar.css';
import Profile from './Profile';
import Avatar from '@material-ui/core/Avatar';
// import Paper from "@material-ui/core/Paper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// // import Container from "@material-ui/core/Container";
// import { makeStyles } from "@material-ui/core/styles";
// import Divider from "@material-ui/core/Divider";
// import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
// import AddBoxIcon from "@material-ui/icons/AddBox";
// import ArchiveRoundedIcon from "@material-ui/icons/ArchiveRounded";
// import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
// import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";
// import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
// import Link from "@material-ui/core/Link";
// import actions from "../api/index";
// import GroupAddIcon from "@material-ui/icons/GroupAdd";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// Import Components
import TheContext from '../TheContext';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     alignItems: "center",
//     height: "80vh",
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user } = React.useContext(TheContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const { user } = React.useContext(TheContext);
  // // console.log(user)
  // const logOut = async () => {
  //   let res = await actions.logOut();
  //   // window.confirm("Are you sure you want to log out?");
  //   props.setUser(null);
  //   props.history.push("/");
  // };

  return (
    //   <div>
    //     <div className={classes.root}>
    //       <Paper className={classes.paper}>
    //         <MenuList className="navbarContainer">
    //           <Link component={RouterLink} to="/" className="navBarLinks">
    //             <MenuItem>
    //               <AccountBoxRoundedIcon className="menuIcon" />
    //               Profile
    //             </MenuItem>
    //           </Link>
    //           <Divider />
    //           {user.userType === "admin" ? (
    //             <Link
    //               component={RouterLink}
    //               to="/addNewClass"
    //               className="navBarLinks"
    //             >
    //               <MenuItem>
    //                 <GroupAddIcon className="menuIcon" />
    //                 Add New Class
    //               </MenuItem>
    //               <Divider />
    //             </Link>
    //           ) : null}
    //           <Link
    //             component={RouterLink}
    //             to="/newproject"
    //             className="navBarLinks"
    //           >
    //             <MenuItem>
    //               <AddBoxIcon className="menuIcon" />
    //               Add New Project
    //             </MenuItem>
    //           </Link>
    //           <Divider />
    //           <Divider />
    //           <Link component={RouterLink} className="navBarLinks" to="/archive">
    //             <MenuItem>
    //               <ArchiveRoundedIcon className="menuIcon" />
    //               Archive
    //             </MenuItem>
    //           </Link>
    //           <Divider />
    //           <Link
    //             component={RouterLink}
    //             className="navBarLinks"
    //             to="/favorites"
    //           >
    //             <MenuItem>
    //               <FavoriteBorderRoundedIcon className="menuIcon" />
    //               Favorites
    //             </MenuItem>
    //           </Link>
    //           <Divider />
    //           <Link
    //             className="navBarLinks"
    //             href="https://iqueue.netlify.app/"
    //             target="_blank"
    //           >
    //             <MenuItem>
    //               <ContactSupportRoundedIcon className="menuIcon" />
    //               IronQueue
    //             </MenuItem>
    //           </Link>
    //           <Divider />
    //           <Link className="navBarLinks" onClick={logOut}>
    //             <MenuItem>
    //               <ExitToAppRoundedIcon className="menuIcon" />
    //               Logout
    //             </MenuItem>
    //           </Link>
    //         </MenuList>
    //       </Paper>
    //     </div>
    //   </div>
    // );

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{display: 'flex', justifyContent: 'space-between', width: '100%'}} variant='h6' noWrap>
            <span>Ironfolio</span>
            <div style={{display: 'flex'}}>
              <span style={{paddingRight: '20px'}}>{user?.name}</span>
              <Avatar src={user?.imageUrl} />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Profile />
      </main>

    </div>
  );
};

export default NavBar;
