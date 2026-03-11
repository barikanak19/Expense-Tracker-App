function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          Built by <span className="footer-name">Kanak Bari</span>
        </p>
        <p className="footer-copy">© {year} Expense Tracker. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer