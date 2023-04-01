import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  FormLabel,
  Radio,
  Grid,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const UsersList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    // Fetch list of users on component mount
    axios
      .get("https://gorest.co.in/public/v2/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (event) => {
    // Update the state of new user with form inputs
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };
  const BEARER_TOKEN =process.env.REACT_APP_BEARER_TOKEN;
  const handleNewUserSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://gorest.co.in/public/v2/users",
        { ...newUser, status: "active" },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setUsers([...users, res.data]);
        setNewUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container={2}>
        <Grid xs={6}>
          <Typography variant="h3">List of Users</Typography>
          <List>
            {users.map((user) => (
              <NavLink key={user.id} to={`/users/${user.id}`}>
                <ListItem Button>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Grid>
        <Grid xs={6}>
          <form className={classes.form} onSubmit={handleNewUserSubmit}>
            <Typography variant="h4">Create New User</Typography>
            <TextField
              label="Name"
              name="name"
              onChange={handleInputChange}
              value={newUser.name || ""}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={newUser.email || ""}
              required
            />
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={newUser.gender || ""}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <Button variant="contained" color="primary" type="submit">
              Create User
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
