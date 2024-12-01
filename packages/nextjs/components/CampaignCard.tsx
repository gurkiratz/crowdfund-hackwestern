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
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <Image 
            src={campaign.imageUrl} 
            alt={campaign.title} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
          <p className="text-gray-600 mb-4 h-12 overflow-hidden">{campaign.description}</p>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{progress}% Funded</span>
              <span>{campaign.goal.toLocaleString()} ETH Goal</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {new Date(campaign.deadline).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

