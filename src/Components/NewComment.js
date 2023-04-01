import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Grid, Paper, Typography, Button } from "@mui/material";
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
    color: theme.palette.text.secondary,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const NewComment = () => {
  const classes = useStyles();
  const { userId,postId } = useParams();
  const history = useHistory();

  const [newComment, setNewComment] = useState({ name:"",email:"", body: "" });
  const handleCommentInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const BEARER_TOKEN =process.env.REACT_APP_BEARER_TOKEN;

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://gorest.co.in/public/v2/comments",
        { ...newComment, post_id: postId },
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
        setNewComment({ name: "", body: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Create New Comments</Typography>
        <form onSubmit={handleNewCommentSubmit}>
          <TextField
            className={classes.textField}
            label="Name"
            name="name"
            value={newComment.name}
            onChange={handleCommentInputChange}
            required
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Email"
            name="email"
            value={newComment.title}
            onChange={handleCommentInputChange}
            required
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="body"
            name="body"
            value={newComment.body}
            onChange={handleCommentInputChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default NewComment;
