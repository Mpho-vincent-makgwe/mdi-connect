import React from "react";
import { useRouter } from "next/router";

const JobList = ({ jobs }) => {
  const router = useRouter();

  const handleViewDetails = (job) => {
    router.push(
      {
        pathname: `/dashboard/${encodeURIComponent(job.title)}`,
        query: { title: job.title }, // Only pass title in URL
      },
      `/dashboard/${encodeURIComponent(job.title)}` // Hide query params from URL
    );
    sessionStorage.setItem("selectedJob", JSON.stringify(job)); // Store job details temporarily
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">Currently, there are no available jobs for this sector.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mt-1"><strong>Sector:</strong> {job.sector}</p>
              <p className="text-gray-600"><strong>Required Applicants:</strong> {job.requiredApplicants}</p>
              <button
                onClick={() => handleViewDetails(job)}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
