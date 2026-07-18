const requestCounts = {};
const DEFAULT_WINDOW_MS = 60000;
const DEFAULT_MAX_REQUESTS = 30;

function rateLimit(options = {}) {
  const windowMs = options.windowMs || DEFAULT_WINDOW_MS;
  const maxRequests = options.maxRequests || DEFAULT_MAX_REQUESTS;

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    if (!requestCounts[ip]) {
      requestCounts[ip] = [];
    }

    // Clean up old entries
    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < windowMs);

    if (requestCounts[ip].length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests, please try again later.' });
    }

    requestCounts[ip].push(now);
    next();
  };
}

// Global cleanup every minute to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const ip in requestCounts) {
    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < DEFAULT_WINDOW_MS);
    if (requestCounts[ip].length === 0) {
      delete requestCounts[ip];
    }
  }
}, DEFAULT_WINDOW_MS);

module.exports = rateLimit;
