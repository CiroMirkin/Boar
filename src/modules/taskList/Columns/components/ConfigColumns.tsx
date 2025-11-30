import { EditColumn } from './EditColumn'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/ui/organisms/SettingSection'
import { AddNewColumnForm } from './AddNewColumnForm'
import { useColumnList } from '../hooks/useColumnList'

export function ConfigColumns() {
	const { t } = useTranslation()

	const columnList = useColumnList()
	const columns = columnList.map((column) => <EditColumn column={column} key={column.id} />)

	return (
		<SettingSection>
			<SettingSection.Title>{t('settings.columns.section_title')}</SettingSection.Title>
			<SettingSection.Content className='grid justify-stretch gap-y-3 bg-transparent px-0 my-0'>
				{columns}
				<AddNewColumnForm />
			</SettingSection.Content>
		</SettingSection>
	)
}
