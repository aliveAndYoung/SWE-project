import { useParams, Link } from 'react-router-dom';

export default function FlightDetails() {
  const { id } = useParams();
  // In a real app, fetch flight details by id
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black/80 text-white">
      <div className="bg-white/10 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold mb-2">Flight Details</h2>
        <p className="text-lg">Flight ID: <span className="font-mono">{id}</span></p>
        <p className="text-zinc-300">(Here you can show more details about the selected flight, such as airline, duration, price, etc.)</p>
        <Link to="/" className="mt-4 text-blue-400 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 