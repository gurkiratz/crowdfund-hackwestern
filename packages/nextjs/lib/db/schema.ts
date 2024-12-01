import { Address } from '@starknet-react/chains';
import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
  goal: integer('goal').notNull(),
  deadline: timestamp('deadline').notNull(),
  creatorId: varchar('creator_id', { length: 66 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const contributions = pgTable('contributions', {
  id: serial('id').primaryKey(),
  campaignId: integer('campaign_id').references(() => campaigns.id).notNull(),
  contributorId: varchar('contributor_id', { length: 66 }).notNull(),
  amount: integer('amount').notNull(),
  transactionHash: varchar('transaction_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Campaign = {
  id: number;
  title: string;
  imageUrl: string; 
  description: string;
  goal: number;
  deadline: Date;
  creatorId: Address;
  createdAt: Date;
}

export type Contribution = {
  id: number;
  campaignId: number;
  contributorId: Address;
  amount: number;
  transactionHash: string;
  createdAt: Date;
}