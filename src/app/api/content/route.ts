import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    
    let query = 'SELECT section, content_key, content_value FROM site_content';
    const queryParams: (string | null)[] = [];
    
    if (section) {
      query += ' WHERE section = ?';
      queryParams.push(section);
    }
    
    const [rows] = await db.query(query, queryParams);
    const content = rows as { section: string; content_key: string; content_value: string }[];
    
    // Group by section for easier consumption
    const result: Record<string, Record<string, string>> = {};
    for (const item of content) {
      if (!result[item.section]) {
        result[item.section] = {};
      }
      result[item.section][item.content_key] = item.content_value;
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Basic protection (middleware should already catch it)
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section, data } = await request.json();
    if (!section || !data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    for (const [key, value] of Object.entries(data)) {
      await db.query(
        'INSERT INTO site_content (section, content_key, content_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE content_value = ?',
        [section, key, value, value]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
