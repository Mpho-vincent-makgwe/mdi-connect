import { useEffect, useState } from "react";
import Link from "next/link";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p>Sector: {job.sector}</p>
          <p>Required Applicants: {job.requiredApplicants}</p>
          <Link href={`/apply?id=${job._id}`}>
            <i className="block mt-2 text-blue-500">Apply Now</i>
          </Link>
        </div>
      ))}
    </div>
  );
}
