import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ContactDock } from "./ContactDock";
import { IntroLoader } from "./experience/IntroLoader";
import { useEffect, useState } from "react";

export function Layout() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("is-3d");
    return () => document.documentElement.classList.remove("is-3d");
  }, []);

  return (
    <>
      {intro ? <IntroLoader onDone={() => setIntro(false)} /> : null}
      <Header />
      <main className="scene-main">
        <Outlet />
      </main>
      <ContactDock />
    </>
  );
}
