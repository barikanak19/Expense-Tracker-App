function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="header-icon">₹</span>
        </div>
        <div className="header-text">
          <h1 className="header-title">Expense Tracker</h1>
          <p className="header-subtitle">Track. Analyse. Save.</p>
        </div>
      </div>
      <div className="header-glow" />
    </header>
  )
}

export default Header