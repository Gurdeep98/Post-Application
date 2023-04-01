import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Grid,
  Paper,
  Typography,
  Button,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";

const useStyles = styled((theme) => ({
  root: {
    marginLeft:"2rem",
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    // padding: theme.spacing(2),
    marginLeft:"1rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginLeft: "auto"
  }
}));

const UserDetailPage = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // Fetch user data

    axios
      .get(`https://gorest.co.in/public/v2/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch posts data
    axios
      .get(`https://gorest.co.in/public/v2/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleCommentsClick = (postId) => {
    setSelectedPostId(postId);
    axios
      .get(`https://gorest.co.in/public/v2/comments?postId=${postId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
            <Typography variant="subtitle1">{user.gender}</Typography>
            <Link key={userId} to={`/users/${userId}/newpost`}>
              <Button variant="contained" color="primary">Add New Post</Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemText primary={post.title} secondary={post.body} />
            <div className={classes.buttons}>
              <Button
                onClick={() => {
                  handleCommentsClick(post.id);
                }}
              >
                Comments
              </Button>
              <Link
                key={userId}
                to={`/users/${userId}/posts/${post.id}/newComment`}
              >
                <Button  variant="contained" color="success">Add New comment</Button>
              </Link>
            </div>
            {selectedPostId === post.id ? (
              <List className={classes.list}>
                {comments.map((comment) => (
                  <ListItem key={comment.id}>
                    <ListItemText
                      primary={comment.name}
                      secondary={comment.body}
                    />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </ListItem>
        ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDetailPage;
