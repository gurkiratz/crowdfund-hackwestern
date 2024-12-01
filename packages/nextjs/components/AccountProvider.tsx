'use client'

import { useAccount } from '@starknet-react/core'
import { ReactNode } from 'react'
import { AccountInterface } from 'starknet'

interface AccountProviderProps {
  children: ReactNode
  onAccountData: (data: { account: AccountInterface | undefined, status: string, address: string | undefined }) => void
}

export function AccountProvider({ children, onAccountData }: AccountProviderProps) {
  const { account, status, address } = useAccount()

  // Call the callback function with the account data
  onAccountData({ account, status, address })

  return <>{children}</>
}

