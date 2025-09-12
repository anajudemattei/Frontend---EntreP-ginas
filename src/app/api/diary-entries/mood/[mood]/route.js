import { NextResponse } from 'next/server';
import { mockData } from '../../../mockData.js';

// GET /api/diary-entries/mood/[mood] - Obter entradas por humor
export async function GET(request, { params }) {
  try {
    const { mood } = params;
    const entries = mockData.getEntries().filter(entry => entry.mood === mood);
    
    // Ordenar por data (mais recente primeiro)
    entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
    
    return NextResponse.json({
      data: entries,
      total: entries.length,
      mood: mood,
      success: true
    });
    
  } catch (error) {
    console.error('Error fetching entries by mood:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
