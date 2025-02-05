# Project Name

## 🚀 Introduction
This is a Next.js project that uses **Clerk for authentication**, **Drizzle ORM for database management**, and **Gemini AI for AI-related features**.

---

## 📦 Installation

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Kshitij04Poojary/ai-interview.git
cd ai-interview
```

### **Step 2: Install Dependencies**
Make sure you have Node.js installed, then run:
```bash
npm install
```

### **⚙️ Environment Variables**
To run this project, you need to set up environment variables.

#### **Step 1: Create a .env.local File**
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_DRIZZLE_DB_URL=your-drizzle-db-url
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

#### **Step 2: Replace the Placeholder Values**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → Your Clerk publishable key for authentication.
- `CLERK_SECRET_KEY` → Your Clerk secret key (Keep this secure and do not expose it).
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` → The sign-in URL for authentication.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` → The sign-up URL for authentication.
- `NEXT_PUBLIC_DRIZZLE_DB_URL` → Your Drizzle ORM database URL.
- `NEXT_PUBLIC_GEMINI_API_KEY` → Your Gemini API key for AI-related features.

#### **Step 3: Restart the Development Server**
After setting up the environment variables, restart your development server to apply the changes:
```bash
npm run dev
```

## 🏃 Running the Project
To start the Next.js development server, run:
```bash
npm run dev
```
This will start the server at `http://localhost:3000`.

For a production build:
```bash
npm run build
npm start
```

## 🔥 Security Notice
🚨 **Do not share your .env.local file or commit it to Git!**
To prevent accidental exposure, add `.env.local` to your `.gitignore` file:
```gitignore
.env.local
```

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 📞 Contact
If you have any questions, feel free to reach out!

🚀 **Happy Coding!**

