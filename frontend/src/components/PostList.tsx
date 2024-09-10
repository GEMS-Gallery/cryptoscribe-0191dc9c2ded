import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

function PostList({ posts }) {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} component={Paper} elevation={2} sx={{ mb: 2, p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="h5" component="h2" gutterBottom>
                {post.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary" paragraph>
                  By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
                </Typography>
                <Typography variant="body1" paragraph>
                  {post.body}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default PostList;
