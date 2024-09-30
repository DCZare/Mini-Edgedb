'use client';
import { useState, useEffect } from "react";
import Link from 'next/link'; // Import Next.js's Link component
import Search from "@/components/search/Search";

type Work = {
  id: string;
  title: string;
  doi: string;
};

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Work[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorksByTitle = async (searchValue: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/searchWorks?q=${encodeURIComponent(searchValue)}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchValue.trim() !== '') {
      fetchWorksByTitle(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm lg:flex-inline">
        <h1 className={'text-5xl my-10'}>UBNS Bibliometrics Search</h1>
        <Search onSearch={handleSearch} />
        <h2 className={'text-2xl mt-20 mx-2 underline'}>Searched for:</h2>
        <p className={'text-2xl m-2'}> {searchValue}</p>

        {loading ? (
          <p className="text-2xl m-2">Loading...</p>
        ) : searchResults.length > 0 ? (
          <div>
            {searchResults.map((work) => (
              <div key={work.id} className="my-4 p-4 border border-gray-300">
                {/* Link to dynamic route for the work */}
                <Link href={`/works/${work.id}`}>
                  <h3 className="text-xl text-blue-600 underline cursor-pointer hover:text-blue-800">
                    {work.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500">{work.doi}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-2xl m-2">No results found.</p>
        )}
      </div>
    </main>
  );
}
