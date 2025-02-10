import { useState } from "react";
import { useRouter } from "next/router";

export default function Questionnaire() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    experience: "",
    industry: "",
    certifications: "",
    workedBefore: "",
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.experience === "Skilled") {
      router.push("/upload-documents");
    } else {
      router.push("/unskilled-options");
    }
  };

  return (
    <form className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Questionnaire</h2>

      <label className="block">Do you have prior work experience?</label>
      <select name="experience" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Skilled">Yes</option>
        <option value="Unskilled">No</option>
      </select>

      <label className="block mt-4">Which industry are you applying for?</label>
      <select name="industry" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Mining">Mining</option>
        <option value="Tourism">Tourism</option>
        <option value="Manufacturing">Manufacturing</option>
      </select>

      <label className="block mt-4">Do you have certifications?</label>
      <select name="certifications" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label className="block mt-4">Have you worked before?</label>
      <select name="workedBefore" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full" type="submit">
        Next
      </button>
    </form>
  );
}
