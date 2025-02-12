export default function CreatorDashboard() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Creator Dashboard</h1>
          
          {/* Earnings & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold">Total Earnings</h2>
              <p className="text-3xl font-bold mt-2">$2,540</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold">Total Supporters</h2>
              <p className="text-3xl font-bold mt-2">128</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold">New Subscribers</h2>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
          </div>
  
          {/* Recent Posts Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Your Recent Posts</h2>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-700">No posts yet. Start creating content!</p>
            </div>
          </div>
  
          {/* Create Post Button */}
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700">
              + Create New Post
            </button>
          </div>
        </div>
      </div>
    );
  }
  