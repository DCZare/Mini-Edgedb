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
      <h1 style={{ textAlign: 'center' }}>Works</h1>
      {works.length === 0 ? (
        <p>No works found.</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ flex: '1', marginRight: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Title</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {works.map((work) => (
                <li key={work.id} style={{ marginBottom: '10px' }}>
                  {work.title}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1' }}>
            <h2 style={{ textAlign: 'center' }}>DOI</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {works.map((work) => (
                <li key={work.id} style={{ marginBottom: '10px' }}>
                  {work.doi}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
