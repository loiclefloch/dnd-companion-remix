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
import { CurrentCharacterProvider } from "./components/useCurrentCharacter";
import clsx from "clsx";
import { CharacterMenuProvider } from "./components/characterMenu/CharacterMenuContext";
import { ModalProvider } from "./components/modal/modalContext";
import { ScreenAsModalProvider } from "./components/screenAsModal/useScreenAsModal";
import { SidebarMenuProvider } from "./components/sidebarMenu/sidebarMenuContext";
import { CreateCharacterProvider } from "~/components/useCreateCharacter"
import type { ReactNode } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

function Document({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx("//dark bg-app", {
        debug: false,
      })}
    >
      <CurrentCharacterProvider>
        <ModalProvider>
          <SidebarMenuProvider>
            <ScreenAsModalProvider>
              <CharacterMenuProvider>
                <CreateCharacterProvider>{children}</CreateCharacterProvider>
              </CharacterMenuProvider>
            </ScreenAsModalProvider>
          </SidebarMenuProvider>
        </ModalProvider>
      </CurrentCharacterProvider>

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
