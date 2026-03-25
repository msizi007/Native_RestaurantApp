## Native Restaurant App

![Native_RestaurantApp](https://socialify.git.ci/msizi007/Native_RestaurantApp/image?language=1&owner=1&name=1&stargazers=1&theme=Light)

BookNest is a comprehensive solution for restaurant discovery and reservation management.

#### Get Started

1. Clone the project

```bash
git clone https://github.com/msizi007/Native_RestaurantApp.git
```

2. install the necessary dependancies

```bash
npm install
```

3. Start running the app with npm start

```bash
npm start
```

#### Credentials

- In order to test the admin functionality these are the admin credentials. This can also be found under **./admin.json**

```json
{
  "email": "admin07@gmail.com",
  "password": "admin07"
}
```

#### Project Structure

```bash
Native_RestaurantApp/
├── .expo/                # Expo configuration and cache
├── .vscode/              # Editor-specific settings
├── app/                  # Main Application Router (Expo Router)
│   ├── (auth)/           # Authentication Group
│   │   ├── _layout.tsx      # Auth-specific layout
│   │   ├── login.tsx        # Login Screen
│   │   └── register.tsx     # Registration Screen
│   ├── (tabs)/           # Main App Navigation (Tab Bar)
│   │   ├── _layout.tsx      # Tab bar configuration
│   │   ├── cart.tsx         # Shopping Cart Screen
│   │   ├── checkout.tsx     # Checkout Process Screen
│   │   └── profile.tsx      # User Profile Screen
│   ├── admin/            # Administrative Screens
│   ├── item/             # Item detail view routes
│   └── profile/          # Expanded profile routes
│       ├── _layout.tsx
│       └── index.tsx
├── assets/               # Images, fonts, and static media
├── components/           # Reusable UI Components
├── features/             # Redux Slices (State Logic)
├── lib/                  # Third-party library configurations
├── services/             # API calls and external services
├── types/                # TypeScript interfaces and types
├── utils/                # Helper functions and constants
├── .env                  # Environment variables (API Keys, URLs)
├── .gitignore
├── admin.json            # Admin specific config
├── app.json              # Expo configuration file
├── database.json         # Local/Mock database storage
├── eslint.config.js      # Linting rules
├── expo-env.d.ts
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── store.ts              # Redux Store configuration
└── tsconfig.json         # TypeScript configuration
```

#### Tech Stack

- React Native (UI)
- React Redux (State Management)
- Paystack (Payment API)
- Supabase (Database)

#### Author

M.S Mwelase
