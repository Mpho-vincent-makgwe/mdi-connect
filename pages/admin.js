export default function AdminDashboard() {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold">Post a Job</h2>
        <input type="text" placeholder="Job Title" className="block mt-4 p-2 border" />
        <select className="block mt-4 p-2 border">
          <option>Mining</option>
          <option>Tourism</option>
          <option>Manufacturing</option>
        </select>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Post Job</button>
      </div>
    );
  }
  