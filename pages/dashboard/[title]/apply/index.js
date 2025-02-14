import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../../context/AuthContext";
import { useRouter } from "next/router";

export default function Apply() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState({});

  const userId = user._id;

  // Retrieving job ID and title from the URL
  const { jobId, title } = router.query;

  useEffect(() => {
    if (jobId && title) {
      setJob({ id: jobId, title });
    }
  }, [jobId, title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobId", job.id); // Using jobId from query
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("linkedin", linkedin);
    formData.append("coverLetter", coverLetter);
    if (resume) formData.append("resume", resume);

    await fetch(`/api/jobs/${job.id}/apply`, {
      method: "POST",
      body: formData,
    });

    alert("Application submitted!");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Application Form</h2>
        <p className="text-lg mb-4">
          <strong>Applying for: </strong>{job.title}
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
