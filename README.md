# 🌉 MindBridge V2
### *Anonymous Peer Support Platform for Indian Students*

A secure, judgment-free space where students can share their struggles and receive support from peers who understand their unique challenges.

## 🎯 Why MindBridge?

In India's high-pressure academic environment, students face immense stress from board exams, family expectations, and social stigma. MindBridge creates a safe harbor where vulnerability meets understanding—no names, no judgment, just authentic peer support.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd mindbridge

# Backend setup
cd server
npm install
# Replace firebase-service-account.json with your credentials
npm run dev

# Frontend setup (new terminal)
cd client
npm install
npm run dev
```

## 🛠️ Architecture

**Backend (Node.js + Express)**
- Firebase Firestore for data persistence
- Pessimistic state updates for reliability
- Atomic transactions for likes/deletes
- CORS-enabled for frontend communication

**Frontend (React + Vite + Tailwind)**
- Modern, responsive UI design
- Real-time post fetching and updates
- Pessimistic UI updates (wait for server response)
- Clean component architecture

## 🌟 Core Features

### ✅ Implemented
- **Anonymous Posting**: Share thoughts without registration
- **Categorized Support**: Academic pressure, mental health, career guidance
- **Real-time Likes**: Persistent like counts with atomic updates
- **Safe Deletion**: Remove posts with server confirmation
- **Modern UI**: Clean, accessible design with Tailwind CSS

### 🔄 Coming Soon
- **Reply System**: Threaded conversations
- **SOS Integration**: National helpline connections
- **Peer Matching**: Connect with verified listeners
- **Resource Library**: Mental health resources

## 📊 Data Model

Each post contains:
- `id`: Unique document identifier
- `content`: Post text content
- `category`: Support category (e.g., "Study Tips", "Mental Health")
- `likes`: Like count (default: 0)
- `replies`: Reply array (coming soon)
- `createdAt`: Server timestamp

## � API Endpoints

```
GET    /api/posts           # Fetch all posts
POST   /api/posts           # Create new post
POST   /api/posts/:id/like  # Like a post
DELETE /api/posts/:id       # Delete a post
```

## 🏗️ Project Structure

```
mindbridge/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application
│   │   └── index.css      # Tailwind + custom styles
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
├── server/                 # Express backend
│   ├── app.js             # Main server file
│   ├── firebase-service-account.json
│   └── package.json
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # This file
```

## 🔒 Security & Privacy

- **Zero PII**: No personal information collected
- **Firebase Security Rules**: Controlled data access
- **Environment Variables**: Secure credential handling
- **CORS Protection**: Controlled frontend access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement with pessimistic updates
4. Test thoroughly
5. Submit a pull request

## 📞 Support & Resources

For immediate help:
- **National Suicide Prevention Lifeline**: 988
- **Samaritans**: 116 123
- **Local mental health services**

---

*Built with ❤️ for India's student community*  
*V2: Production-ready architecture with 100% data consistency*