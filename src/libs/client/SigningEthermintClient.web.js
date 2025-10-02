// Minimal web stub to avoid TS compile issues on Vercel
export async function getSigningClient() {
  throw new Error('Ethermint ledger signing is not available in this build')
}

export default { getSigningClient }

