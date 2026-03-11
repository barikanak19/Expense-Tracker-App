# 💸 Expense Tracker

A modern, responsive **Expense Tracker** web application built with **React + Vite** as part of a Web Developer Internship assignment.

---

## ✨ Live Demo

> Deploy on Vercel or Netlify (see [Deployment](#-deployment) below)

---

## 📸 Features

| Feature | Description |
|---|---|
| ➕ Add Expenses | Name, Amount & Category with form validation |
| 🗑️ Delete Expenses | Remove any entry with one click |
| 📊 Summary Panel | Total amount + category-wise breakdown with progress bars |
| 💱 Currency Converter | Live rates via Frankfurter API (USD, EUR, GBP, INR) |
| 💾 LocalStorage | Expenses persist across browser sessions |
| 📱 Responsive | Mobile-first layout, works on all screen sizes |
| ⚡ Loading & Error States | Spinner while fetching rates + graceful error handling |

---

## 🗂️ Folder Structure

```
expense-tracker/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Header.jsx
        ├── ExpenseForm.jsx
        ├── ExpenseList.jsx
        ├── SummaryPanel.jsx
        ├── CurrencyConverter.jsx
        └── Footer.jsx
```

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **React Hooks** — `useState`, `useEffect`
- **Plain CSS** — Custom design system with CSS variables
- **Frankfurter API** — Free, open-source currency exchange rates

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- npm v9 or above

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/expense-tracker.git

# 2. Navigate into the project
cd expense-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be deployed.

---

## 🌐 Deployment

### Deploy on Vercel

1. Push your project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **"Add New → Project"**.
4. Import your GitHub repository.
5. Vercel will auto-detect Vite. Click **"Deploy"**.
6. ✅ Done! Your app is live.

### Deploy on Netlify

1. Push your project to a GitHub repository.
2. Go to [netlify.com](https://netlify.com) and sign in.
3. Click **"Add new site → Import an existing project"**.
4. Connect your GitHub repo.
5. Set the following:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**.
7. ✅ Done! Your app is live.

---

## 📡 API Reference

This app uses the [Frankfurter API](https://www.frankfurter.app/) for live currency rates.

```
GET https://api.frankfurter.app/latest?from=INR&to=USD
```

**No API key required.** The API is free and open-source.

---

## 🧩 Component Overview

### `App.jsx`
The root component. Manages global `expenses` state, reads/writes to `localStorage`, computes the total in INR, and passes data to child components via props.

### `Header.jsx`
Displays the app name and tagline at the top of the page.

### `ExpenseForm.jsx`
Controlled form with three fields (name, amount, category). Validates inputs before calling `onAddExpense`. Shows a shake animation on failed validation.

### `ExpenseList.jsx`
Renders all expenses as animated cards with colored category indicators. Shows an empty state illustration when no expenses exist.

### `SummaryPanel.jsx`
Computes and displays the total expenses and a per-category percentage breakdown with animated progress bars.

### `CurrencyConverter.jsx`
Fetches live exchange rates from the Frankfurter API using `useEffect`. Converts the total INR amount to the selected currency in real-time. Handles loading and error states gracefully.

### `Footer.jsx`
Simple footer with attribution and copyright.

---

## 📋 Validation Rules

| Field | Rule |
|---|---|
| Expense Name | Required, cannot be blank |
| Amount | Required, must be a positive number |
| Category | Required, must select one option |

---

## 🎨 Design System

| Property | Value |
|---|---|
| Background | `#0d0d1a` |
| Card | `#1a1a35` |
| Accent (Teal) | `#00d4aa` |
| Accent (Coral) | `#ff6b6b` |
| Heading Font | Syne |
| Body Font | Nunito |

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Kanak Bari**

---

*Built as part of a Web Developer Internship Assignment.*