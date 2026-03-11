const CATEGORY_COLORS = {
  Food: '#ff9f43',
  Travel: '#54a0ff',
  Marketing: '#ff6b9d',
  Utilities: '#00d4aa',
  Other: '#a29bfe',
}

function SummaryPanel({ expenses, total }) {
  // Build category-wise breakdown
  const breakdown = expenses.reduce((acc, exp) => {
    const cat = exp.category
    if (!acc[cat]) acc[cat] = 0
    acc[cat] += Number(exp.amount)
    return acc
  }, {})

  const categories = Object.entries(breakdown).sort((a, b) => b[1] - a[1])

  return (
    <section className="card summary-card">
      <h2 className="card-title">
        <span className="card-title-icon">📊</span> Summary
      </h2>

      {/* Total */}
      <div className="summary-total">
        <p className="summary-total-label">Total Expenses</p>
        <p className="summary-total-amount">
          ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
        <p className="summary-total-count">
          {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>

      {/* Category Breakdown */}
      {categories.length > 0 ? (
        <div className="summary-breakdown">
          <p className="breakdown-heading">Category Breakdown</p>

          {categories.map(([cat, amt]) => {
            const percent = total > 0 ? ((amt / total) * 100).toFixed(1) : 0
            const color = CATEGORY_COLORS[cat] || '#a29bfe'
            return (
              <div key={cat} className="breakdown-item">
                <div className="breakdown-label-row">
                  <span className="breakdown-cat" style={{ color }}>
                    {cat}
                  </span>
                  <span className="breakdown-amt">
                    ₹{amt.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${percent}%`,
                      background: color,
                    }}
                  />
                </div>

                <p className="breakdown-percent">{percent}%</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="summary-empty">
          <p>Add expenses to see category breakdown.</p>
        </div>
      )}
    </section>
  )
}

export default SummaryPanel