# GitHub Pages Deployment Guide for React Vite App

A step-by-step guide to deploy your React JSX prototype to GitHub Pages using Vite.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Create a New Vite React Project](#create-a-new-vite-react-project)
3. [Copy Your Component File](#copy-your-component-file)
4. [Install Dependencies](#install-dependencies)
5. [Set Up the Entry Point](#set-up-the-entry-point)
6. [Configure Vite for GitHub Pages](#configure-vite-for-github-pages)
7. [Create and Push to GitHub](#create-and-push-to-github)
8. [Deploy to GitHub Pages](#deploy-to-github-pages)
9. [Alternative Deployment Options](#alternative-deployment-options)
10. [Custom Domain Setup (Optional)](#custom-domain-setup-optional)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### 1. Node.js and npm
Check if you have Node.js installed:
```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/). This includes npm.

### 2. Git
Check if Git is installed:
```bash
git --version
```

If not installed, download from [git-scm.com](https://git-scm.com/).

### 3. GitHub Account
Create a free account at [github.com](https://github.com/).

### 4. GitHub CLI (Optional but Recommended)
For easier repository creation:
```bash
# macOS
brew install gh

# Windows (with Chocolatey)
choco install gh

# Linux
# Follow instructions at https://github.com/cli/cli/blob/trunk/docs/install.md
```

---

## Create a New Vite React Project

Open your terminal and create a new Vite React project:

```bash
npm create vite@latest my-react-app -- --template react
```

Replace `my-react-app` with your desired project name.

Navigate to the project directory:
```bash
cd my-react-app
```

Your project structure should look like:
```
my-react-app/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── package-lock.json
```

---

## Copy Your Component File

Place your `meta-create-platform.jsx` file in the `src/` directory:

```bash
cp path/to/meta-create-platform.jsx src/
```

Or manually copy the file to `src/meta-create-platform.jsx`.

Your `src/` folder should now contain:
```
src/
├── meta-create-platform.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## Install Dependencies

Install the required npm packages for your React component:

```bash
npm install lucide-react recharts
```

This installs:
- **lucide-react**: Icon library
- **recharts**: Chart/visualization library

Verify installation by checking `package.json`:
```bash
cat package.json | grep -A 5 '"dependencies"'
```

---

## Set Up the Entry Point

Update `src/main.jsx` to import and render your component.

Open `src/main.jsx` and replace its contents with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import MetaCreateApp from './meta-create-platform.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MetaCreateApp />
  </React.StrictMode>,
)
```

This imports your `MetaCreateApp` component and renders it to the DOM.

---

## Configure Vite for GitHub Pages

GitHub Pages requires a base path configuration. Update `vite.config.js` to include the base path.

Open `vite.config.js` and update it to:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-react-app/',
})
```

**Important:** Replace `my-react-app` with your actual repository name (must match your GitHub repository name exactly).

For example:
- If your repo is `https://github.com/username/my-awesome-app`, use `base: '/my-awesome-app/'`
- If your repo is the user site repo (username.github.io), use `base: '/'`

---

## Create and Push to GitHub

### Step 1: Create a GitHub Repository

**Option A: Using GitHub CLI (Recommended)**

```bash
gh repo create my-react-app --public --source=. --remote=origin --push
```

**Option B: Using GitHub Web Interface**

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `my-react-app`
3. Add description (optional)
4. Choose "Public" visibility
5. Click "Create repository"
6. Copy the repository URL

### Step 2: Initialize Git and Push

If you didn't use `gh repo create`, initialize git manually:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/my-react-app.git
git push -u origin main
```

Replace `username` with your GitHub username and `my-react-app` with your repository name.

---

## Deploy to GitHub Pages

### Step 1: Install gh-pages Package

Install the `gh-pages` package as a dev dependency:

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add deployment scripts to your `package.json`:

```json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  ...
}
```

Key additions:
- `"predeploy"`: Runs before deploy, builds the app
- `"deploy"`: Deploys the `dist/` folder to GitHub Pages

### Step 3: Deploy Your App

Run the deployment command:

```bash
npm run deploy
```

This will:
1. Build your React app (`npm run build`)
2. Deploy the `dist/` folder to the `gh-pages` branch
3. Push to GitHub

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select **Branch: gh-pages**
5. Click **Save**

Your site will be available at: `https://username.github.io/my-react-app/`

---

## Alternative Deployment Options

### Deploy to Vercel

Vercel offers instant GitHub integration with zero-configuration deployment.

**One-liner deployment:**

```bash
npm i -g vercel && vercel
```

**Steps:**
1. Run the command above
2. Log in with your GitHub account
3. Follow the prompts to connect your repository
4. Your app deploys automatically on every git push

Your site will be available at: `https://my-react-app-username.vercel.app/`

No need to configure `base` path in `vite.config.js` for Vercel root deployments.

---

### Deploy to Netlify

Netlify offers continuous deployment from Git.

**Option A: Using Netlify CLI (One-liner)**

```bash
npm i -g netlify-cli && npm run build && netlify deploy --prod --dir=dist
```

**Option B: Using Netlify Web Interface**

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize
4. Choose your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

Your site will be available at: `https://my-react-app-username.netlify.app/`

---

## Custom Domain Setup (Optional)

If you want to use a custom domain (e.g., `myapp.com`):

### For GitHub Pages

1. Go to your repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain name
3. Click **Save**
4. GitHub will create a `CNAME` file in the `gh-pages` branch
5. Update your domain registrar's DNS settings:
   - Add an `A` record pointing to: `185.199.108.153`
   - Or add a `CNAME` record pointing to: `username.github.io`

### For Vercel

1. Go to your project dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update your DNS records (Vercel provides specific instructions)

### For Netlify

1. Go to your site settings
2. Click **Domain settings** → **Add custom domain**
3. Follow the DNS setup instructions provided by Netlify

---

## Troubleshooting

### Issue: Blank page after deployment

**Solution:** Ensure `base` path in `vite.config.js` matches your repository name.

```javascript
// Incorrect
base: '/wrong-name/',

// Correct
base: '/my-react-app/',
```

### Issue: Assets not loading (404 errors)

**Solution:** Check that the `base` path ends with a `/` and matches your repository name exactly.

### Issue: Component not rendering

**Solution:** Verify that `src/main.jsx` correctly imports `MetaCreateApp`:

```jsx
import MetaCreateApp from './meta-create-platform.jsx'
```

### Issue: Missing dependencies error

**Solution:** Reinstall all dependencies:

```bash
npm install
```

### Issue: Port already in use (dev mode)

**Solution:** Use a different port:

```bash
npm run dev -- --port 3001
```

---

## Next Steps

1. **Test locally**: Run `npm run dev` to test your app before deployment
2. **Monitor deployments**: Check GitHub Actions or your hosting platform's dashboard
3. **Update content**: Make changes, commit, and push to auto-deploy
4. **Add features**: Expand your React component with more functionality

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start local development server

# Build and Deploy
npm run build            # Build for production
npm run deploy           # Deploy to GitHub Pages
npm run preview          # Preview production build locally

# Cleanup
rm -rf node_modules dist # Remove dependencies and build
npm install              # Reinstall dependencies
```

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [GitHub Pages Docs](https://pages.github.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [lucide-react Documentation](https://lucide.dev/guide/packages/lucide-react)
- [Recharts Documentation](https://recharts.org/)

---

**Happy deploying!** 🚀
