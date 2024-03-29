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
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "~/services/session.server";
import clsx from "clsx";
import { CharacterMenuProvider } from "./components/characterMenu/CharacterMenuContext";
import { ModalProvider } from "./components/modal/modalContext";
import { ScreenAsModalProvider } from "./components/screenAsModal/useScreenAsModal";
import { SidebarMenuProvider } from "./components/sidebarMenu/sidebarMenuContext";
import type { ReactNode } from "react";
import type { UserDto } from "./dtos/User.dto";
import { getCurrentCharacter } from '~/services/currentcharacter.server';
import { formatCharacter } from "./mappers/character.mapper";
import type { CharacterDto } from "./dtos/character.dto";

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
  currentCharacter?: CharacterDto;
}

export async function loader({ request }: LoaderArgs) {
  const currentCharacterApiObject = await getCurrentCharacter()

  return json({
    user: await getUser(request),
    currentCharacter: currentCharacterApiObject ? formatCharacter(currentCharacterApiObject) : null,
  });
}

function Document({ children }: { children: ReactNode }) {
  return (
    <>
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
    </>
  );
}

export default function App() {
  // TODO: allow choose theme on settings
  const theme = "light";

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={clsx("bg-app", "h-full", theme)}>
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
