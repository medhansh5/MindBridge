const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { db } = require('../firebase');
const { validateReply } = require('../middleware/validate');

// POST /api/posts/:id/replies
router.post('/:id/replies', validateReply, async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const postRef = db.collection('posts').doc(postId);
    
    const newReply = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(postRef);
      if (!doc.exists) {
        throw new Error('Post not found');
      }
      
      const postData = doc.data();
      const reply = {
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString()
      };
      
      const replies = postData.replies || [];
      replies.push(reply);
      
      transaction.update(postRef, {
        replies,
        replyCount: replies.length
      });
      
      return reply;
    });

    res.status(201).json(newReply);
  } catch (error) {
    if(error.message === 'Post not found') {
        res.status(404).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Failed to add reply' });
    }
  }
});

// GET /api/posts/:id/replies
router.get('/:id/replies', async (req, res) => {
  try {
    const postId = req.params.id;
    const docRef = db.collection('posts').doc(postId);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const postData = doc.data();
    const replies = postData.replies || [];
    
    // Ordered by createdAt asc
    replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    res.json(replies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
});

module.exports = router;
