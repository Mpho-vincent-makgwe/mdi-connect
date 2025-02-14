import { useRouter } from "next/router";
import React from "react";

const JobDetails = ({ job }) => {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push({
      pathname: `/dashboard/jobs/${encodeURIComponent(job.title)}/apply`,
      query: { id: job.id, title: job.title },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <img src={job.img} alt={job.title} className="w-full mb-4 rounded" />
      <p className="font-semibold text-lg">{job.company}</p>
      <p>Sector: {job.sector}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p className="font-semibold">Description:</p>
      <p>{job.description}</p>
      <p className="font-semibold">Requirements:</p>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>- {req}</li>
        ))}
      </ul>
      <p>Status: {job.status}</p>
      <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      <p>Required Applicants: {job.requiredApplicants}</p>

      {/* Apply Button */}
      <div className="mt-4">
        <button
          onClick={handleApplyClick}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
