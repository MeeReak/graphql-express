import Link from "next/link";
import { FaAngry } from "react-icons/fa";
import React from "react";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-700">
      <FaAngry size={80} className="mb-6 text-green-600" />
      <h1 className="text-4xl font-bold mb-4">Oops! Page not found</h1>
      <p className="text-lg text-center mb-8 max-w-md">
        We can&apos;t seem to find the page you&apos;re looking for. Don&apos;t
        worry, you can find your way back to safety!
      </p>
      <Link href="/">
        <div className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300">
          Go back to Home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
