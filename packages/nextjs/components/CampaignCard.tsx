import Link from 'next/link'
import Image from 'next/image'
import { campaigns } from '../lib/db/schema'

interface CampaignCardProps {
  campaign: typeof campaigns.$inferSelect
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = Math.min(100, (campaign.goal / 100000) * 100) // Placeholder progress calculation

  return (
    <Link href={`/campaign/${campaign.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <Image src={campaign.imageUrl} alt={campaign.title} width={400} height={200} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {campaign.goal.toLocaleString()} ETH goal
          </p>
        </div>
      </div>
    </Link>
  )
}

