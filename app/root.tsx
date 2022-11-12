import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import skills from '~/database/data/skills.json'
import spells from '~/database/data/spells.json'
import subclasses from '~/database/data/subclasses.json'
import classes from '~/database/data/classes'
import backgrounds from '~/database/data/backgrounds'
import equipment from "~/database/data/equipment.json"
import features from "~/database/data/features"
import magicSchools from '~/database/data/magic-schools.json'
import magicItems from "~/database/data/magic-items.json"
import feats from '~/database/data/feats'
import allRaces from '~/database/data/allRaces'
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "~/services/session.server";
import clsx from "clsx";
import { CharacterMenuProvider } from "./components/characterMenu/CharacterMenuContext";
import { ModalProvider } from "./components/modal/modalContext";
import { ScreenAsModalProvider } from "./components/screenAsModal/useScreenAsModal";
import { SidebarMenuProvider } from "./components/sidebarMenu/sidebarMenuContext";
import { CreateCharacterProvider } from "~/components/useCreateCharacter"
import type { ReactNode } from "react";
import type { UserDto } from "./dtos/User.dto";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Dnd companion",
  viewport: "width=device-width,initial-scale=1",
});

export interface RootLoaderData {
  user: UserDto;
  characters: CharacterDto[]; // TODO: remix
}

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
    subclasses,
    // TODO: add more backgrounds
    backgrounds,
    classes,
    equipment,
    feats,
    features,
    magicItems,
    magicSchools,
    allRaces,
    skills,
    spells,
    currentCharacter: null,//formatCharacter({})
    currentRawCharacter: null,
  });
}

function Document({ children }: { children: ReactNode }) {
  // TODO: allow choose theme on settings
  const theme = "light";

  return (
    <div
      className={clsx("bg-app", theme, {
        debug: false,
      })}
    >
      <ModalProvider>
        <SidebarMenuProvider>
          <ScreenAsModalProvider>
            <CharacterMenuProvider>
              {children}
            </CharacterMenuProvider>
          </ScreenAsModalProvider>
        </SidebarMenuProvider>
      </ModalProvider>

      <div id="modal-root" />
    </div>
  );
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Document>
          <Outlet />
        </Document>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}
