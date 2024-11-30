import Link from 'next/link'
import { CampaignCard } from '../components/CampaignCard'
import { db } from '../lib/db'
import { campaigns } from '../lib/db/schema'

export default async function Home() {
  const allCampaigns = [
    {
      id: 1,
      title: 'Campaign 1',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Description for campaign 1',
      goal: 1000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user1',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Campaign 2',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Description for campaign 2',
      goal: 2000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user2',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Campaign 3',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Description for campaign 3',
      goal: 3000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user3',
      createdAt: new Date(),
    },
    {
      id: 4,
      title: 'Campaign 4',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Description for campaign 4',
      goal: 4000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user4',
      createdAt: new Date(),
    },
    {
      id: 5,
      title: 'Campaign 5',
      imageUrl: 'https://via.placeholder.com/800x400',
      description: 'Description for campaign 5',
      goal: 5000,
      deadline: new Date('2023-12-31'),
      creatorId: 'user5',
      createdAt: new Date(),
    },
  ]
  // const allCampaigns = await db.select().from(campaigns).limit(10)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Featured Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/create-campaign"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create a Campaign
        </Link>
      </div>
    </div>
  )
}
