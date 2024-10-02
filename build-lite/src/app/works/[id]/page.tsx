import { createClient } from 'edgedb';

interface Author {
  id: string;
  name: string;
}

interface Work {
  id: string;
  title: string;
  doi: string;
  journal: string;
  abstract: string | null;
  cited_by_accounts_count: number | null;
  cited_by_posts_count: number | null;
  cited_by_tweeters_count: number | null;
  cited_by_patents_count: number | null;
  authors: Author[];  
}

const client = createClient();

async function getWorkById(id: string): Promise<Work | null> {
  const query = `
    SELECT Work {
      id,
      title,
      doi,
      journal,
      abstract,
      cited_by_accounts_count,
      cited_by_posts_count,
      cited_by_tweeters_count,
      cited_by_patents_count,
      authors: {
        id,
        name
      }
    }
    FILTER .id = <uuid>$id
    LIMIT 1
  `;
  return await client.querySingle<Work>(query, { id });

}

export default async function WorksPage({ params }: { params: { id: string } }) {
  const work = await getWorkById(params.id);

  if (!work) {
    return (
      <main style={styles.container}>
        <h2 style={styles.notFound}>Work not found</h2>
      </main>
    );
  }

  const accountsCited = work.cited_by_accounts_count ?? 0;
  const postsCited = work.cited_by_posts_count ?? 0;
  const tweetsMentioned = work.cited_by_tweeters_count ?? 0;
  const patentsCited = work.cited_by_patents_count ?? 0;

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>{work.title}</h1>
      <div style={styles.infoContainer}>
        <div style={styles.section}>
          <h2 style={styles.label}>Journal:</h2>
          <p style={styles.value}>{work.journal}</p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.label}>DOI:</h2>
          <p style={styles.value}>
            <a href={`https://doi.org/${work.doi}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
              {work.doi}
            </a>
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.label}>Abstract:</h2>
          <p style={styles.value}>
            {work.abstract ? work.abstract : 'No Abstract Available'}
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.label}>Metrics:</h2>
          <ul style={styles.citationList}>
            <li style={styles.citationItem}>Accounts Cited: {accountsCited}</li>
            <li style={styles.citationItem}>Posts Cited: {postsCited}</li>
            <li style={styles.citationItem}>Tweets Mentioned: {tweetsMentioned}</li>
            <li style={styles.citationItem}>Patents Cited: {patentsCited}</li>
          </ul>
        </div>
        <div style={styles.section}>
          <h2 style={styles.label}>Authors:</h2>
          {work.authors.length > 0 ? (
            <ul style={styles.authorList}>
              {work.authors.map((author) => (
                <li key={author.id} style={styles.authorItem}>
                  <a href={`/author/${author.id}`} style={styles.link}>
                    {author.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noAuthors}>No authors found for this work.</p>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
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
    textAlign: 'center' as const, 
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
  value: {
    fontSize: '1.1rem',
    color: '#444',
    marginTop: '5px',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  citationList: {
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  citationItem: {
    marginBottom: '5px',
    fontSize: '1rem',
    color: '#666',
  },
  authorList: {
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  authorItem: {
    marginBottom: '10px',
  },
  noAuthors: {
    fontSize: '1rem',
    color: '#e74c3c',
  },
  notFound: {
    textAlign: 'center' as const,  
    fontSize: '2rem',
    color: '#e74c3c',
  },
};
