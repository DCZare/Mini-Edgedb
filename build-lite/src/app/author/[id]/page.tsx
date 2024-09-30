import { createClient } from 'edgedb';
import React from 'react';

interface Work {
  id: string;
  title: string;
  doi: string;
  journal: string;
}

interface Author {
  id: string;
  name: string;
  works: Work[];
}

const client = createClient();

async function getAuthorById(id: string): Promise<Author | null> {
  const query = `
    SELECT Author {
      id,
      name,
      works := (
        SELECT Work {
          id,
          title,
          doi,
          journal
        } 
        FILTER .authors.id = <uuid>$id
      )
    }
    FILTER .id = <uuid>$id
    LIMIT 1
  `;

  const result = await client.query(query, { id }) as Author[];
  return result.length > 0 ? result[0] : null;
}

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const author = await getAuthorById(params.id);

  if (!author) {
    return (
      <main style={styles.container}>
        <h2 style={styles.notFound}>Author not found</h2>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>{author.name}</h1>
      <div style={styles.infoContainer}>
        <div style={styles.section}>
          <h2 style={styles.label}>Works by {author.name}:</h2>
          {author.works.length > 0 ? (
            <ul style={styles.workList}>
              {author.works.map((work) => (
                <li key={work.id} style={styles.workItem}>
                  <a href={`/works/${work.id}`} style={styles.link}>
                    {work.title} ({work.journal})
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noWorks}>No works found for this author.</p>
          )}
        </div>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#555',
    borderBottom: '2px solid #0070f3',
    paddingBottom: '5px',
  },
  workList: {
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  workItem: {
    marginBottom: '10px',
  },
  noWorks: {
    fontSize: '1rem',
    color: '#e74c3c',
  },
  notFound: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#e74c3c',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
};
