const express = require('express');
const cors = require('cors');
const rateLimit = require('./middleware/rateLimit');

const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');
const repliesRouter = require('./routes/replies');
const peersRouter = require('./routes/peers');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.use(express.json());
app.use(rateLimit({ windowMs: 60000, maxRequests: 30 }));

app.use('/api/posts', postsRouter);
app.use('/api/posts', likesRouter);
app.use('/api/posts', repliesRouter);
app.use('/api/peers', peersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
