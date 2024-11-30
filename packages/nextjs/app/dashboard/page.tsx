// import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '../../lib/db'
import { campaigns, contributions } from '../../lib/db/schema'
import { eq } from 'drizzle-orm'
import { CampaignCard } from '../../components/CampaignCard'

export default async function Dashboard() {
  // const { userId } = auth()
  
  // if (!userId) {
  //   redirect('/sign-in')
  // }

  const userCampaigns = [
    {
      id: 1,
      title: 'Campaign 1',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Description for campaign 1',
      goal: 1000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user1',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Campaign 2',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Description for campaign 2',
      goal: 2000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user1',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Campaign 3',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Description for campaign 3',
      goal: 3000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user1',
      createdAt: new Date(),
    },
  ]

  const userContributions = [
    {
      id: 1,
      campaignId: 1,
      contributorId: 'user1',
      amount: 100,
      transactionHash: '0x1234567890abcdef',
      createdAt: new Date(),
    },
    {
      id: 2,
      campaignId: 2,
      contributorId: 'user1',
      amount: 200,
      transactionHash: '0xabcdef1234567890',
      createdAt: new Date(),
    },
    {
      id: 3,
      campaignId: 3,
      contributorId: 'user1',
      amount: 300,
      transactionHash: '0x7890abcdef123456',
      createdAt: new Date(),
    },
  ]

  // const userCampaigns = await db.select().from(campaigns).where(eq(campaigns.creatorId, userId))
  // const userContributions = await db.select().from(contributions).where(eq(contributions.contributorId, userId))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Contributions</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {userContributions.map((contribution) => (
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
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

