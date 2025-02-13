import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

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
        'Authorization': `Bearer ${user._id}`
      }
    })
      .then((res) => {
        console.log("Response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      });
  }, [user]);

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
        {jobs.length === 0 ? (
          <p>Currently, there are no available jobs for this sector.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="border p-4 mb-4 rounded shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>Sector: {job.sector}</p>
              <p>Required Applicants: {job.requiredApplicants}</p>
              <Link href={`/apply?_id=${job._id}`} className="block mt-2 text-blue-500">
                Apply Now
              </Link>
            </div>
          ))
        )}
      </div>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}