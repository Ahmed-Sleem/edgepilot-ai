import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. TODO: Get providers
    const providers = [
      {
        provider_id: 'ollama',
        name: 'ollama',
        type: 'local',
        base_url: 'http://localhost:11434',
        is_active: true,
      },
      {
        provider_id: 'gemini',
        name: 'gemini',
        type: 'cloud',
        base_url: null,
        is_active: true,
      },
      {
        provider_id: 'groq',
        name: 'groq',
        type: 'cloud',
        base_url: null,
        is_active: true,
      },
    ];
    
    // 2. Return response
    return NextResponse.json({
      success: true,
      data: providers,
    });
  } catch (error) {
    console.error('Get providers error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
