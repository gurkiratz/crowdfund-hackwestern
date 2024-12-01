import { LightBulbIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { LightningBoltIcon } from '@radix-ui/react-icons'
const features = [
  {
    name: 'Lightning Fast',
    description: 'Experience near-instant transactions and low fees with StarkNets Layer 2 scaling solution.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Secure & Transparent',
    description: 'Benefit from the security of Ethereum with the transparency of on-chain transactions.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Lower Fees',
    description: "Save on gas fees with StarkNets efficient proof system, making micro-donations viable.",
    icon: CurrencyDollarIcon,
  },
]

export function FeatureSection() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Future of Crowdfunding
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform leverages StarkNet to provide a seamless, secure, and efficient crowdfunding experience.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

