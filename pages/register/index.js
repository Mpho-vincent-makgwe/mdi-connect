import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    documents: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData);
    } catch (error) {
      setErrors({ general: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="border p-2 rounded text-black" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="border p-2 rounded text-black" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="border p-2 rounded text-black" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required className="border p-2 rounded text-black" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
