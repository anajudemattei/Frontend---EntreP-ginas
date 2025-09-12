import { NextResponse } from 'next/server';
import { mockData } from '../../mockData.js';

// GET /api/diary-entries/stats - Obter estatísticas do diário
export async function GET() {
  try {
    const stats = mockData.getStats();
    
    return NextResponse.json({
      data: stats,
      success: true
    });
    
  } catch (error) {
    console.error('Error fetching diary stats:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
