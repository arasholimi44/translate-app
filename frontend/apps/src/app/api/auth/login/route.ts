import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"; // Use consistent import path
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const result = await db.query(
      'SELECT id, email, password FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user data (without password)
    return NextResponse.json({
      id: user.id,
      email: user.email
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}