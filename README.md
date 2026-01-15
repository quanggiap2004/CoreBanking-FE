# CoreBank - Mini Core Banking System Frontend

A modern, professional ReactJS frontend for a Mini Core Banking System with JWT authentication, account management, and fund transfer capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend API running at `http://localhost:8080`
- In production running at 

### Installation

```bash
# Navigate to project directory
example: cd e:\7.Pet_Project\Java\CoreBanking_FE

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Access the application at: **http://localhost:5173**

### Demo Credentials

```
Username: giapdeptrai2
Password: stbgiap
```

## ✨ Features

- ✅ **User Authentication** - Register, login, logout with JWT
- ✅ **Dashboard** - View all accounts with balances
- ✅ **Account Details** - Complete account info and audit trail
- ✅ **Fund Transfers** - Secure transfers with validation
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Premium UI** - Beautiful gradients and smooth animations

## 🎨 Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **TailwindCSS v4** - Utility-first CSS framework
- **React Hook Form + Yup** - Form validation
- **Headless UI** - Accessible UI components
- **React Hot Toast** - Beautiful notifications

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (Login, Dashboard, etc.)
├── contexts/        # React contexts (AuthContext)
├── services/        # API services
├── utils/           # Utilities (formatters, validators)
├── hooks/           # Custom hooks
└── App.jsx          # Main app with routing
```

## 🔐 API Configuration

Update `.env` to change the backend API URL:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📖 Documentation

See [walkthrough.md](file:///C:/Users/acer/.gemini/antigravity/brain/1bb4f5b0-7c73-4c87-891b-381ffc369ae5/walkthrough.md) for complete documentation including:
- Feature details
- Testing guide
- Deployment instructions
- API integration details

## 🎯 Pages

- `/login` - User login
- `/register` - User registration (multi-step)
- `/dashboard` - Accounts overview
- `/accounts/:id` - Account details and audit trail
- `/transfer` - Fund transfer form

## 🛡️ Security

- JWT token stored in localStorage
- Automatic token attachment to requests
- 401 handling with auto-logout
- Protected routes with authentication guards

## 🎨 Design Highlights

- Premium gradient account cards
- Smooth transitions and animations
- Loading skeletons for better UX
- Toast notifications for feedback
- Color-coded transaction amounts
- Responsive grid layouts

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Testing

1. **Authentication:** Register → Login → Logout
2. **Dashboard:** View accounts, check balances
3. **Account Details:** View transactions and audit trail
4. **Transfers:** Execute transfers with validation
5. **Error Handling:** Test invalid inputs, network errors

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

**Build Command:** `npm run build`  
**Publish Directory:** `dist`

## 📝 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🤝 Backend Integration

This frontend expects the following backend API endpoints:

**Auth:**
- `POST /api/auth/login`
- `POST /api/auth/register`

**Accounts:**
- `GET /api/accounts/{id}`
- `GET /api/accounts/user/{userId}`
- `GET /api/accounts/{id}/audit`

**Transfers:**
- `POST /api/transfers`

## 📊 Status

✅ **Production Ready**

All core features implemented and tested.

## 📞 Support

For issues or questions, refer to the [implementation plan](file:///C:/Users/acer/.gemini/antigravity/brain/1bb4f5b0-7c73-4c87-891b-381ffc369ae5/implementation_plan.md).

---

**Built with ❤️ using React + Vite + TailwindCSS**
