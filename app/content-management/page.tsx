export default function ContentManagement() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
            Content Management
          </h1>
  
          {/* Content List */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700">No content yet. Start creating!</p>
          </div>
  
          {/* Create Content Button */}
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700">
              + Create New Content
            </button>
          </div>
        </div>
      </div>
    );
  }
  