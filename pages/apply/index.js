import { useRouter } from "next/router";
import { useState } from "react";

export default function Apply() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id, name, email }),
    });
    alert("Application submitted!");
    router.push("/jobs");
  };

  return (
    <form className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
      <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} className="block w-full p-2 border mb-4" required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="block w-full p-2 border mb-4" required />
      <button className="px-4 py-2 bg-blue-500 text-white rounded w-full" type="submit">
        Submit Application
      </button>
    </form>
  );
}
