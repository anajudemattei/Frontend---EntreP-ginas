import { NextResponse } from 'next/server';
import { mockData } from '../../mockData.js';

// GET /api/diary-entries/[id] - Obter entrada específica
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const entry = mockData.getEntry(id);
    
    if (!entry) {
      return NextResponse.json(
        { error: 'Entrada não encontrada', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: entry,
      success: true
    });
    
  } catch (error) {
    console.error('Error fetching diary entry:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

// PUT /api/diary-entries/[id] - Atualizar entrada
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const updatedEntry = mockData.updateEntry(id, body);
    
    if (!updatedEntry) {
      return NextResponse.json(
        { error: 'Entrada não encontrada', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: updatedEntry,
      success: true
    });
    
  } catch (error) {
    console.error('Error updating diary entry:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

// DELETE /api/diary-entries/[id] - Deletar entrada
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deletedEntry = mockData.deleteEntry(id);
    
    if (!deletedEntry) {
      return NextResponse.json(
        { error: 'Entrada não encontrada', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: deletedEntry,
      success: true,
      message: 'Entrada deletada com sucesso'
    });
    
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
