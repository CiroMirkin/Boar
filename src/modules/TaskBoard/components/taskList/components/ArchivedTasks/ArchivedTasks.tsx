import { useArchive } from '@/modules/TaskBoard/components/taskList/components/ArchivedTasks/hooks/useArchive'
import { useTranslation } from 'react-i18next'
import { Content } from './components/Content'
import { EmptySpaceText } from '@/ui/atoms/EmptySpaceText'
import Footer from './components/Footer'

export function ArchivedTasks() {
	const { t } = useTranslation()
	const boardArchive = useArchive()

	return (
		<>
			<div className='w-full min-h-[calc(100vh-7.8rem)] grid justify-items-center py-2 pt-2 pb-6 '>
				{boardArchive.length === 0 ? (
					<EmptySpaceText> {t('archive.empty_archive')} </EmptySpaceText>
				) : (
					<div className='max-w-3xl flex flex-col gap-y-2'>
						<Content />
						<Footer />
					</div>
				)}
			</div>
		</>
	)
}
