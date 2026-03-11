import { useState } from 'react'

const CATEGORIES = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other']

const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Marketing: '📢',
  Utilities: '⚡',
  Other: '📦',
}

function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState({})
  const [shake, setShake] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Expense name is required.'
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = 'Enter a valid positive amount.'
    if (!category) newErrors.category = 'Please select a category.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    onAddExpense({ name: name.trim(), amount: Number(amount), category })
    setName('')
    setAmount('')
    setCategory('')
    setErrors({})
  }

  return (
    <section className="card form-card">
      <h2 className="card-title">
        <span className="card-title-icon">＋</span> Add Expense
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`expense-form ${shake ? 'shake' : ''}`}
        noValidate
      >
        {/* Expense Name */}
        <div className="form-group">
          <label htmlFor="expense-name" className="form-label">
            Expense Name
          </label>
          <input
            id="expense-name"
            type="text"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="e.g. Team Lunch, Flight Ticket"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
            }}
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="expense-amount" className="form-label">
            Amount (₹)
          </label>
          <input
            id="expense-amount"
            type="number"
            className={`form-input ${errors.amount ? 'input-error' : ''}`}
            placeholder="e.g. 1500"
            value={amount}
            min="0"
            onChange={(e) => {
              setAmount(e.target.value)
              if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }))
            }}
          />
          {errors.amount && <p className="error-msg">{errors.amount}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="expense-category" className="form-label">
            Category
          </label>
          <select
            id="expense-category"
            className={`form-input form-select ${errors.category ? 'input-error' : ''}`}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }))
            }}
          >
            <option value="">— Select a category —</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_ICONS[cat]} {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="error-msg">{errors.category}</p>}
        </div>

        <button type="submit" className="btn-submit">
          Add Expense
        </button>
      </form>
    </section>
  )
}

export default ExpenseForm