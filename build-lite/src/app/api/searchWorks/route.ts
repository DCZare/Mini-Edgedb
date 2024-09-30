import { NextResponse } from 'next/server';
import { createClient } from 'edgedb';

const client = createClient();

// Handle the search request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('q');

  if (!searchTerm) {
    return NextResponse.json([]);
  }

  try {
    // Updated EdgeQL query to search abstracts, DOIs, and author names
    const result = await client.query(`
      SELECT Work {
        id,
        title,
        doi,
        authors: {
          name
        }
      }
      FILTER 
        Work.abstract ILIKE <str>$search_term 
        OR Work.doi ILIKE <str>$search_term
        OR EXISTS (
          SELECT Work.authors 
          FILTER Work.authors.name ILIKE <str>$search_term
        );
    `, { search_term: `%${searchTerm}%` });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json({ error: 'Failed to fetch works' }, { status: 500 });
  }
}
