import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CreateDeviceSchema } from '@/shared/types/device';

export async function POST(request: Request) {
  try {
    // 1. Parse and validate request
    const body = await request.json();
    const validatedData = CreateDeviceSchema.parse(body);
    
    // 2. TODO: Get user from session
    const userId = 'temp-user-id';
    
    // 3. TODO: Create device
    // const device = await deviceRepository.create({ ...validatedData, userId });
    
    // 4. Return response
    return NextResponse.json({
      success: true,
      message: 'Device created',
      data: {
        device_id: 'temp-device-id',
        ...validatedData,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Create device error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // 1. TODO: Get user from session
    const userId = 'temp-user-id';
    
    // 2. TODO: Get devices for user
    // const devices = await deviceRepository.findByUserId(userId);
    
    // 3. Return response
    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.error('Get devices error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
