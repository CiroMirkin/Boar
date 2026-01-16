import { type FormEvent } from 'react'
import { Button } from '@/ui/atoms/button'
import { Input } from '@/ui/atoms/input'
import { Label } from '@/ui/atoms/label'
import { useTranslation } from 'react-i18next'

interface AuthFormProps {
	isRegister: boolean
	loading: boolean
	email: string
	setEmail: (email: string) => void
	password: string
	setPassword: (password: string) => void
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function AuthForm({
	isRegister,
	loading,
	email,
	setEmail,
	password,
	setPassword,
	onSubmit,
}: AuthFormProps) {
	const { t } = useTranslation()

	const submitText = loading
		? t('loading', { defaultValue: 'Cargando...' })
		: isRegister
			? t('log_out_btn')
			: t('sing_in')

	return (
		<form onSubmit={onSubmit} className='flex flex-col justify-evenly gap-4'>
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
				<Button type='submit' disabled={loading} className='w-full' aria-busy={loading}>
					{submitText}
				</Button>
			</div>
		</form>
	)
}
