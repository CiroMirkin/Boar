import { useTheme } from '@/sharedByModules/hooks/useTheme'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'

function ThemePreview() {
	const { bg, column, task, taskText, columnText } = useTheme()
	const { t } = useTranslation()
	const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')

	const boardClass = `w-full h-auto md:py-4 py-6 px-2 flex justify-center flex-wrap gap-4 `
	const columnClass = `w-[10rem] min-h-30 px-2 pt-1 pb-10 rounded-sm ${column}`
	const cardClass = `block min-h-10 w-full rounded-sm shadow-sm ${task}`
	const cardTextClass = `w-full h-auto p-1.5 pb-2 text-[10px] font-semibold ${taskText || 'text-black'}`

	return (
		<div className={'w-full full rounded-lg select-none ' + bg}>
			<div className={boardClass}>
				{!isSmallDevice && (
					<div className={columnClass}>
						<div className={`text-sm ${columnText}`}>{t('default_columns.c1')}</div>
						<div className='mt-1 flex flex-col gap-2'>
							<div className={cardClass}>
								<div className={cardTextClass}>
									Lorem ipsum dolor sit amet consectetur elit.
								</div>
							</div>
							<div className={cardClass}>
								<div className={cardTextClass}>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Suscipit, assumenda pariatur!
								</div>
							</div>
						</div>
					</div>
				)}

				<div className={columnClass}>
					<div className={`text-sm ${columnText}`}>{t('default_columns.c2')}</div>
					<div className='mt-1 flex flex-col gap-2'>
						<div className={cardClass}>
							<div className={cardTextClass}>
								Lorem ipsum dolor sit amet consectetur.
							</div>
						</div>
						<div className={cardClass}>
							<div className={cardTextClass}>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit nulla.
							</div>
						</div>
						<div className={cardClass}>
							<div className={cardTextClass}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
								sapiente voluptatibus culpa cumque dicta?
							</div>
						</div>
					</div>
				</div>
				{!isSmallDevice && (
					<div className={columnClass}>
						<div className={`text-sm ${columnText}`}>{t('default_columns.c3')}</div>
						<div className='mt-1 flex flex-col gap-2'>
							<div className={cardClass}>
								<div
									className={`w-full h-auto p-1.5 pb-2  rounded-md text-[10px] font-semibold ${taskText || 'text-black'}`}
								>
									Lorem ipsum dolor sit amet consectetur elit.
								</div>
							</div>
							<div className={cardClass}>
								<div className={cardTextClass}>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi.
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ThemePreview
