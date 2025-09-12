import { NextResponse } from 'next/server';
import { mockData } from '../../mockData.js';

// GET /api/diary-entries/favorites - Obter entradas favoritas
export async function GET() {
  try {
    const entries = mockData.getEntries().filter(entry => entry.is_favorite);
    
    // Ordenar por data (mais recente primeiro)
    entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
    
    return NextResponse.json({
      data: entries,
      total: entries.length,
      success: true
    });
    
  } catch (error) {
    console.error('Error fetching favorite entries:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
