import { useRouter } from "next/router";
import React from "react";
import { Briefcase, MapPin, DollarSign, Calendar, Users } from "lucide-react";

const JobDetails = ({ job }) => {
  const router = useRouter();
  const storedJob = sessionStorage.getItem("selectedJob");
  const jobData = JSON.parse(storedJob);
  console.log("Job ID:", jobData._id);

  const handleApplyClick = () => {
    router.push({
      pathname: `/dashboard/${encodeURIComponent(job.title)}/apply`,
      query: { id: job._id, title: job.title },
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Job Image */}
      <div className="relative w-full h-60 md:h-72 mb-6 overflow-hidden rounded-lg">
        <img src={job.img} alt={job.title} className="w-full h-full object-cover" />
      </div>

      {/* Job Title & Company */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
      <p className="text-lg font-medium text-gray-700">{job.company}</p>

      {/* Job Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-gray-600">
        <p className="flex items-center gap-2">
          <Briefcase size={18} /> {job.sector}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={18} /> {job.location}
        </p>
        <p className="flex items-center gap-2">
          <DollarSign size={18} /> {job.salary}
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={18} /> Deadline: {new Date(job.deadline).toLocaleDateString()}
        </p>
        <p className="flex items-center gap-2">
          <Users size={18} /> Applicants Needed: {job.requiredApplicants}
        </p>
      </div>

      {/* Job Description */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Job Description</h3>
        <p className="text-gray-700 mt-2">{job.description}</p>
      </div>

      {/* Requirements */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Requirements</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleApplyClick}
          className="w-full md:w-auto bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
