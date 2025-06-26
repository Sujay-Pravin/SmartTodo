# SmartTodo 📝✨

SmartTodo is a full-stack Todo application with Google OAuth login and Google Calendar integration. The backend is built with Flask and MySQL, and the frontend uses React (with Vite) and the `@react-oauth/google` package for authentication.

---

## Features 🚀

- 🔐 **User Authentication**: Sign in with Google using OAuth 2.0.
- ✅ **Todo Management**: Create, view, update, and complete todos.
- 📅 **Google Calendar Integration**: Schedule todos directly to your Google Calendar.
- 📱 **Responsive UI**: Built with React and CSS.
- 🔔 **Notifications**: Uses `react-toastify` for user feedback.

---

## Project Structure 🗂️

```
e:\WEBSITES\Todo\
├── backend\
│   ├── config.py
│   └── ... (Flask app files)
├── frontend\
│   ├── src\
│   │   ├── components\
│   │   ├── main.jsx
│   │   └── Router.jsx
│   ├── index.css
│   ├── package.json
│   └── README.md
└── ...
```

---

## Setup Instructions ⚙️

### Backend 🐍

1. **Install Python dependencies**:
   ```bash
   pip install flask flask_sqlalchemy flask_cors pymysql
   ```

2. **Configure Database**:
   - In `backend/config.py`, set your database URI:
     ```
     # Example:
     # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://<username>:<password>@localhost/<database_name>"
     ```
   - **Prompt:** Replace `<username>`, `<password>`, and `<database_name>` with your own MySQL credentials.

3. **Run the Flask server**:
   ```bash
   python main.py
   ```

### Frontend ⚛️

1. **Install Node dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Google OAuth Setup**:
   - In `src/main.jsx`, set your Google OAuth Client ID:
     ```
     // TODO: Replace with your Google OAuth Client ID
     const CLIENT_ID = "YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE"
     ```
   - **Prompt:** Obtain a Client ID from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and replace the placeholder.

---

## Security Notice ⚠️

- **Sensitive Information**:  
  - 🚫 Do **NOT** commit real credentials or secrets to public repositories.
  - 🔒 Use environment variables or secret managers for production deployments.

- **Recommendations**:
  - 📦 Move sensitive values to `.env` files and use a library like `python-dotenv` (backend) or Vite's environment variables (frontend).
  - 📝 Add `.env` to `.gitignore`.

---

## Environment Variables (Recommended) 🌱

- **Backend**:
  - `DATABASE_URI`
- **Frontend**:
  - `VITE_GOOGLE_CLIENT_ID`

---

## License 📄

This project is for educational/demo purposes.  
**Remove or secure all sensitive information before deploying or sharing.**

---

