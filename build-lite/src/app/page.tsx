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
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>CSV Manager</h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '80%',
          maxWidth: '1500px',
          borderLeft: '1px solid white',
          borderRight: '1px solid white',
        }}>
          {/* Table Headers */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid white',
            borderBottom: '1px solid white',
            backgroundColor: 'black',
          }}>
            <h2 style={{
              flex: '0 0 1100px',
              margin: 0,
              padding: '10px',
              borderRight: '1px solid white',
              color: 'white'
            }}>Title</h2>
            <h2 style={{
              flex: '0 0 880px', // Set a larger width for the DOI column (previously 440px)
              margin: 0,
              padding: '10px',
              borderLeft: '1px solid white',
              color: 'white',
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              minWidth: '880px', // Ensures it doesn't get smaller than this
            }}>DOI</h2>
          </div>

          {/* Table Data */}
          {works.length === 0 ? (
            <p style={{ color: 'white' }}>No works found.</p>
          ) : (
            works.map((work) => (
              <div key={work.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid white',
                backgroundColor: 'black',
              }}>
                <p style={{
                  flex: '0 0 1100px',
                  margin: '5px 0',
                  padding: '10px',
                  borderRight: '1px solid white',
                  wordWrap: 'break-word',
                  color: 'white',
                }}>{work.title}</p>
                <p style={{
                  flex: '0 0 880px', // Match the header width for the DOI column
                  margin: '5px 0',
                  padding: '10px',
                  fontFamily: 'monospace',
                  color: 'white',
                  borderLeft: '1px solid white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  minWidth: '880px', // Ensures it doesn't get smaller than this
                }}>{work.doi}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
