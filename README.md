# 🌉 MindBridge V3

### _Anonymous Peer Support Platform for Indian Students_

A secure, judgment-free space where students can share their struggles, find support from peers who understand, and access mental health resources — all completely anonymously.

## 🎯 Why MindBridge?

In India's high-pressure academic environment, students face immense stress from board exams, competitive entrance tests, family expectations, and social stigma around mental health. MindBridge creates a safe harbor where vulnerability meets understanding — no names, no judgment, just authentic peer support.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/medhansh5/MindBridge.git
cd MindBridge

# Start the backend (Terminal 1)
cd server
npm install
node server.js
# → Server listening on port 3001 (IN-MEMORY mock mode)

# Start the frontend (Terminal 2)
cd client
npm install
npm run dev
# → Open http://localhost:5173
```

> **Note:** The server runs in **in-memory mock mode** by default — no Firebase setup needed. To use a real database, drop your `firebase-service-account.json` into the `server/` directory and restart.

## 🛠️ Architecture

| Layer | Tech | Details |
|-------|------|---------|
| **Frontend** | React 19 + Vite 8 | Single-page app with component architecture |
| **Styling** | Vanilla CSS | Custom design system — dark glassmorphism theme, micro-animations |
| **Backend** | Express 5 | RESTful API with modular route files |
| **Database** | Firebase Firestore | Real-time NoSQL database (with in-memory fallback) |
| **Icons** | Lucide React | Lightweight, tree-shakeable icon library |
| **HTTP** | Axios | API client with Vite dev proxy (`/api` → `:3001`) |

## 🌟 Features

### Anonymous Posting
Share thoughts without registration or any personal information. Choose from 6 support categories: Academic Pressure, Mental Health, Career Guidance, Relationships, Family, and General.

### Threaded Replies
Respond to posts with supportive messages. Single-level threads keep conversations focused and easy to follow.

### Like System
Show support with likes — powered by atomic Firestore transactions to prevent race conditions and ensure accurate counts.

### SOS Helpline Integration
A persistent SOS button provides instant access to Indian crisis helplines:
- **iCall (TISS):** 9152987821
- **Vandrevala Foundation:** 1860-2662-345 (24/7)
- **AASRA:** 9820466726 (24/7)
- **Snehi:** 044-24640050

### Peer Matching
Connect anonymously with a trained peer listener:
- **"I need someone to talk to"** — get matched with an available listener
- **"I'm here to listen"** — volunteer as a peer supporter

### Resource Library
Curated mental health resources across categories: Coping Strategies, Study Tips, Self-Care, and Understanding Emotions.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts` | Fetch all posts (newest first) |
| `POST` | `/api/posts` | Create a new anonymous post |
| `DELETE` | `/api/posts/:id` | Delete a post |
| `POST` | `/api/posts/:id/like` | Like a post (atomic transaction) |
| `GET` | `/api/posts/:id/replies` | Get replies for a post |
| `POST` | `/api/posts/:id/replies` | Add a reply to a post |
| `GET` | `/api/peers/available` | Get count of available listeners |
| `POST` | `/api/peers/volunteer` | Volunteer as a listener |
| `POST` | `/api/peers/request` | Request a peer match |
| `DELETE` | `/api/peers/volunteer/:sessionId` | Leave the volunteer pool |

## 🏗️ Project Structure

```
MindBridge/
├── client/                              # React frontend
│   ├── index.html                       # Entry HTML (Google Fonts, SEO meta)
│   ├── vite.config.js                   # Dev proxy to backend
│   └── src/
│       ├── main.jsx                     # React entry point
│       ├── App.jsx                      # Root component + view routing
│       ├── api/client.js                # Axios API client
│       ├── hooks/
│       │   ├── usePosts.js              # Posts state management
│       │   └── useToast.jsx             # Toast notification context
│       ├── utils/time.js                # Relative time formatting
│       ├── styles/
│       │   ├── index.css                # CSS reset + design tokens
│       │   ├── layout.css               # Page layout
│       │   ├── components.css           # Component styles (BEM)
│       │   └── animations.css           # Keyframes + transitions
│       └── components/
│           ├── UI/                      # Button, Modal, Badge, Toast, Loader
│           ├── Layout/                  # Header, Footer
│           ├── Posts/                   # PostForm, PostCard, PostList, ReplyThread
│           ├── SOS/                     # SOSBanner, SOSModal
│           ├── PeerMatch/               # PeerMatchCard, PeerMatchModal
│           └── Resources/               # ResourceLibrary
│
├── server/                              # Express backend
│   ├── server.js                        # Entry point
│   ├── app.js                           # Express setup + middleware
│   ├── firebase.js                      # Firebase init / in-memory mock
│   ├── middleware/
│   │   ├── rateLimit.js                 # IP-based rate limiter (30 req/min)
│   │   └── validate.js                  # Input validation
│   └── routes/
│       ├── posts.js                     # Post CRUD
│       ├── likes.js                     # Atomic like transactions
│       ├── replies.js                   # Threaded replies
│       └── peers.js                     # Peer matching system
│
├── .gitignore
├── LICENSE
└── README.md
```

## 📊 Data Model

### Post (Firestore `posts` collection)

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique document identifier |
| `content` | `string` | Post text (1–5000 chars) |
| `category` | `string` | Support category |
| `likes` | `number` | Like count (default: 0) |
| `replyCount` | `number` | Number of replies |
| `replies` | `array` | Array of reply objects |
| `createdAt` | `string` | ISO 8601 timestamp |

### Reply (embedded in post)

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | UUID |
| `content` | `string` | Reply text (1–2000 chars) |
| `createdAt` | `string` | ISO 8601 timestamp |

## 🔒 Security & Privacy

- **Zero PII** — no personal information collected, no registration required
- **Rate Limiting** — 30 requests per minute per IP
- **Input Validation** — server-side content length and category whitelist
- **CORS Protection** — configurable origin (defaults to `localhost:5173`)
- **Firebase Credentials** — gitignored, never committed to source control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Implement with pessimistic updates
4. Test thoroughly
5. Submit a pull request

## 📞 Crisis Resources

If you or someone you know is in crisis:

| Helpline | Number | Availability |
|----------|--------|--------------|
| **iCall (TISS)** | 9152987821 | Mon–Sat, 8am–10pm |
| **Vandrevala Foundation** | 1860-2662-345 | 24/7 |
| **AASRA** | 9820466726 | 24/7 |
| **Snehi** | 044-24640050 | Mon–Sat, 8am–10pm |
| **Emergency** | 112 | 24/7 |

---

_Built with ❤️ for India's student community_
_V3: Full-featured rebuild with peer matching, threaded replies, SOS integration, and premium dark UI_