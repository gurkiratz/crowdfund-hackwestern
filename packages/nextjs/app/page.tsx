import Link from 'next/link'
import Image from 'next/image'
import { CampaignCard } from '../components/CampaignCard'
import { HeroSection } from '../components/HeroSection'
import { FeatureSection } from '../components/FeatureSection'
import { CTASection } from '../components/CTASection'
import { db } from '../lib/db'
import { campaigns } from '../lib/db/schema'

export default async function Home() {
  const allCampaigns = await db.select().from(campaigns).limit(6)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      
      <section id='campaigns' className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8 text-center">
            Featured Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/campaigns"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>
      <FeatureSection />
      <CTASection />
    </div>
  )
}

