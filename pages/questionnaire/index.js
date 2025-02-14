import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext"; // Import AuthContext

const Questionnaire = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext); // Get logged-in user
  const [answers, setAnswers] = useState({
    experience: "",
    qualifications: "",
    yearsOfExperience: "",
    graduated: "",
    currentlyInTertiary: "",
    entryLevel: "",
    sector: "",
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("User Data:", user); // Debugging user data
  
    if (!user || !user._id) {
      console.error("User not logged in or missing _id:", user);
      return;
    }
  
    const data = {
      userId: user._id,
      answers,
    };
  
    try {
      console.log("Sending Data:", data);
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Server Response:", result);
  
      if (response.ok) {
        router.push(answers.experience === "Yes" ? "/upload-documents" : "/unskilled-options");
      } else {
        console.error("Error saving questionnaire:", result.message);
      }
    } catch (error) {
      console.error("Error saving questionnaire data", error);
    }
  };
  

  return (
    <form className="p-6 text-black max-w-md mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Questionnaire</h2>
      <label className="block">Do you have prior work experience?</label>
      <select name="experience" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {answers.experience === "Yes" && (
        <>
          <label className="block mt-4">Years of Experience</label>
          <input type="number" name="yearsOfExperience" onChange={handleChange} className="block p-2 mt-2 border w-full" />

          <label className="block mt-4">Do you have any formal qualifications?</label>
          <select name="qualifications" onChange={handleChange} className="block p-2 mt-2 border w-full">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </>
      )}
      <label className="block mt-4">Have you graduated?</label>
      <select name="graduated" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label className="block mt-4">Are you currently in tertiary education?</label>
      <select name="currentlyInTertiary" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label className="block mt-4">Are you an entry-level job seeker?</label>
      <select name="entryLevel" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label className="block mt-4">Which sector do you work in?</label>
      <select name="sector" onChange={handleChange} className="block p-2 mt-2 border w-full">
        <option value="">Select</option>
        <option value="Mining">Mining</option>
        <option value="Tourism">Tourism</option>
        <option value="Manufacturing">Manufacturing</option>
      </select>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full" type="submit">
        Next
      </button>
    </form>
  );
};

export default Questionnaire;
