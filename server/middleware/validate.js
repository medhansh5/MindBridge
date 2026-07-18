const VALID_CATEGORIES = ['Academic Pressure', 'Mental Health', 'Career Guidance', 'Relationships', 'Family', 'General'];

function validatePost(req, res, next) {
  const { content, category } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length === 0 || content.length > 5000) {
    return res.status(400).json({ error: 'Content is required and must be between 1 and 5000 characters.' });
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  next();
}

function validateReply(req, res, next) {
  const { content } = req.body;

  if (!content || typeof content !== 'string' || content.trim().length === 0 || content.length > 2000) {
    return res.status(400).json({ error: 'Reply content is required and must be between 1 and 2000 characters.' });
  }

  next();
}

module.exports = { validatePost, validateReply };
