import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Button component={Link} to="/hobbies" color="inherit">
        Back to All Hobbies
      </Button>
      <Button component={Link} to="/joined" color="inherit">
        Joined Activities
      </Button>
      <Button component={Link} to="/created" color="inherit">
        Created Activities
      </Button>
      <Button component={Link} to="/update-profile" color="inherit">
        Update My Profile
      </Button>
    </Toolbar>
  </AppBar>
);

export default Menu;
