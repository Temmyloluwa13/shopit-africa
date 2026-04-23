import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json();
    
    // In a real app, hash password using bcrypt
    // const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user in DB
    // const newUser = await prisma.user.create({
    //   data: { email, passwordHash, name, role }
    // });
    
    return NextResponse.json({
      message: "User registered successfully",
      // data: newUser
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
