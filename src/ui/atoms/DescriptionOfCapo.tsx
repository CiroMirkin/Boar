import { useTranslation } from 'react-i18next'

export function DescriptionOfCapo() {
	const { t } = useTranslation()
	return (
		<div className='flex flex-col gap-y-2'>
			<p>
				<span className='font-medium'>Capo</span> {t('board_description.p1')}
			</p>
			<p>{t('board_description.p2')}</p>
		</div>
	)
}
