// src/app/page.tsx
import { createClient } from 'edgedb';
import Head from 'next/head';

type Work = {
  id: string;
  title: string;
  doi: string;
};

const client = createClient();

const fetchWorks = async (): Promise<Work[]> => {
  return await client.query(`SELECT Work { id, title, doi };`);
};

const HomePage = async () => {
  const works = await fetchWorks();

  return (
    <div>
      <Head>
        <title>Works Dashboard</title>
        <meta name="description" content="List of works" />
      </Head>
      <h1>Works</h1>
      {works.length === 0 ? (
        <p>No works found.</p>
      ) : (
        <ul>
          {works.map((work) => (
            <li key={work.id}>
              <h2>{work.title}</h2>
              <p>DOI: {work.doi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
