'use client'
import { useAccount } from '@starknet-react/core'
import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract'
import { useScaffoldWriteContract } from '~~/hooks/scaffold-stark/useScaffoldWriteContract'

export default function CounterApp() {
  const { account: connectedAddress, status } = useAccount()

  const { data: counter, isLoading: isCounterLoading } =
    useScaffoldReadContract({
      contractName: 'Counter',
      functionName: 'get_current_count',
    })

  const { sendAsync: increment, isPending: incrementPending } =
    useScaffoldWriteContract({
      contractName: 'Counter',
      functionName: 'increment',
    })

  const { sendAsync: decrement, isPending: decrementPending } = useScaffoldWriteContract({
    contractName: 'Counter',
    functionName: 'decrement',
  })

  const handleIncrement = async () => {
    await increment()
  }
  const handleDecrement = async () => {
    await decrement()
  }

  if (status !== 'connected' && !connectedAddress) {
    return (
      <div>
        <h2>Counter App</h2>
        <p>Please connect your wallet to view the counter.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Counter App</h2>
      <h2 className="font-bold m-0">Total count:</h2>
      {isCounterLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p className="m-0">{counter ? counter.toString() : 0}</p>
      )}

      <button
        className="btn btn-primary"
        onClick={handleIncrement}
        disabled={incrementPending}
      >
        {incrementPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          'Increment Count'
        )}
      </button>
      <button
        className="btn btn-primary"
        onClick={handleDecrement}
        disabled={decrementPending}
      >
        {decrementPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          'Decrement Count'
        )}
      </button>
    </div>
  )
}
