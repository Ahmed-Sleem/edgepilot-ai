import { NextResponse } from 'next/server';
import { z } from 'zod';
import { BenchmarkRequestSchema } from '@/modules/benchmark/application/dtos/BenchmarkRequest';

export async function POST(request: Request) {
  try {
    // 1. Parse and validate request
    const body = await request.json();
    const validatedData = BenchmarkRequestSchema.parse(body);
    
    // 2. TODO: Get user from session
    const userId = 'temp-user-id';
    
    // 3. TODO: Run benchmark
    // const result = await runBenchmark.execute(validatedData, userId);
    
    // 4. Return response
    return NextResponse.json({
      success: true,
      message: 'Benchmark started',
      data: {
        benchmark_id: 'temp-benchmark-id',
        status: 'pending',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Benchmark error:', error);
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
    
    // 2. TODO: Get benchmarks for user
    // const benchmarks = await benchmarkRepository.findByUserId(userId);
    
    // 3. Return response
    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.error('Get benchmarks error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
