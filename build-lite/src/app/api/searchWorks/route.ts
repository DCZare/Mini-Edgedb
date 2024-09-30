// src/app/api/searchWorks/route.ts

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
    // Combined EdgeQL query to search works and authors
    const result = await client.query(`
      SELECT Work {
        id,
        title,
        doi,
        authors: {
          id,
          name
        }
      }
      FILTER 
        Work.title ILIKE <str>$search_term 
        OR Work.doi ILIKE <str>$search_term
        OR EXISTS (
          SELECT Work.authors 
          FILTER Work.authors.name ILIKE <str>$search_term
        )
    `, { search_term: `%${searchTerm}%` });

    // Extract authors from the results
    const authors = await client.query(`
      SELECT Author {
        id,
        name
      }
      FILTER Author.name ILIKE <str>$search_term
    `, { search_term: `%${searchTerm}%` });

    return NextResponse.json([...result, ...authors]);
  } catch (error) {
    console.error('Error fetching works and authors:', error);
    return NextResponse.json({ error: 'Failed to fetch works and authors' }, { status: 500 });
  }
}
