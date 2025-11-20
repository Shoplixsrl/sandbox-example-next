'use server';

import { db } from '@/db';
import { users, freelancerProfiles, clientProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signIn } from '@/lib/auth';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['freelancer', 'client']),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterInput) {
  try {
    const validated = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validated.email),
    });

    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Create user
    const [newUser] = await db.insert(users).values({
      email: validated.email,
      password: hashedPassword,
      name: validated.name,
      role: validated.role,
    }).returning();

    // Create corresponding profile based on role
    if (validated.role === 'freelancer') {
      await db.insert(freelancerProfiles).values({
        userId: newUser.id,
        title: 'New Freelancer',
        bio: '',
      });
    } else if (validated.role === 'client') {
      await db.insert(clientProfiles).values({
        userId: newUser.id,
        bio: '',
      });
    }

    return { success: true, userId: newUser.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to register user' };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginUser(data: { email: string; password: string }) {
  try {
    const validated = loginSchema.parse(data);

    const result = await signIn('credentials', {
      email: validated.email,
      password: validated.password,
      redirect: false,
    });

    return { success: true, result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Invalid credentials' };
  }
}
