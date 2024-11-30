import { notFound } from 'next/navigation'
import Image from 'next/image'
import { db } from '../../../lib/db'
import { campaigns } from '../../../lib/db/schema'
import { FundingInterface } from '../../../components/FundingInterface'
import { eq } from 'drizzle-orm'

export default async function CampaignPage({ params }: { params: { id: string } }) {
  
  // const sampleCampaigns = [
  //   {
  //     id: 1,
  //     title: 'Campaign 1',
  //     imageUrl: 'https://via.placeholder.com/800x400',
  //     description: 'Description for campaign 1',
  //     goal: 1000,
  //     deadline: new Date('2023-12-31'),
  //   },
  //   {
  //     id: 2,
  //     title: 'Campaign 2',
  //     imageUrl: 'https://via.placeholder.com/800x400',
  //     description: 'Description for campaign 2',
  //     goal: 2000,
  //     deadline: new Date('2023-12-31'),
  //   },
  //   {
  //     id: 3,
  //     title: 'Campaign 3',
  //     imageUrl: 'https://via.placeholder.com/800x400',
  //     description: 'Description for campaign 3',
  //     goal: 3000,
  //     deadline: new Date('2023-12-31'),
  //   },
  // ]

  // const campaign = sampleCampaigns.find(c => c.id === parseInt(params.id))
  
  // if (!campaign) {
  //   notFound()
  // }


  const campaign = await db.select()
  .from(campaigns)
  .where(eq(campaigns.id, parseInt(params.id)))
  .limit(1);

  if (!campaign.length) {
    notFound()
  }

  const { title, imageUrl, description, goal, deadline } = campaign[0]
  // const { title, imageUrl, description, goal, deadline } = campaign

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Image src={imageUrl} alt={title} width={800} height={400} className="w-full h-64 object-cover rounded-lg mb-8" />
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <p className="text-xl font-semibold mb-2">Goal: {goal.toLocaleString()} ETH</p>
          <p className="text-gray-600 mb-4">Deadline: {new Date(deadline).toLocaleDateString()}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
          <p className="text-sm text-gray-500">50% funded</p>
        </div>
        <FundingInterface campaignId={params.id} />
      </div>
    </div>
  )
}

