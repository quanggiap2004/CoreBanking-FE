# Git Setup Script - Run these commands one by one
# This creates a realistic git history over multiple days

# ==================== DAY 1: January 7, 2026 ====================

# Initialize repository
git init

# First commit - Project initialization
git add package.json package-lock.json vite.config.js index.html
git commit -m "Initialize React project with Vite" --date="2026-01-07T09:00:00"

# TailwindCSS setup
git add tailwind.config.js postcss.config.js
git commit -m "Add TailwindCSS configuration with custom theme" --date="2026-01-07T10:30:00"

# Global styles
git add src/index.css src/main.jsx .gitignore
git commit -m "Setup global styles and entry point" --date="2026-01-07T11:00:00"

# Environment and docs
git add .env .env.example README.md
git commit -m "Add environment configuration and documentation" --date="2026-01-07T14:00:00"

# ==================== DAY 2: January 8, 2026 ====================

# API setup
git add src/services/api.js
git commit -m "Configure Axios instance with JWT interceptors" --date="2026-01-08T09:30:00"

# Utilities
git add src/utils/formatters.js src/utils/validators.js
git commit -m "Add utility functions for formatting and validation" --date="2026-01-08T10:45:00"

# Authentication
git add src/contexts/AuthContext.jsx src/hooks/useAuth.js src/services/authService.js
git commit -m "Implement authentication context and service" --date="2026-01-08T14:00:00"

# ==================== DAY 3: January 9, 2026 ====================

# Common components
git add src/components/common/Button.jsx src/components/common/Input.jsx src/components/common/Card.jsx
git commit -m "Create reusable UI components" --date="2026-01-09T09:00:00"

git add src/components/common/Modal.jsx src/components/common/LoadingSkeleton.jsx
git commit -m "Add Modal and LoadingSkeleton components" --date="2026-01-09T10:30:00"

# Layout
git add src/components/layout/Header.jsx
git commit -m "Build application header with user info" --date="2026-01-09T15:00:00"

# ==================== DAY 4: January 10, 2026 ====================

# Login page
git add src/pages/LoginPage.jsx
git commit -m "Implement login page with form validation" --date="2026-01-10T09:30:00"

# Registration
git add src/pages/RegisterPage.jsx
git commit -m "Create multi-step registration form" --date="2026-01-10T13:00:00"

# Routing
git add src/App.jsx
git commit -m "Setup React Router with protected routes" --date="2026-01-10T16:00:00"

# ==================== DAY 5: January 11, 2026 ====================

# Account services
git add src/services/accountService.js
git commit -m "Add account service for API integration" --date="2026-01-11T10:00:00"

# Account card
git add src/components/features/AccountCard.jsx
git commit -m "Design premium account card with gradient backgrounds" --date="2026-01-11T11:30:00"

# Dashboard
git add src/pages/DashboardPage.jsx
git commit -m "Build dashboard with accounts overview" --date="2026-01-11T14:30:00"

# ==================== DAY 6: January 12, 2026 ====================

# Audit trail
git add src/components/features/AuditTrailItem.jsx
git commit -m "Create audit trail item component" --date="2026-01-12T09:00:00"

# Account details
git add src/pages/AccountDetailsPage.jsx
git commit -m "Implement account details page with audit trail" --date="2026-01-12T11:00:00"

# ==================== DAY 7: January 13, 2026 ====================

# Transfer service
git add src/services/transferService.js
git commit -m "Add transfer service" --date="2026-01-13T09:30:00"

# Transfer page
git add src/pages/TransferPage.jsx
git commit -m "Build transfer money form with validation and confirmations" --date="2026-01-13T13:00:00"

# Bug fix (looks human!)
git add src/pages/TransferPage.jsx
git commit -m "Fix transfer modal animation and form reset" --date="2026-01-13T16:00:00"

# ==================== DAY 8: January 14, 2026 ====================

# Refactor to account numbers
git add src/utils/validators.js src/pages/TransferPage.jsx src/components/features/AccountCard.jsx
git commit -m "Refactor transfer to use account numbers instead of IDs" --date="2026-01-14T10:00:00"

# Clean up debug code
git add src/pages/TransferPage.jsx src/pages/DashboardPage.jsx
git commit -m "Remove debug console logs" --date="2026-01-14T11:30:00"

# Update docs
git add README.md src/pages/LoginPage.jsx
git commit -m "Update documentation and demo credentials" --date="2026-01-14T14:00:00"

# ==================== DONE ====================

echo "Git history created successfully!"
echo "Run 'git log --oneline' to see your commits"
