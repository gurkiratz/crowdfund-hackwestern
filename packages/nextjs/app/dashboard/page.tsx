import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import UserCampaigns from './user-campaigns'
export default async function Dashboard() {
  return (
    <HydrationBoundary>
      <UserCampaigns />
    </HydrationBoundary>
  )
}
