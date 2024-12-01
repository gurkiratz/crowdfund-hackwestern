export default function TransactionPage({ params }: { params: { hash: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
        <p className="mb-4">
          <span className="font-semibold">Transaction Hash:</span> {params.hash}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Status:</span> <span className="text-green-600">Confirmed</span>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Block:</span> 12345678
        </p>
        <p className="mb-4">
          <span className="font-semibold">From:</span> 0x1234...5678
        </p>
        <p className="mb-4">
          <span className="font-semibold">To:</span> 0x8765...4321
        </p>
        <p className="mb-4">
          <span className="font-semibold">Value:</span> 1.5 ETH
        </p>
        <a
          href={`https://starkscan.io/tx/${params.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Starkscan
        </a>
      </div>
    </div>
  )
}

