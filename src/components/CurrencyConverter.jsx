import { useState, useEffect } from 'react'

const CURRENCIES = [
  { code: 'INR', label: 'INR — Indian Rupee', symbol: '₹' },
  { code: 'USD', label: 'USD — US Dollar', symbol: '$' },
  { code: 'EUR', label: 'EUR — Euro', symbol: '€' },
  { code: 'GBP', label: 'GBP — British Pound', symbol: '£' },
]

function CurrencyConverter({ totalINR }) {
  const [targetCurrency, setTargetCurrency] = useState('USD')
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  // Fetch exchange rates whenever targetCurrency changes
  useEffect(() => {
    // INR to INR — no API call needed
    if (targetCurrency === 'INR') {
      setRates({ INR: 1 })
      setError(null)
      return
    }

    const fetchRates = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=INR&to=${targetCurrency}`
        )
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()

        if (!data.rates) throw new Error('Invalid API response.')

        setRates(data.rates)
        setLastFetched(new Date().toLocaleTimeString())
      } catch (err) {
        setError(
          err.message.includes('Failed to fetch')
            ? 'Network error. Please check your internet connection.'
            : `Error: ${err.message}`
        )
        setRates({})
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [targetCurrency])

  // Compute converted amount
  const rate = rates[targetCurrency] ?? 1
  const convertedAmount = (totalINR * rate).toFixed(2)
  const currencyInfo = CURRENCIES.find((c) => c.code === targetCurrency)

  return (
    <section className="card converter-card">
      <h2 className="card-title">
        <span className="card-title-icon">💱</span> Currency Converter
      </h2>

      {/* Dropdown */}
      <div className="form-group">
        <label htmlFor="currency-select" className="form-label">
          Convert total to
        </label>
        <select
          id="currency-select"
          className="form-input form-select"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          {CURRENCIES.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.label}
            </option>
          ))}
        </select>
      </div>

      {/* Result Box */}
      <div className="converter-result">
        {loading ? (
          <div className="converter-loading">
            <div className="spinner" />
            <p>Fetching live rates…</p>
          </div>
        ) : error ? (
          <div className="converter-error">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button
              className="btn-retry"
              onClick={() => setTargetCurrency((c) => c)}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <p className="converter-from">
              ₹{totalINR.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR
            </p>
            <div className="converter-arrow">↓</div>
            <p className="converter-to">
              {currencyInfo?.symbol}
              {Number(convertedAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              {targetCurrency}
            </p>
            {targetCurrency !== 'INR' && rate !== 1 && (
              <p className="converter-rate">
                1 INR = {rate.toFixed(6)} {targetCurrency}
              </p>
            )}
            {lastFetched && targetCurrency !== 'INR' && (
              <p className="converter-time">Updated at {lastFetched}</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default CurrencyConverter