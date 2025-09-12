import { NextResponse } from 'next/server';
import { mockData } from '../../../mockData.js';

// PATCH /api/diary-entries/[id]/favorite - Toggle favorito
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const updatedEntry = mockData.toggleFavorite(id);
    
    if (!updatedEntry) {
      return NextResponse.json(
        { error: 'Entrada não encontrada', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: updatedEntry,
      success: true,
      message: updatedEntry.is_favorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos'
    });
    
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
