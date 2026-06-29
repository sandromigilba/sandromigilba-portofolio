import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ResultSetHeader } from 'mysql2/promise';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { name, short_description, long_description, tags, live_url, github_url, features, image_base64 } = data;

    if (!name || !short_description) {
      return NextResponse.json({ error: 'Name and short description are required' }, { status: 400 });
    }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO projects 
      (name, short_description, long_description, tags, live_url, github_url, features, image_base64) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        short_description, 
        long_description || '', 
        JSON.stringify(tags || []), 
        live_url || '', 
        github_url || '', 
        JSON.stringify(features || []), 
        image_base64 || ''
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
