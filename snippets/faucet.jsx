export const Faucet = () => {
  const [accountId, setAccountId] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch('http://localhost:3010/api/faucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Request failed')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong')
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <div className="not-prose rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">NEAR Testnet Faucet</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 ml-3">Get free NEAR tokens for testing</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="accountId"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Testnet Account ID
          </label>
          <input
            id="accountId"
            name="accountId"
            type="text"
            required
            value={accountId}
            onChange={(e) => {
              setAccountId(e.target.value)
              if (isError) setStatus('idle')
            }}
            placeholder="account.testnet | 0x123... | implicit address"
            style={{ fontSize: '14px' }}
            className={[
              'w-full px-3.5 py-2.5 rounded-xl border text-sm',
              'bg-white dark:bg-zinc-800',
              'text-zinc-900 dark:text-zinc-100',
              'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
              'focus:outline-none focus:ring-2 transition-colors',
              isError
                ? 'border-red-400 dark:border-red-500 focus:ring-red-400/20 dark:focus:ring-red-500/20'
                : isSuccess
                  ? 'border-green-400 dark:border-green-500 focus:ring-green-400/20 dark:focus:ring-green-500/20'
                  : 'border-zinc-200 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-blue-400/20 dark:focus:ring-blue-500/20',
            ].join(' ')}
          />

          {isError && (
            <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Account successfully funded!
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          style={{
            backgroundColor: isLoading || isSuccess ? undefined : '#3b82f6',
            color: isLoading || isSuccess ? undefined : '#ffffff',
          }}
          className={[
            'w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-150',
            isLoading || isSuccess
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
              : 'hover:opacity-90 active:scale-[0.99] shadow-sm',
          ].join(' ')}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Requesting…
            </span>
          ) : isSuccess ? (
            <span className="flex items-center justify-center gap-2">
              Funded!
            </span>
          ) : (
            'Request Tokens'
          )}
        </button>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center pt-1">
          Not working?{' '}
          <a
            href="https://t.me/neardev"
            className="text-zinc-500 dark:text-zinc-400 underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            Report on Telegram
          </a>
        </p>
      </form>
    </div>
  )
}
