import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/ui/atoms/button'
import { Input } from '@/ui/atoms/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/molecules/card'
import { Label } from '@/ui/atoms/label'
import type { AuthUnknownError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { checkIfUserHasTheDefaultBoard } from './utils/checkIfUserHasTheDefaultBoard'
import { setUpUserBoard } from './utils/setUpUserBoard'

export default function AuthCard() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isRegister, setIsRegister] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const { t } = useTranslation()

	const showToast = useRef<boolean>(false)
	useEffect(() => {
		const checkDefaultBoard = async () => {
			if (showToast.current) return
			showToast.current = true

			try {
				const hasUserDefaultBoard = await checkIfUserHasTheDefaultBoard()
				if (!hasUserDefaultBoard) {
					toast.warning(
						t('board_will_be_lost_warning', {
							defaultValue:
								'El tablero actual se perderá si inicia sesión, para conservarlo debe crear una nueva cuenta.',
						})
					)
				}
			} catch (error) {
				console.error('Error checking default board:', error)
			}
		}

		checkDefaultBoard()
	}, [t])

	const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		try {
			const { data, error } = isRegister
				? await supabase.auth.signUp({ email, password })
				: await supabase.auth.signInWithPassword({ email, password })

			if (error) throw error

			const successMessage = isRegister ? t('successful_log_in_toast') : t('sing_in_toast')
			toast.success(successMessage)

			if (data?.session) {
				await setUpUserBoard({ session: data.session })
			}

			setIsSubmitted(true)
		} catch (error) {
			const authError = error as AuthUnknownError
			const errorMessage =
				authError.message || t('auth_error', { defaultValue: 'Error de autenticación' })
			toast.error(errorMessage)
			console.error('Authentication error:', error)
		} finally {
			setLoading(false)
		}
	}

	const toggleAuthMode = () => {
		setIsRegister(!isRegister)
		setEmail('')
		setPassword('')
	}

	if (isSubmitted) {
		return <Navigate to='/' replace />
	}

	const title = isRegister ? t('log_in_form_title') : t('sing_in')
	const submitText = loading
		? t('loading', { defaultValue: 'Cargando...' })
		: isRegister
			? t('log_out_btn')
			: t('sing_in')
	const toggleText = isRegister ? t('already_have_an_account') : t('dont_have_an_account')

	return (
		<Card className='rounded-lg px-6 py-2'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAuth} className='flex flex-col justify-evenly gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>{t('email')}</Label>
						<Input
							id='email'
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
							autoComplete='email'
							required
							aria-required='true'
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>{t('password')}</Label>
						<Input
							id='password'
							type='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
							autoComplete={isRegister ? 'new-password' : 'current-password'}
							minLength={6}
							required
							aria-required='true'
						/>
					</div>
					<div>
						<Button
							type='submit'
							disabled={loading}
							className='w-full'
							aria-busy={loading}
						>
							{submitText}
						</Button>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<Button onClick={toggleAuthMode} variant='link' disabled={loading} type='button'>
					{toggleText}
				</Button>
			</CardFooter>
		</Card>
	)
}
