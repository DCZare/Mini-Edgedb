import { createClient } from 'edgedb';
import Link from 'next/link';

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

type SearchResult = Work | Author;

const client = createClient();

async function search(query: string): Promise<SearchResult[]> {
  return []; 
}

export default async function SearchPage() {
  const results = await search('your search query');

  return (
    <div>
      {results.map((result) => (
        <Link key={result.id} href={('doi' in result) ? `/works/${result.id}` : `/author/${result.id}`}>
          <h3 className="text-xl text-blue-600 underline cursor-pointer hover:text-blue-800">
            {'title' in result ? result.title : result.name}
          </h3>
        </Link>
      ))}
    </div>
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
} as const;
