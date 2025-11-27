# TheStockMarket.io

**Learn Stock Market Trading & Analysis Platform**

A comprehensive React/TypeScript application built with Vite for learning stock market trading and analysis. This platform provides educational modules, market data visualization, and user management features.

## 🚀 Features

- **Educational Modules**: Comprehensive learning modules for stock market education
- **Market Data**: Real-time market data integration
- **User Authentication**: Firebase-based authentication system
- **Responsive Design**: Mobile-first responsive design with TailwindCSS
- **Dark/Light Mode**: Theme switching capabilities
- **Admin Dashboard**: Content management for admins
- **Blog System**: Educational blog posts and articles
- **Contact System**: Multi-channel contact options (Email, WhatsApp, Phone)

## 🛠 Tech Stack

- **Frontend**: React 18.3.1, TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19 with SWC
- **Styling**: TailwindCSS 3.4.17, Emotion
- **UI Components**: Radix UI, Material-UI, Custom UI Components
- **State Management**: TanStack React Query 5.83.0
- **Routing**: React Router DOM 6.30.1
- **Backend**: Firebase 12.0.0 (Auth, Firestore, Storage)
- **Development**: ESLint, Prettier, TypeScript ESLint
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Firebase account and project setup

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd stockmarket.ioo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the environment example file and configure your Firebase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase configuration:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Development Environment
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Firebase Setup
1. Update `.firebaserc` with your Firebase project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

2. Initialize Firebase (if needed):
```bash
firebase login
firebase init
```

## 🚀 Development

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

### Linting & Formatting
```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format with Prettier (via IDE or manually)
npx prettier --write .
```

## 🔥 Firebase Services

### Firebase Emulators
Start Firebase emulators for local development:
```bash
npm run firebase:emulators
```

Available services:
- Authentication: `http://localhost:9099`
- Firestore: `http://localhost:8080`
- Storage: `http://localhost:9199`
- Emulator UI: `http://localhost:4000`

### Firebase Deployment
```bash
# Build and deploy to Firebase Hosting
npm run firebase:deploy
```

## 📁 Project Structure

```
stockmarket.ioo/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin-specific components
│   │   └── ui/           # UI library components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries (Firebase config, etc.)
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── dist/                  # Production build output
├── firebase.json          # Firebase configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # TailwindCSS configuration
├── eslint.config.js       # ESLint configuration
├── .prettierrc           # Prettier configuration
└── package.json          # Project dependencies and scripts
```

## 🎨 Styling

The project uses a custom design system based on:
- **TailwindCSS**: Utility-first CSS framework
- **Custom CSS Variables**: Defined in `src/index.css` for theme consistency
- **Component Library**: Custom UI components in `src/components/ui/`

### Theme System
- Light/Dark mode support
- Golden accent color scheme optimized for financial education
- Responsive design with mobile-first approach

## 📱 Components

### Core Components
- **Navigation**: Main navigation with authentication
- **Layout**: Page layout wrapper
- **Footer**: Site footer with links and information
- **ThemeProvider**: Dark/light mode management

### UI Components
- **Button**: Various button styles and sizes
- **Card**: Content cards with headers and content areas
- **Dialog**: Modal dialogs
- **Form Components**: Input, Label, Select, etc.
- **Toast**: Notification system

## 🔐 Authentication

Firebase Authentication is integrated with:
- Email/Password authentication
- Protected routes using `PrivateRoute` component
- Admin role management
- Authentication state management via custom `useAuth` hook

## 📊 State Management

- **TanStack React Query**: Server state management
- **React Context**: Theme and authentication state
- **Local State**: Component-level state with React hooks

## 🧪 Available Scripts

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build for production
npm run preview                # Preview production build
npm run type-check             # Run TypeScript type checking
npm run build:check            # Build with TypeScript checking

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix              # Fix ESLint issues

# Firebase
npm run firebase:emulators     # Start Firebase emulators
npm run firebase:deploy        # Build and deploy to Firebase

# Utilities
npm run clean                  # Clean build directory
```

## 🔧 Configuration Files

- **`vite.config.ts`**: Vite build configuration with React SWC plugin
- **`tsconfig.json`**: TypeScript compiler configuration
- **`tailwind.config.js`**: TailwindCSS configuration
- **`eslint.config.js`**: ESLint linting rules
- **`firebase.json`**: Firebase services configuration
- **`.prettierrc`**: Code formatting rules

## 🚨 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Ensure environment variables are properly set in `.env.local`
   - Check Firebase project settings and API keys

2. **Build Errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Use `npm run build:check` for stricter type checking

3. **Development Server Issues**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf node_modules/.vite`

4. **Styling Issues**
   - Ensure TailwindCSS is properly configured
   - Check for conflicting CSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Write clean, maintainable code
- Follow the existing code structure and patterns
- Test your changes thoroughly before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Avinash Thakur** - TheStockMarket.io

## 📞 Support

- **Email**: financewithmehul@gmail.com
- **WhatsApp**: +91 99884 40766
- **Website**: [TheStockMarket.io](https://thestockmarket.io)

---

**Happy Trading & Learning! 📈**