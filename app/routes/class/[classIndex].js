import useRouter from '~/hooks/useRouter'
import { Link } from "@remix-run/react"
import Screen from "~/components/Screen";
import useClass from '../../modules/api/useClass';
import useI18n from '../../modules/i18n/useI18n';
import ClassDetailsView from '~/components/classes/ClassDetailsView';

function Clss() {
	const { tr } = useI18n()
	const router = useRouter()
	const clssResponse = useClass(router.query.classIndex)

	const clss = clssResponse.data

	return (
		<Screen
			title={tr(clss?.nameLocalized)}
			isLoading={clssResponse.isLoading}
			withBottomSpace
		>
			{clss && (
				<div className="flex flex-col">
					<div className="relative w-full px-4 mt-12">
						<>
							<Link to={`/levelling/${clss.index}/1`}>
								Voir la montée de niveau
							</Link>
							<ClassDetailsView clss={clss} />
						</>
					</div>
				</div>
			)}
		</Screen>
  );
}

export default Clss;
