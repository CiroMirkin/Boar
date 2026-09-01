import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		// Normalizado para coincidir con el lookup de auth.ts, que hace toLowerCase()
		const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
		const password = typeof body?.password === 'string' ? body.password : ''

		if (!email || !password) {
			return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 })
		}

		if (password.length < 6) {
			return NextResponse.json(
				{ error: 'La contraseña debe tener al menos 6 caracteres' },
				{ status: 400 }
			)
		}

		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 })
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		})

		return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
	} catch (error) {
		console.error('Error al registrar usuario:', error)
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
	}
}
