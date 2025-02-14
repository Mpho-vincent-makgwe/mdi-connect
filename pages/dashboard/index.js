import JobList from "../../components/JobList/JobList";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]); // Make sure jobs is initialized as an empty array

  useEffect(() => {
    if (!user) return;

    if (!user._id) {
      console.log("User not available, skipping request");
      return;
    } else {
      console.log(`User available, fetching jobs for ${user._id} Id`);
    }

    fetch(`/api/jobs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user._id}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setJobs(data); // Ensure jobs is set as an array
        } else {
          setJobs([]); // In case data is not an array
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Handle error and ensure jobs is still an array
      });
  }, [user]);

  if (!user) {
    return <p>Please log in</p>;
  }
  if(!jobs){
    return
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
        <JobList jobs={jobs} />
      </div>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
