import { useRouter } from "next/router";
import useSwr from "swr"; // Don't forget to import useSwr
import JobDetails from "../../../components/JobDetails/JobDetails";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function JobDetail() {
  const router = useRouter();
  const { title } = router.query; // Extract title from the URL

  // Use useSwr to fetch job details from the API
  const { data, error } = useSwr(title ? `/api/jobs/${encodeURIComponent(title)}` : null, fetcher);


  if (!data) return <p>Loading job details for {title}...</p>;
  if (error) return <p>{error.message}</p>;

  if (!data) return <p>Job not found</p>;

  return (
    <>
      <JobDetails job={data} /> {/* Pass the job data to your JobDetails component */}
    </>
  );
}
