import React from 'react'
import Link from "next/link";

const JobList = ({jobs}) => {
  return (
    <div>
      {jobs.length === 0 ? (
          <p>Currently, there are no available jobs for this sector.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="border p-4 mb-4 rounded shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>Sector: {job.sector}</p>
              <p>Required Applicants: {job.requiredApplicants}</p>
              <Link href={`/dashboard/${encodeURIComponent(job.title)}`} className="block mt-2 text-blue-500">
            View Details
          </Link>
            </div>
          ))
        )}
    </div>
  )
}

export default JobList
