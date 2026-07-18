const express = require('express');
const router = express.Router();
const { db } = require('../firebase');
const { validatePost } = require('../middleware/validate');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST /api/posts
router.post('/', validatePost, async (req, res) => {
  try {
    const { content, category } = req.body;
    const newPost = {
      content,
      category,
      likes: 0,
      replyCount: 0,
      replies: [], // Sub-array on the document
      createdAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('posts').add(newPost);
    res.status(201).json({ id: docRef.id, ...newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const docRef = db.collection('posts').doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await docRef.delete();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
