import { createClient } from 'edgedb';
import Head from 'next/head';
import './globals.css'; // Ensure your CSS file is imported

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
        <title>CSV Manager</title>
        <meta name="description" content="List of works" />
      </Head>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>CSV Manager</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%', maxWidth: '1300px' }}> {/* Adjusted maxWidth */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ flex: '0 0 1100px', margin: 0 }}>Title</h2> {/* Set title width to 1100px */}
            <h2 style={{ flex: '1', margin: 0 }}>DOI</h2>
          </div>
          {works.length === 0 ? (
            <p>No works found.</p>
          ) : (
            works.map((work) => (
              <div key={work.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ flex: '0 0 1100px', margin: '5px 0', wordWrap: 'break-word' }}>{work.title}</p>
                <p style={{ flex: '1', margin: '5px 0' }}>{work.doi}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
