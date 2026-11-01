export const Faucet = () => {
  const [accountId, setAccountId] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const beneficiary = accountId.trim()
      if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(beneficiary) || beneficiary.length < 2 || beneficiary.length > 64) {
        throw new Error('Please provide a valid account ID')
      }

      const concat = (...parts) => new Uint8Array(parts.flatMap((part) => Array.from(part)))
      // Borsh integers are little-endian; strings have a u32 byte-length prefix.
      const integer = (value, size) => {
        let remaining = BigInt(value)
        return Uint8Array.from({ length: size }, () => {
          const byte = Number(remaining & BigInt(255))
          remaining >>= BigInt(8)
          return byte
        })
      }
      const string = (value) => {
        const bytes = new TextEncoder().encode(value)
        return concat(integer(bytes.length, 4), bytes)
      }
      const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      const base58Encode = (bytes) => {
        let value = BigInt(0)
        for (const byte of bytes) value = value * BigInt(256) + BigInt(byte)
        let encoded = ''
        while (value > BigInt(0)) {
          encoded = alphabet[Number(value % BigInt(58))] + encoded
          value /= BigInt(58)
        }
        for (const byte of bytes) {
          if (byte !== 0) break
          encoded = '1' + encoded
        }
        return encoded
      }
      const base58Decode = (encoded) => {
        let value = BigInt(0)
        for (const char of encoded) {
          const digit = alphabet.indexOf(char)
          if (digit < 0) throw new Error('Invalid base58 block hash')
          value = value * BigInt(58) + BigInt(digit)
        }
        const bytes = []
        while (value > BigInt(0)) {
          bytes.unshift(Number(value & BigInt(255)))
          value >>= BigInt(8)
        }
        for (const char of encoded) {
          if (char !== '1') break
          bytes.unshift(0)
        }
        return new Uint8Array(bytes)
      }
      const rpc = async (method, params) => {
        const response = await fetch('https://rpc.testnet.near.org', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 'faucet', method, params }),
        })
        if (!response.ok) throw new Error(`RPC request failed (${response.status})`)
        const data = await response.json()
        if (data.error) throw new Error(data.error.data || data.error.message || 'RPC request failed')
        return data.result
      }

      const keyPair = await crypto.subtle.generateKey('Ed25519', false, ['sign', 'verify'])
      const publicKey = new Uint8Array(await crypto.subtle.exportKey('raw', keyPair.publicKey))
      const publicKeyStr = `ed25519:${base58Encode(publicKey)}`
      const randomId = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')
      const tmpAccount = `docs-${randomId}.testnet`

      const response = await fetch('https://helper.testnet.near.org/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newAccountId: tmpAccount, newAccountPublicKey: publicKeyStr }),
      })
      if (!response.ok) {
        throw new Error(`Account creation failed (${response.status}): ${await response.text()}`)
      }

      const sendAction = async (receiverId, action) => {
        const accessKey = await rpc('query', {
          request_type: 'view_access_key',
          finality: 'optimistic',
          account_id: tmpAccount,
          public_key: publicKeyStr,
        })
        // Transaction V0: signer, Ed25519 key, nonce, receiver, block hash, actions.
        const transaction = concat(
          string(tmpAccount), new Uint8Array([0]), publicKey,
          integer(BigInt(accessKey.nonce) + BigInt(1), 8), string(receiverId),
          base58Decode(accessKey.block_hash), integer(1, 4), action,
        )
        const hash = await crypto.subtle.digest('SHA-256', transaction)
        const signature = new Uint8Array(await crypto.subtle.sign('Ed25519', keyPair.privateKey, hash))
        const signedTransaction = concat(transaction, new Uint8Array([0]), signature)
        const result = await rpc('send_tx', {
          signed_tx_base64: btoa(String.fromCharCode(...signedTransaction)),
          wait_until: 'EXECUTED_OPTIMISTIC',
        })
        if (!result.status || result.status.SuccessValue === undefined) {
          throw new Error(`Transaction failed: ${JSON.stringify(result.status)}`)
        }
      }

      // Action tags: Transfer = 3 (u128 yoctoNEAR), DeleteAccount = 7 (beneficiary).
      await sendAction(beneficiary, concat(new Uint8Array([3]), integer('5000000000000000000000000', 16)))
      setStatus('success')

      // Cleanup runs in the background after funding succeeds.
      sendAction(tmpAccount, concat(new Uint8Array([7]), string('v2d.faucet.nonofficial.testnet')))
        .catch((error) => console.warn('Temporary faucet account cleanup failed:', error))
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
