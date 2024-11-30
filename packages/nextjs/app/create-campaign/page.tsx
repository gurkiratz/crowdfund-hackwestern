'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import { useAuth } from '@clerk/nextjs'
import { useAccount, useNetwork } from '@starknet-react/core'

export default function CreateCampaign() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [goal, setGoal] = useState('')
  const [deadline, setDeadline] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const { userId } = useAuth()

  const { account, status, address: accountAddress } = useAccount()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // setIsLoading(true)
    setError(null)
    // Placeholder for actual campaign creation logic
    
    // Simulate campaign creation and redirect
    router.push('/')

    if (status === 'connected' && accountAddress) {
      console.log('Creating campaign:', {
        title,
        imageUrl,
        description,
        goal,
        deadline,
        creatorId: accountAddress
      })
      const campaignData = {
        title,
        imageUrl,
        description,
        goal,
        deadline,
        creatorId: accountAddress, // Use StarkNet wallet address as creatorId
      }

      // Insert into the database
      try {
        const response = await fetch('/api/campaigns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campaignData),
        })

        if (!response.ok) {
          throw new Error('Failed to create campaign')
        }

        const data = await response.json()
        console.log('Campaign created successfully!', data)
        router.push('/')
      } catch (error) {
        console.error('Error creating campaign:', error)
        setError('Failed to create campaign. Please try again.')
      } finally {
        setIsLoading(false)
      }
    } else {
      alert('Error: Wallet not connected')
      console.error('Wallet not connected')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="goal"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Goal (ETH)
          </label>
          <input
            type="number"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="deadline"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  )
}
