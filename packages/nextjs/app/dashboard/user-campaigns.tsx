'use client'

import { useQuery } from "@tanstack/react-query"
import { getUserCampaigns, getUserContributions } from "~~/lib/actions/campaignActions"
import { useAccount, useNetwork } from '@starknet-react/core'
import { CampaignCard } from "~~/components/CampaignCard"

export default function UserCampaigns() {
    const { account, status, address: accountAddress } = useAccount()
  const {data: userCampaigns} = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => accountAddress ? getUserCampaigns(accountAddress) : Promise.resolve([]),
    enabled: !!accountAddress,
  })

  const {data: userContributions} = useQuery({
    queryKey: ['contributions'],
    queryFn: () => accountAddress ? getUserContributions(accountAddress) : Promise.resolve([]),
    enabled: !!accountAddress,
  })

  if (status !== 'connected' && !accountAddress) {
    return <div className="container mx-auto px-4 py-8">Please connect your wallet to view your campaigns and contributions.</div>
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCampaigns?.length ? userCampaigns?.map((campaign: any) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          )) : <div>No campaigns found!</div>}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Contributions</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {userContributions?.length ? userContributions?.map((contribution) => (
              <li key={contribution.id}>
                <a href={`/transaction/${contribution.transactionHash}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        Campaign ID: {contribution.campaignId}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {contribution.amount} ETH
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Transaction: {contribution.transactionHash.slice(0, 10)}...
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(contribution.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )) : <div>No Contributions made!</div>}
          </ul>
        </div>
      </section>
    </div>
  )
}