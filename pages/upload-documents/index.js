import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function UploadDocuments() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  
  // Default required documents
  const [documents, setDocuments] = useState([
    { file: null, type: "ID", required: true },
    { file: null, type: "Certification", required: false },
    { file: null, type: "Degree", required: false },
    { file: null, type: "Transcript", required: false },
  ]);

  const [additionalDocs, setAdditionalDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (index, isAdditional, e) => {
    const updatedDocuments = isAdditional ? [...additionalDocs] : [...documents];
    updatedDocuments[index].file = e.target.files[0];
    isAdditional ? setAdditionalDocs(updatedDocuments) : setDocuments(updatedDocuments);
  };

  const handleTypeChange = (index, e) => {
    const updatedDocuments = [...additionalDocs];
    updatedDocuments[index].type = e.target.value;
    setAdditionalDocs(updatedDocuments);
  };

  const handleOtherTypeChange = (index, e) => {
    const updatedDocuments = [...additionalDocs];
    updatedDocuments[index].customType = e.target.value;
    setAdditionalDocs(updatedDocuments);
  };

  const handleAddDocument = () => {
    setAdditionalDocs([...additionalDocs, { file: null, type: "", customType: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("You must be logged in to upload documents.");
      return;
    }

    if (!documents[0].file) {
      alert("ID document is required.");
      return;
    }

    setUploading(true);
    const formData = new FormData();

    [...documents, ...additionalDocs].forEach((doc) => {
      if (doc.file) {
        formData.append("files", doc.file);
        formData.append("types", doc.customType || doc.type);
      }
    });

    formData.append("userId", user._id);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload");

      // Redirect to dashboard after successful upload
      router.push("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-black">
      <h2 className="text-xl font-bold mb-4">Upload Your Documents</h2>
      <form onSubmit={handleSubmit}>
        {documents.map((doc, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold">{doc.type} {doc.required && <span className="text-red-500">*</span>}</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(index, false, e)}
              className="block p-2 mt-2 border w-full"
              required={doc.required}
            />
          </div>
        ))}

        <h3 className="text-lg font-semibold mt-6">Additional Documents</h3>
        {additionalDocs.map((doc, index) => (
          <div key={index} className="mb-4">
            <label className="block">Document Type</label>
            <select
              value={doc.type}
              onChange={(e) => handleTypeChange(index, e)}
              className="block p-2 mt-2 border w-full"
            >
              <option value="">Select Document Type</option>
              <option value="Resume">Resume</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Recommendation Letter">Recommendation Letter</option>
              <option value="Other">Other</option>
            </select>

            {doc.type === "Other" && (
              <input
                type="text"
                placeholder="Enter custom document type"
                value={doc.customType}
                onChange={(e) => handleOtherTypeChange(index, e)}
                className="block p-2 mt-2 border w-full"
              />
            )}

            <label className="block mt-4">Upload Document</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(index, true, e)}
              className="block p-2 mt-2 border w-full"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddDocument}
          className="mt-4 px-4 py-2 bg-gray-300 text-black rounded"
        >
          Add More Documents
        </button>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
