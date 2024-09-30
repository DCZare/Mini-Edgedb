// src/app/api/searchWorks/route.ts

import { NextResponse } from 'next/server';
import { createClient } from 'edgedb';

const client = createClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  try {
    // Query EdgeDB for works that match the search query in their titles
    const works = await client.query(`
      SELECT Work { id, title, doi } FILTER contains(.title, <str>$query);
    `, { query });

    return NextResponse.json(works);
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json({ error: 'Failed to fetch works' }, { status: 500 });
  }
}
