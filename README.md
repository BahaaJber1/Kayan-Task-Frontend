# Kayan Medical Clinic Management System - Frontend

A modern, responsive frontend application for managing medical clinic operations, built with React and Vite.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Key Components](#key-components)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

This frontend application provides an intuitive interface for a medical clinic management platform. It supports three user roles (Patient, Doctor, Finance) with role-specific dashboards, visit management, treatment tracking.

## ✨ Features

### Authentication

- User login and registration
- Role-based authentication (Patient, Doctor, Finance)
- Secure session management
- Protected routes based on user roles

### Patient Dashboard

- Book new visits with doctors
- View upcoming and past visits
- Cancel pending visits with confirmation
- View visit details including treatments and costs
- Track visit status (pending, accepted, completed, cancelled)

### Doctor Dashboard

- View all assigned visits
- Accept pending visit requests (one active visit at a time)
- Complete visits with medical notes and treatments
- Add multiple treatments with individual costs
- Cancel visits with confirmation
- Automatic total amount calculation

### Finance Dashboard

- View all visits across the clinic
- Track visit amounts and treatments
- Financial reporting and overview
- Filtering visits based (id, patient name, doctor name)

### UI/UX Features

- Smooth animations with Motion (Framer Motion)
- Responsive design for all screen sizes
- Dark mode support
- Toast notifications for user feedback
- Confirmation dialogs for critical actions
- Loading states and spinners
- Form validation with real-time feedback

## 🛠 Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Routing**: TanStack Router
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Motion (Framer Motion)
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Tables**: React Table

## 📦 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/BahaaJber1/Kayan-Task-Frontend.git
cd frontend
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

## 🔐 Environment Variables

Create a `.env` file in the frontend root directory with the following variables:

```env
# API Configuration
VITE_BACKEND_URL=http://localhost
VITE_BACKEND_PORT=5000
VITE_API=/api/v1
```

## 🏃 Running the Application

### Development Mode

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:3000` by default.

### Build for Production

Using npm:

```
npm run build
```

Using yarn:

```bash
yarn build
```

### Preview Production Build

Using npm:

```bash
npm run preview
```

Using yarn:

```bash
yarn preview
```

## 📁 Folder Structure

```
frontend/
├── public/
│   └── assets/              # Static assets (images, fonts, etc.)
│
├── src/
│   ├── api/
│   │   ├── api.js          # Axios instance configuration
│   │   ├── useAuth.js      # Authentication API hooks
│   │   └── useVisits.js    # Visits API hooks (CRUD operations)
│   │
│   ├── components/
│   │   ├── application/    # Global application components
│   │   │
│   │   ├── site/       # Private (authenticated) components
│   │   │
│   │   └── ui/        # shadcn/ui components
│   │
│   ├── slices/
│   │   ├── theme/
│   │   │   └── themeSlice.js           # Redux slice for theme state
│   │   └── user/
│   │       └── userSlice.js            # Redux slice for user state
│   │
│   ├── lib/
│   │   └── utils.js                    # Utility functions (cn, etc.)
│   │
│   │
│   ├── routes/
│   │   └── __root.jsx                  # TanStack Router root configuration
|   |   └── index.jsx                   # "/" route
|   |   └── dashboard                   # /dashboard route
│   │
│   ├── schemas/                        # Zod validation schemas
│   │
│   │
│   ├── App.jsx                         # Main application component
│   ├── index.css                       # Global styles and Tailwind imports
└── └── main.jsx                        # Application entry point
```

## 🔑 Key Components

### AuthForm

- Handles both login and registration
- Role selection for registration
- Form validation with Zod
- Smooth transitions between modes

### Patient Dashboard

- Date picker for booking visits
- Doctor selection dropdown
- Visit history with status badges
- Cancel visit with toast confirmation

### Doctor Dashboard

- Pending visits list
- Accept visit (one active at a time)
- Complete visit form with treatments
- Dynamic treatment fields (add/remove)
- Automatic total calculation

### Finance Dashboard

- All visits overview
- Treatment cost breakdown
- Status filtering
- Financial summaries

### Visit Component

- Animated card with glow effect based on status
- Dialog modal for detailed view
- Role-specific actions (accept, complete, cancel)
- Responsive layout

## 🎨 Styling

The application uses:

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theme customization
- **Custom Colors**: `kayan-accent` and `kayan-green`
- **Dark Mode** support with system preference detection
- **Responsive Design** for mobile, tablet, and desktop

## 🔒 Security Features

- Protected routes based on authentication
- Role-based component rendering
- CORS-enabled API requests
- Input validation on client and server
- Confirmation dialogs for destructive actions

## 🚀 Performance Optimizations

- Code splitting with TanStack Router
- React Query caching and background refetching
- Lazy loading of components
- Optimized animations with Motion
- Vite's fast HMR (Hot Module Replacement)

---

## Future Enhancements

- Separate the `FieldError` into its own component for the animation part.
- Add `user verification` functionalities into the `useAuth` hook.
- Update the `input fields` inside the `AuthForm` component with icons.
- Refactor the code for better readability and maintainability.

---

## Author

Developed by [BahaaJber](https://github.com/BahaaJber1).
