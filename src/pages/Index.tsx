import { useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CatalogTechPage from "@/pages/CatalogTechPage";
import CatalogEquipmentPage from "@/pages/CatalogEquipmentPage";
import MetalworkPage from "@/pages/MetalworkPage";
import EngineeringPage from "@/pages/EngineeringPage";
import ContactsPage from "@/pages/ContactsPage";
import AdminImportPage from "@/pages/AdminImportPage";

type Page = "home" | "about" | "catalog-tech" | "catalog-equipment" | "metalwork" | "engineering" | "contacts" | "admin-import";

const PAGE_MAP: Record<Page, (props: { onNavigate: (p: string) => void }) => JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  "catalog-tech": CatalogTechPage,
  "catalog-equipment": CatalogEquipmentPage,
  metalwork: MetalworkPage,
  engineering: EngineeringPage,
  contacts: ContactsPage,
  "admin-import": AdminImportPage,
};

const Index = () => {
  const [activePage, setActivePage] = useState<Page>("home");

  const handleNavigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent = PAGE_MAP[activePage] ?? PAGE_MAP["home"];

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <PageComponent onNavigate={handleNavigate} />
    </Layout>
  );
};

export default Index;