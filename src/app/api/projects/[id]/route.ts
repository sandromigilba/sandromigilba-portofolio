import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ResultSetHeader } from 'mysql2/promise';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const { name, short_description, long_description, tags, live_url, github_url, features, image_base64 } = data;

    if (!name || !short_description) {
      return NextResponse.json({ error: 'Name and short description are required' }, { status: 400 });
    }

    await db.query<ResultSetHeader>(
      `UPDATE projects SET 
        name = ?, 
        short_description = ?, 
        long_description = ?, 
        tags = ?, 
        live_url = ?, 
        github_url = ?, 
        features = ?, 
        image_base64 = ? 
      WHERE id = ?`,
      [
        name, 
        short_description, 
        long_description || '', 
        JSON.stringify(tags || []), 
        live_url || '', 
        github_url || '', 
        JSON.stringify(features || []), 
        image_base64 || '',
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await db.query<ResultSetHeader>('DELETE FROM projects WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
