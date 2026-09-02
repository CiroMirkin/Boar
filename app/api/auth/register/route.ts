import { NextRequest, NextResponse } from 'next/server'
import { Prisma, prisma } from '@/shared/lib/prisma'
import { isRateLimited } from '@/shared/lib/rateLimit'
import bcrypt from 'bcryptjs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
	try {
		const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
		if (isRateLimited(`register:${ip}`, 5, 60_000)) {
			return NextResponse.json(
				{ error: 'Demasiados intentos. Probá de nuevo en un minuto.' },
				{ status: 429 }
			)
		}

		const body = await req.json()
		const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
		const password = typeof body?.password === 'string' ? body.password : ''

		if (!email || !password) {
			return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 })
		}

		if (!EMAIL_RE.test(email)) {
			return NextResponse.json({ error: 'El email no es válido' }, { status: 400 })
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
	}
	catch (error) {
		/*
		Violación de unicidad: otro request creó el mismo email en la carrera entre el findUnique de arriba y este create.
		*/
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
			return NextResponse.json({ error: 'El email ya está registrado' }, { status: 409 })
		}
		console.error('Error al registrar usuario:', error)
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
	}
}
