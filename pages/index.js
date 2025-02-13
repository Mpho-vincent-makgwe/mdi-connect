import React from "react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">MDI Connect</h1>
      <p className="mt-4">Connecting skilled & unskilled workers to industries</p>
      
      <div className="mt-6">
        <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded">
          Get Started
        </Link>
      </div>

      <div className="mt-6">
        <p className="text-sm">Already have an account?</p>
        <Link href="/login" className="px-4 py-2 bg-blue-500z rounded">
          Login
        </Link>
      </div>
    </div>
  );
}
