import React from "react";
import { useRouter } from "next/router";

const JobList = ({ jobs }) => {
  const router = useRouter();

  const handleViewDetails = (job) => {
    router.push(
      {
        pathname: `/dashboard/${encodeURIComponent(job.title)}`,
        query: { title: job.title, _id: job._id}, // Only pass title in URL
      },
      `/dashboard/${encodeURIComponent(job.title)}` // Hide query params from URL
    );
    sessionStorage.setItem("selectedJob", JSON.stringify(job)); // Store job details temporarily
  };

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
            <button
              onClick={() => handleViewDetails(job)}
              className="block mt-2 text-blue-500"
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
