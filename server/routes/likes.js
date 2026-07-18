const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// POST /api/posts/:id/like
router.post('/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const postRef = db.collection('posts').doc(postId);
    
    const updatedPost = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(postRef);
      if (!doc.exists) {
        throw new Error('Post not found');
      }
      
      const newLikes = (doc.data().likes || 0) + 1;
      transaction.update(postRef, { likes: newLikes });
      
      return { ...doc.data(), id: doc.id, likes: newLikes };
    });
    
    res.json(updatedPost);
  } catch (error) {
    if(error.message === 'Post not found') {
        res.status(404).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Failed to like post' });
    }
  }
});

module.exports = router;
