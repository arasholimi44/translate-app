import { NextResponse } from 'next/server';
import db from "@/lib/db"; // Use consistent import path
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );
    
    if (userExists.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 } // More appropriate status code
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    return NextResponse.json({ 
      success: true,
      user: newUser.rows[0] 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}