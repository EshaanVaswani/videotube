# 🎥 VideoTube

[Live Demo](https://videotube-swart.vercel.app) · [Backend Repository](https://github.com/EshaanVaswani/videotube-backend)

VideoTube is a full-stack video sharing platform inspired by YouTube. Built using **React**, **Redux**, and **Tailwind CSS** for the frontend, and **Node.js**, **Express**, and **MongoDB** for the backend, it allows users to upload, browse, and interact with videos. It also features subscriptions, a personal watch history, and a creator dashboard for managing content.

---

## ✨ Features

-  Upload videos via Cloudinary
-  Watch videos with title, description, and views
-  Like / Dislike functionality
-  Comment on videos
-  Subscribe / Unsubscribe to channels
-  Channel dashboard for creators
-  Watch history and personalized homepage
-  JWT-based authentication and protected routes
-  Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**

-  React.js
-  Redux Toolkit
-  React Router DOM
-  Tailwind CSS
-  Axios
-  ShadCN UI

**Backend**

-  Node.js
-  Express.js
-  MongoDB + Mongoose
-  JWT Authentication
-  Cloudinary (for video uploads)

---

## 🚀 Getting Started

### Prerequisites

-  Node.js (v16+)
-  MongoDB (local or cloud instance)
-  A running instance of the [backend server](https://github.com/EshaanVaswani/videotube-backend)

### Clone the repository

```bash
git clone https://github.com/EshaanVaswani/videotube.git
cd videotube
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file in the root directory

```env
VITE_SERVER_URL=http://localhost:8000
```

> ⚠️ Replace with your deployed backend URL if you're using a live backend.

### Start the development server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

---

## 🧑‍💻 Contributing

Found a bug or have a suggestion? Open an issue or submit a pull request.
Contributions are welcome and appreciated!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

-  Inspired by [YouTube](https://www.youtube.com)
-  Built with modern open-source web technologies
