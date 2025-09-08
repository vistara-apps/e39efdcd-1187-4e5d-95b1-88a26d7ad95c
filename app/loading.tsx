export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      <div className="text-center">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-white bg-opacity-20 rounded w-32 mx-auto"></div>
          <div className="h-3 bg-white bg-opacity-20 rounded w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
