/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import RentEase from "../../assets/rent.png";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import DataContext from "../../context/DataContext";
import './NavBar.css'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [placeholder, setPlaceholder] = useState('Search…');
  const { user, setUser} = useContext(DataContext);
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false,
  });
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
    setUser(null);
    window.location.reload()
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 575) {
        setPlaceholder('Explore New Places…');
      } else {
        setPlaceholder('Search…');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {user ? (
        <>
          <List>
              <ListItem  disablePadding component={Link} to={`messages/${(JSON.parse(localStorage.getItem('profile'))?.user?._id) || (JSON.parse(localStorage.getItem('profile'))?._id)}`}>
                <ListItemButton>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemText primary="Send email" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem  disablePadding component={Link} to={`messages/${JSON.parse(localStorage.getItem('profile'))?.user?._id || JSON.parse(localStorage.getItem('profile'))?._id}`}>
                <ListItemButton>
                  <ListItemText primary="All mail" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
          </List>
        </>
      ) : (
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <Button
              style={{
                fontWeight: "bold",
                color: "black",
                textTransform: "none",
                fontSize: "20px",
              }}
            >
              Sign In &nbsp;
              <LoginIcon />
            </Button>
          </ListItemButton>
        </ListItem>
      )}
      <Divider />
      <div style={{ fontWeight: "bold", margin: "10px" }}>Categories</div>
      <List>
        {["National Parks", "Farms", "Rooms"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {user ? (
        <>
          <Divider />
          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <Button
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textTransform: "none",
                  fontSize: "20px",
                }}
              >
                Logout
              </Button>
              <LogoutIcon />
            </ListItemButton>
          </ListItem>
        </>
      ) : null}
    </Box>
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const GoogleSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    const { sub, name, picture, email } = decoded;
    const userData = { _id: sub, name, imageUrl: picture, email };
    try {
      dispatch({ type: "AUTH", payload: userData });
      window.location.reload()
      Navigate("/");
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = user ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/profile/${user._id ? user._id : user.user._id ? user.user._id : null}`}
      >
        Profile -{" "}
        {user?.name ||
          (user?.firstName && user?.lastName
            ? user?.firstName + " " + user?.lastName
            : user?.user?.firstName && user?.user?.lastName
            ? user?.user?.firstName + " " + user?.user?.lastName
            : "Unknown")}{" "}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Button
        onClick={logout}
        style={{ textTransform: "none", color: "black" }}
      >
        <MenuItem onClick={handleMenuClose} style={{ fontWeight: "bold" }}>
          <LogoutIcon />
          &nbsp;&nbsp;Logout
        </MenuItem>
      </Button>
    </Menu>
  ) : (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ padding: "10px" }}
    >
      <MenuItem
        onClick={handleMenuClose}
        style={{ fontWeight: "bold", marginBottom: "15px" }}
        component={Link}
        to='/login'
      >
        Sign In
      </MenuItem>
      <GoogleLogin
        onSuccess={GoogleSuccess}
        onError={() => console.log("Error")}
        text="signin_with"
        locale="en"
        theme="filled_blue"
      />
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = user ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar
          src={user?.imageUrl}
          alt={
            user?.name?.charAt(0) ||
            user?.user?.firstName?.charAt(0) ||
            user?.firstName?.charAt(0)
          }
        />
        <p style={{ marginLeft: "10px" }}>
          {user?.name ||
            (user?.firstName && user?.lastName
              ? user?.firstName + " " + user?.lastName
              : user?.user?.firstName && user?.user?.lastName
              ? user?.user?.firstName + " " + user?.user?.lastName
              : "Unknown")}
        </p>
      </MenuItem>
      <MenuItem component={user ? Link : null} to={`messages/${JSON.parse(localStorage.getItem('profile'))?.user?._id || JSON.parse(localStorage.getItem('profile'))?._id}`}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="logout" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p style={{ fontWeight: "bold" }} onClick={logout}>
          Logout
        </p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <div>
            <React.Fragment key={"left"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </React.Fragment>
          </div>
          <Link to="/">
            <img
              src={RentEase}
              alt=""
              width="30px"
              style={{ marginRight: "20px" }}
            />
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            style={{ cursor: "pointer", fontFamily: "Georgia" }}
          >
            RentEase
          </Typography>
          <div className="appbar">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              style={{ cursor: "pointer", fontFamily: "Georgia" }}
            >
              Explore New Places
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                className="searchPlaceHolder"
                placeholder={placeholder}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  component={Link}
                  to={`messages/${JSON.parse(localStorage.getItem('profile'))?.user?._id || JSON.parse(localStorage.getItem('profile'))?._id}`}
                >
                  <MailIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <NotificationsIcon />
                </IconButton>
              </>
            ) : null}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user ? (
                <Avatar
                  alt={
                    user?.user?.firstName?.charAt(0) ||
                    user?.firstName?.charAt(0)
                  }
                  src={user?.imageUrl}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
