 
# PlanMaster

🚀 **PlanMaster** is an AI-powered platform designed to help users create and manage personalized learning paths or task objectives. Whether you're working on professional development or tackling personal goals, PlanMaster organizes your plans and tracks progress to keep you on course!

## 🌐 Live Demo

Check out the live version: [PlanMaster Live](https://plan-master-alpha.vercel.app/)

## 📖 Features

- **AI-Generated Learning Paths**: Automatically generates a step-by-step plan based on user input.
- **Task/Goal Tracking**: Monitor total modules, completed modules, and your progress percentage.
- **Dynamic Learning Path**: Plans evolve based on user progress.
- **Authentication**: Secure login using **NextAuth** with both credential-based and Google authentication.
- **Responsive UI**: Designed with **shadcn/ui** for an elegant and user-friendly interface.
- **Type-Safe and Validated**: Strong validation with **Zod** and **TypeScript** ensuring data integrity.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React-based)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.dev/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

- **Node.js** installed (v16 or above)
- A **Google OAuth client ID and secret** for Google login (set up in the [Google Developer Console](https://console.developers.google.com/))
- Environment variables for NextAuth (explained below)

### Installation

1. **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/PlanMaster.git
    cd PlanMaster
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:

    ```bash
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🧪 Testing

PlanMaster has basic test coverage using the following tools:
- Coming soon...

## 📂 Project Structure

```
├── .next                 # Next.js build files
├── emails                # Email templates (if applicable)
├── node_modules          # Project dependencies
├── src
│   ├── app               # Application pages and routes
│   │   ├── (app)         # Main app-related components/pages
│   │   ├── (auth)        # Authentication-related pages (Login, Signup)
│   ├── api               # API routes for backend integration
│   ├── fonts             # Custom fonts
│   ├── home              # Home page components
│   ├── components        # Reusable UI components
│   ├── context           # Context providers for global state management
│   ├── hooks             # Custom React hooks
│   ├── lib               # Utility functions and helper methods
│   ├── models            # Mongoose models for MongoDB
│   ├── schemas           # Validation schemas (e.g., Zod)
│   ├── types             # TypeScript types and interfaces
│   ├── favicon.ico       # Favicon for the website
│   └── layout.tsx        # Global layout component
├── middleware.ts         # Middleware for authentication and authorization
├── .env                  # Environment variables
├── .eslintrc.json        # ESLint configuration for linting
└── .gitignore            # Ignored files for Git

```

## 🌟 Future Enhancements

- Adding more authentication providers (e.g., GitHub, Twitter).
- Improving AI algorithm for better task and learning path suggestions. 
- Mobile app integration using React Native.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. Please follow the code of conduct and contribution guidelines.

## 📄 License

No specific license for this project.

 
