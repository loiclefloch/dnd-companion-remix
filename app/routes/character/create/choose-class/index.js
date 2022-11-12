import useRouter from '~/hooks/useRouter'
import Screen from "~/components/Screen";
import useClasses from '../../../../modules/api/useClasses';
import useI18n from '../../../../modules/i18n/useI18n';
import { ListSelectRowAsCard, ListRowSelectContainer } from "~/components/ListSelectRow"
import IconClass from "~/components/icons/IconClass"
import ScreenIntroduction from "~/components/ScreenIntroduction"

function ClassRow({ clss }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-class/${clss.index}`

	return (
		<ListSelectRowAsCard 
			onClick={() => {
				router.push(url)
			}}
			icon={
				<IconClass
					withBgColor
					// withTextColor
					clss={clss.index}
					className="w-12 h-12 fill-white"
				/>
			}
			title={tr(clss.nameLocalized)}
			subtitle={tr(clss.resume)}
		/>
	)
}

function Form({ classes }) {
	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre classe"
				description={`De nombreuses classes existent dans le monde de Donjon & Dragons.`}
				actions={
					<button>En savoir plus</button>
				}
			/>

			<ListRowSelectContainer className="px-4 mt-6">
				{classes?.map(clss => (
					<ClassRow key={clss.index} clss={clss} />
				))}
			</ListRowSelectContainer>
		</div>
	)
}

function ChooseCharacterClass() {
	const classesResponse = useClasses()

	return (
		<Screen
			title={"Choix de la classe"}
			isLoading={classesResponse.isLoading}
		>
			{classesResponse.data && (<Form classes={classesResponse.data} />)}
		</Screen>
  );
}

export default ChooseCharacterClass;
