import { forwardRef, useState } from 'react'
import { Button } from '@/shared/ui/atoms/button'
import { Input, InputProps } from '@/shared/ui/atoms/input'
import { EyeIcon, EyeOffIcon } from '@/shared/ui/atoms/icons'
import { useTranslation } from 'react-i18next'

interface PasswordInputProps extends Omit<InputProps, 'type'> {
	showPasswordToggle?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className = '', showPasswordToggle = true, ...props }, ref) => {
		const { t } = useTranslation()
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className='relative'>
				<Input
					{...props}
					ref={ref}
					type={showPassword ? 'text' : 'password'}
					className={`${showPasswordToggle ? 'pr-10' : ''} ${className}`}
				/>
				{showPasswordToggle && (
					<Button
						type='button'
						variant='ghost'
						size='sm'
						className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
						onClick={() => setShowPassword(!showPassword)}
						disabled={props.disabled}
						aria-label={showPassword ? t('hide_password') : t('show_password')}
					>
						{showPassword ? (
							<EyeOffIcon className='h-4 w-4 text-muted-foreground' />
						) : (
							<EyeIcon className='h-4 w-4 text-muted-foreground' />
						)}
					</Button>
				)}
			</div>
		)
	}
)

PasswordInput.displayName = 'PasswordInput'
