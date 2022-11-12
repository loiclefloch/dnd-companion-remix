import { useRouter } from '~/hook/useRouter'
import Screen from "~/component/Screen";
import useClasses from '../../modules/api/useClasses';
import useI18n from '../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/component/ListSelectRow"
import IconRace from "~/component/icons/IconRace"
import IconAcademicCap from "~/component/icons/IconAcademicCap"

function ClassRow({ clss }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url =  `/class/${clss.index}`

	return (
		<ListSelectRowAsCard
			size="small"
			onClick={() => router.push(url)}
			icon={<IconRace clss={clss.index} className="h-8 fill-slate-600" />}
			title={tr(clss.nameLocalized)}
			subtitle={tr(clss.resume)}
		/>
	)
}

function Race() {
	const classResponse = useClasses()

  return (
    <Screen
      title={"Les classes"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={classResponse.isLoading}
			withBottomSpace
    >
			<div className="flex flex-col">

				<ListRowSelectContainer className="px-4 mt-4">
					{classResponse.data?.map(clss => (
						<ClassRow key={`class_${clss.index}`} clss={clss} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default Race;
