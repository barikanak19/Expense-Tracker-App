import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import Footer from './components/Footer'

function App() {
  // Load expenses from localStorage on first render
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Persist expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // Add a new expense
  const handleAddExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  // Delete an expense by id
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id))
  }

  // Compute total in INR
  const totalINR = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        {/* Left column: Form + List */}
        <div className="left-column">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </div>

        {/* Right column: Summary + Currency */}
        <div className="right-column">
          <SummaryPanel expenses={expenses} total={totalINR} />
          <CurrencyConverter totalINR={totalINR} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App