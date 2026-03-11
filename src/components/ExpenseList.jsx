const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Marketing: '📢',
  Utilities: '⚡',
  Other: '📦',
}

const CATEGORY_COLORS = {
  Food: '#ff9f43',
  Travel: '#54a0ff',
  Marketing: '#ff6b9d',
  Utilities: '#00d4aa',
  Other: '#a29bfe',
}

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <section className="card expense-list-card">
        <h2 className="card-title">
          <span className="card-title-icon">📋</span> Expenses
        </h2>
        <div className="empty-state">
          <div className="empty-icon">🧾</div>
          <p className="empty-text">No expenses yet.</p>
          <p className="empty-subtext">Add your first expense using the form above!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="card expense-list-card">
      <h2 className="card-title">
        <span className="card-title-icon">📋</span> Expenses
        <span className="expense-count">{expenses.length}</span>
      </h2>

      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            {/* Category color bar */}
            <div
              className="expense-color-bar"
              style={{ background: CATEGORY_COLORS[expense.category] || '#a29bfe' }}
            />

            {/* Icon */}
            <div
              className="expense-icon"
              style={{ background: `${CATEGORY_COLORS[expense.category]}22` }}
            >
              <span>{CATEGORY_ICONS[expense.category] || '📦'}</span>
            </div>

            {/* Info */}
            <div className="expense-info">
              <p className="expense-name">{expense.name}</p>
              <div className="expense-meta">
                <span
                  className="expense-category-badge"
                  style={{
                    background: `${CATEGORY_COLORS[expense.category]}22`,
                    color: CATEGORY_COLORS[expense.category],
                  }}
                >
                  {expense.category}
                </span>
                {expense.date && (
                  <span className="expense-date">{expense.date}</span>
                )}
              </div>
            </div>

            {/* Amount */}
            <div className="expense-amount">
              ₹{Number(expense.amount).toLocaleString('en-IN')}
            </div>

            {/* Delete */}
            <button
              className="btn-delete"
              onClick={() => onDeleteExpense(expense.id)}
              aria-label={`Delete ${expense.name}`}
              title="Delete expense"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList