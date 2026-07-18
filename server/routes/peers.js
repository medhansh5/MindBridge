const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// POST /api/peers/volunteer
router.post('/volunteer', async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }
    
    const volunteer = {
      sessionId,
      availableSince: new Date().toISOString()
    };
    
    // Store in collection using sessionId as doc id
    await db.collection('peers').doc(sessionId).set(volunteer);
    
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to volunteer' });
  }
});

// GET /api/peers/available
router.get('/available', async (req, res) => {
  try {
    const snapshot = await db.collection('peers').get();
    res.json({ count: snapshot.docs.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available count' });
  }
});

// POST /api/peers/request
router.post('/request', async (req, res) => {
  try {
    let matchFound = false;
    let matchId = null;
    
    await db.runTransaction(async (transaction) => {
        const querySnapshot = await db.collection('peers').orderBy('availableSince', 'asc').get();
        if (querySnapshot.docs.length > 0) {
            const oldest = querySnapshot.docs[0];
            matchId = oldest.data().sessionId;
            matchFound = true;
            transaction.delete(db.collection('peers').doc(matchId));
        }
    });
    
    if (matchFound) {
      res.json({ matched: true, matchId });
    } else {
      res.json({ matched: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to request match' });
  }
});

// DELETE /api/peers/volunteer/:sessionId
router.delete('/volunteer/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    await db.collection('peers').doc(sessionId).delete();
    res.json({ message: 'Removed from volunteer pool' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove volunteer' });
  }
});

module.exports = router;
