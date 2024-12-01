'use server'

import { Address } from '@starknet-react/chains'
import { db } from '../../lib/db'
import { campaigns, contributions } from '../../lib/db/schema'
import { eq } from 'drizzle-orm'

export async function getUserCampaigns(accountAddress: Address) {
  try {
    const userCampaigns = await db.select().from(campaigns).where(eq(campaigns.creatorId, accountAddress))
    return userCampaigns
  } catch (error) {
    console.error('Error fetching user campaigns:', error)
    return []
  }
}

export async function getUserContributions(accountAddress: Address) {
  try {
    const userContributions = await db.select().from(contributions).where(eq(contributions.contributorId, accountAddress))
    return userContributions
  } catch (error) {
    console.error('Error fetching user contributions:', error)
    return []
  }
}
