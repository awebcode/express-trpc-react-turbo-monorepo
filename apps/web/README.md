# Project Structure

src/
├── api/                  # tRPC routers and client setup
│   ├── routers/         # Individual routers (e.g., userRouter, authRouter)
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── index.ts    # Combine routers
│   ├── context.ts       # tRPC context (auth, database)
│   └── trpc.ts         # tRPC client configuration
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Input, Modal)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── feature/        # Feature-specific components
│   │   ├── user/
│   │   └── dashboard/
│   └── index.ts        # Export all components
├── features/            # Feature modules (auth, dashboard, etc.)
│   ├── auth/           # Authentication module
│   │   ├── components/ # LoginForm, RegisterForm
│   │   ├── hooks/      # useAuth, useLogin
│   │   ├── queries/    # useLoginQuery, useRegisterQuery
│   │   └── index.ts
│   ├── dashboard/      # Dashboard module
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── queries/
│   │   └── index.ts
│   └── index.ts        # Export all features
├── hooks/               # Global custom hooks (e.g., useToggle)
├── pages/               # Page-level components (mapped to routes)
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   └── Login.tsx
├── types/               # Shared TypeScript types
├── utils/               # Utility functions (e.g., formatDate)
├── styles/              # Global styles, themes, or CSS modules
│   ├── theme.ts
│   └── global.css
├── routes/              # Route definitions
│   ├── PublicRoutes.tsx
│   ├── PrivateRoutes.tsx
│   └── index.ts
├── tests/               # Unit and integration tests
├── assets/              # Static files (images, fonts)
├── App.tsx              # Root component
├── index.tsx            # Entry point
├── tsconfig.json        # TypeScript config for absolute imports
└── vite.config.ts       # Vite configuration