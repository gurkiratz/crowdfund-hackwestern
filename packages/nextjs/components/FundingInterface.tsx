'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function FundingInterface({ campaignId }: { campaignId: string }) {
  const [amount, setAmount] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for actual funding logic
    console.log(`Funding campaign ${campaignId} with ${amount} ETH`)
    // Simulate a transaction hash
    const transactionHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    router.push(`/transaction/${transactionHash}`)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fund this campaign</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount (ETH)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Fund Campaign
      </button>
    </form>
  )
}

