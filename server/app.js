const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'mindbridge-v2'
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    const postsSnapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { content, category } = req.body;
    
    if (!content || !category) {
      return res.status(400).json({ error: 'Content and category are required' });
    }

    const newPost = {
      content,
      category,
      likes: 0,
      replies: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('posts').add(newPost);
    const createdPost = {
      id: docRef.id,
      ...newPost,
      createdAt: new Date().toISOString()
    };

    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like route with Firestore transaction
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Liking post with ID:', id);
    
    const postRef = db.collection('posts').doc(id);
    
    const updatedPost = await db.runTransaction(async (transaction) => {
      const postDoc = await transaction.get(postRef);
      
      if (!postDoc.exists) {
        throw new Error('Post not found');
      }
      
      const currentLikes = postDoc.data().likes || 0;
      const newLikes = currentLikes + 1;
      
      transaction.update(postRef, { likes: newLikes });
      
      return {
        id: postDoc.id,
        ...postDoc.data(),
        likes: newLikes
      };
    });
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Delete route
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting post with ID:', id);
    
    const postRef = db.collection('posts').doc(id);
    const postDoc = await postRef.get();
    
    if (!postDoc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await postRef.delete();
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
