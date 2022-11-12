import { useMemo } from "react";
import { uniqBy, isEmpty } from "lodash";
import { Link, useLoaderData } from "@remix-run/react";
import Screen from "~/components/Screen";
import useI18n from "../../modules/i18n/useI18n";
import useTipDamageType from "~/components/useTipDamageType";
import useLocalSearch from "~/components/useLocalSearch";
import InputSearch from "~/components/InputSearch";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getEquipmentCategories } from "~/services/equipment.server";
import { requireUser } from "~/services/session.server";
import type { EquipmentDto } from "~/dtos/equipment.dto";
import { formatEquipmentCategory } from "~/mappers/equipment.mapper";

export async function loader({ request }: LoaderArgs) {
  const token = await requireUser(request);

  const equipmentCategories = await getEquipmentCategories();

  return json({
    equipmentCategories: equipmentCategories.map(formatEquipmentCategory),
  });
}

function ItemRow({ item }: { item: EquipmentDto }) {
  const { tr } = useI18n();
  const { showTipDamageType } = useTipDamageType();

  if (!item) {
    return null;
  }

  return (
    <div
      className={`relative border-b border-solid border-slate-100 py-1  dark:border-gray-50`}
      data-cy-item-index={`item-${item.index}`}
    >
      <div className="pl-1">
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col">
            <Link
              to={
                item.isMagicItem
                  ? `/magic-item/${item.index}`
                  : `/equipment/${item.index}`
              }
            >
              <span className="flex flex-row items-center font-semibold">
                <span>{tr(item.nameLocalized)}</span>
              </span>
            </Link>
            <div className="text-md">{tr(item.resume)}</div>
            <div className="text-meta text-sm">
              {item.isWeapon && (
                <>
                  {item.damage && (
                    <>
                      <span>{item.categoryRange} - </span>
                      <span className="cursor-pointer">
                        <span>{item.damage.damageDice}</span>
                        <span> </span>
                        <span
                          onClick={() =>
                            showTipDamageType(item.damage.damageType.index)
                          }
                        >
                          {item.damage.damageType.name}
                        </span>
                      </span>
                    </>
                  )}
                  {!item.damage && (
                    <span>No damages defined, look at the description</span>
                  )}
                </>
              )}

              {item.isArmor && (
                <>
                  <span>{item.armorCategory} - </span>
                  <span>
                    AC {item.armorClass.base}{" "}
                    {item.stealthDisadvantage && (
                      <span> - Stealth disadvantage</span>
                    )}
                  </span>
                </>
              )}

              {item.isMountAndVehicules && (
                <>
                  <span>{item.vehicleCategory} </span>
                  {item.speed && (
                    <span>
                      {" "}
                      - {item.speed.quantity} {item.speed.unit}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* <p className="pr-2 text-sm">{tr(item.resume)}</p> */}
      </div>
    </div>
  );
}

function Category({ category }) {
  const { tr } = useI18n();

  return (
    <div className="relative">
      <div
        className={`sticky top-8 z-20 flex items-center bg-slate-50/90 px-4 py-3 
			text-sm font-semibold text-slate-900 ring-1 
			ring-slate-900/10 backdrop-blur-sm dark:bg-slate-700/90 dark:text-slate-200 dark:ring-black/10`}
      >
        {tr(category.nameLocalized)}
      </div>
      <div className="select-none px-4 py-2">
        {category.equipment.map((item) => (
          <ItemRow key={`${category.index}_${item.index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Equipments() {
  const { equipmentCategories } = useLoaderData<typeof loader>();

	// TODO: useMemo
  const equipmentList = uniqBy(
    equipmentCategories
      .map((equipmentCategory) => equipmentCategory.equipment)
      .flat(),
    (item) => item.index
  );

  const {
    searchHistory,
    searchResults,
    search,
    term,
    onRemoveHistoryQuery,
    // reset
  } = useLocalSearch("equipment", {
    data: equipmentList,
    options: useLocalSearch.searchOptions.equipment,
  });

  return (
    <Screen
      title={"Équipements"}
      // titleIcon={<IconScale className="w-6 h-6" />}
      root
      withBottomSpace
    >
      <>
        <InputSearch
          className="px-4"
          searchHistory={searchHistory}
          term={term}
          onChange={search}
          onRemoveHistoryQuery={onRemoveHistoryQuery}
        />
        {searchResults && term ? (
          <div className="mx-4 mt-2 mb-4 select-none">
            {searchResults.map((searchResult) => (
              <ItemRow key={searchResult.refIndex} item={searchResult.item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col" data-cy-id="equipments-list">
            {equipmentCategories.map((category) => (
              <Category key={category.index} category={category} />
            ))}
            {/* <Group title="Armes" items={grouped.weapon} />
				<Group title="Armure" items={grouped.armor} />
				<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
				<Group title="Outils" items={grouped.tools} />
				<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} /> */}
          </div>
        )}
      </>
    </Screen>
  );
}
