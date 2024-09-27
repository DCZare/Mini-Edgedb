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
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', margin: '20px 0' }}>
        CSV Manager
      </h1>
      {works.length === 0 ? (
        <p>No works found.</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', width: '80%', margin: '0 auto' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h2 style={{ margin: '0' }}>Title</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {works.map((work) => (
                <li key={work.id} style={{ marginBottom: '10px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {work.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0' }}>DOI</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {works.map((work) => (
                <li key={work.id} style={{ marginBottom: '10px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {work.doi}
                  </div>
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
