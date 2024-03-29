import { useMemo } from "react"
import Screen from "~/components/Screen";
import { sortBy } from "lodash";
import { Link, useLoaderData } from "@remix-run/react"
import useI18n from "../../modules/i18n/useI18n";
import IconAcademicCap from "~/components/icons/IconAcademicCap";
import useLocalSearch from "~/components/useLocalSearch";
import InputSearch from "~/components/InputSearch";
import type { LoaderArgs} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { formatFeature } from "~/mappers/feature.mapper";
import { getFeatures } from "~/services/feature.server";
import { requireUser } from "~/services/session.server";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const featureApiObjects = await getFeatures();

  return json({
    features: featureApiObjects.map(formatFeature),
  });
}

function FeatureRow({ feature }) {
  const { tr } = useI18n();

  return (
    <Link to={`/features/${feature.index}`} >
      <div
        // onClick={onSelect}
        className={`relative cursor-pointer border-b border-solid border-slate-100 py-1  pl-3 dark:border-gray-50`}
        data-cy-feature-index={`feature-${feature.index}`}
      >
        {tr(feature.nameLocalized)}
        <div className="text-meta">
          {feature.forBackground && <span>{feature.background.name}</span>}
          {feature.forClass && (
            <span>
              {feature.class.name} - {feature.level}
            </span>
          )}
        </div>
        {/*{tr(feature.resume)}*/}
      </div>
    </Link>
  );
}


// TODO: filter: by class, by background
export default function Features() {
	const { features } = useLoaderData<typeof loader>();

  const sortedFeatures = useMemo(() => {
    return sortBy(features, ['background', 'class', 'level', 'name'])
  }, [features]);

  const {
    searchHistory,
    searchResults,
    search,
    term,
    onRemoveHistoryQuery,
    // reset
  } = useLocalSearch("spells", {
    data: sortedFeatures,
    options: useLocalSearch.searchOptions.features,
  });

  return (
    <Screen
      title={"Les features"}
      titleIcon={<IconAcademicCap className="h-6 w-6" />}
      withBottomSpace
    >
      <div className="flex flex-col">
        <InputSearch
          className="px-4"
          searchHistory={searchHistory}
          term={term}
          onChange={search}
          onRemoveHistoryQuery={onRemoveHistoryQuery}
        />
        <div className="mt-2 flex flex-col gap-2 px-2" data-cy-id="features-list">
          {searchResults && term
            ? searchResults.map((searchResult) => {
                const feature = searchResult.item;
                return (
                  <FeatureRow
                    key={`feature_${feature.index}`}
                    feature={feature}
                  />
                );
              })
            : sortedFeatures.map((feature) => (
                <FeatureRow
                  key={`feature_${feature.index}`}
                  feature={feature}
                />
              ))}
        </div>
      </div>
    </Screen>
  );
}
