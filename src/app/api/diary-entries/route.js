import { NextRequest, NextResponse } from 'next/server';
import { mockData } from '../mockData.js';

// GET /api/diary-entries - Listar entradas com filtros opcionais
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    let entries = mockData.getEntries();
    
    // Filtro por mood
    const mood = searchParams.get('mood');
    if (mood) {
      entries = entries.filter(entry => entry.mood === mood);
    }
    
    // Filtro por favoritos
    const favorites = searchParams.get('favorites');
    if (favorites === 'true') {
      entries = entries.filter(entry => entry.is_favorite);
    }
    
    // Filtro por tags
    const tag = searchParams.get('tag');
    if (tag) {
      entries = entries.filter(entry => 
        entry.tags && entry.tags.includes(tag)
      );
    }
    
    // Busca por texto
    const search = searchParams.get('search');
    if (search) {
      const searchLower = search.toLowerCase();
      entries = entries.filter(entry => 
        entry.title.toLowerCase().includes(searchLower) ||
        entry.content.toLowerCase().includes(searchLower)
      );
    }
    
    // Ordenação por data (mais recente primeiro)
    entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
    
    // Paginação
    const limit = parseInt(searchParams.get('limit')) || null;
    const offset = parseInt(searchParams.get('offset')) || 0;
    
    if (limit) {
      entries = entries.slice(offset, offset + limit);
    }
    
    return NextResponse.json({
      data: entries,
      total: mockData.getEntries().length,
      success: true
    });
    
  } catch (error) {
    console.error('Error fetching diary entries:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}

// POST /api/diary-entries - Criar nova entrada
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios', success: false },
        { status: 400 }
      );
    }
    
    // Dados da nova entrada
    const entryData = {
      title: body.title,
      content: body.content,
      mood: body.mood || null,
      is_favorite: body.is_favorite || false,
      tags: body.tags || [],
      entry_date: body.entry_date || new Date().toISOString()
    };
    
    const newEntry = mockData.addEntry(entryData);
    
    return NextResponse.json({
      data: newEntry,
      success: true
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating diary entry:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', success: false },
      { status: 500 }
    );
  }
}
