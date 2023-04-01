import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#333",
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  textField: {
    marginTop: "16px",
    marginBottom: theme.spacing(2),
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  button: {
    marginTop: "24px",
    alignSelf: "flex-end",
  },
}));

const NewPost = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const BEARER_TOKEN =process.env.REACT_APP_BEARER_TOKEN;
  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://gorest.co.in/public/v2/posts",
        { ...newPost, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        history.push(`/users/${userId}`);
        setNewPost({ title: "", body: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Create New Post</Typography>
        <form onSubmit={handleNewPostSubmit}>
          <TextField
            className={classes.textField}
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Body"
            name="body"
            value={newPost.body}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default NewPost;
