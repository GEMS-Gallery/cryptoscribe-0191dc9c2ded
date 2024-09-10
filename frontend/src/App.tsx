import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, Container, Button, CircularProgress, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: '#03a87c',
    },
  },
});

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleNewPost = async (title, body, author) => {
    setLoading(true);
    try {
      await backend.createPost(title, body, author);
      await fetchPosts();
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto Blog
          </Typography>
          <Button color="inherit" onClick={() => setShowNewPostForm(!showNewPostForm)}>
            {showNewPostForm ? 'Cancel' : 'New Post'}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : showNewPostForm ? (
          <NewPostForm onSubmit={handleNewPost} />
        ) : (
          <PostList posts={posts} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
