project-root/
│
├── client/                     # Frontend (React / Next.js)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── server/                     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   │   ├── db.js
│   │   │   ├── jwt.js
│   │   │   └── cloudinary.js   # (for future image upload)
│   │   │
│   │   ├── models/             # Mongoose models
│   │   │   ├── user.model.js
│   │   │   └── post.model.js
│   │   │
│   │   ├── controllers/        # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── post.controller.js
│   │   │
│   │   ├── routes/             # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── post.routes.js
│   │   │
│   │   ├── middleware/         # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── utils/              # Helper functions
│   │   │   └── validators.js
│   │   │
│   │   ├── app.js              # Express app configuration
│   │   └── server.js           # Server startup & DB connection
│   │
│   └── package.json
│
├── .env
├── package.json
└── README.md