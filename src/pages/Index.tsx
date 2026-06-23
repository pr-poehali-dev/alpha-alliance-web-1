import { useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CatalogTechPage from "@/pages/CatalogTechPage";
import CatalogEquipmentPage from "@/pages/CatalogEquipmentPage";
import EquipmentGroupsPage from "@/pages/EquipmentGroupsPage";
import EquipmentGroupDetailPage from "@/pages/EquipmentGroupDetailPage";
import MetalworkPage from "@/pages/MetalworkPage";
import EngineeringPage from "@/pages/EngineeringPage";
import ContactsPage from "@/pages/ContactsPage";
import AdminImportPage from "@/pages/AdminImportPage";

const EQUIPMENT_GROUP_IDS = [
  "jacks", "pumps", "pullers", "presses", "cutting",
  "threading", "benders", "rescue", "special", "riklin",
];

type Page =
  | "home"
  | "about"
  | "catalog-tech"
  | "catalog-equipment"
  | "equipment-groups"
  | "metalwork"
  | "engineering"
  | "contacts"
  | "admin-import"
  | `equipment-group-${string}`;

interface PageProps {
  onNavigate: (p: string) => void;
}

const PAGE_MAP: Record<string, (props: PageProps) => JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  "catalog-tech": CatalogTechPage,
  "catalog-equipment": CatalogEquipmentPage,
  "equipment-groups": EquipmentGroupsPage,
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

  const isGroupDetail = activePage.startsWith("equipment-group-");
  const groupId = isGroupDetail ? activePage.replace("equipment-group-", "") : "";
  const isValidGroup = EQUIPMENT_GROUP_IDS.includes(groupId);

  if (isGroupDetail && isValidGroup) {
    return (
      <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
        <EquipmentGroupDetailPage groupId={groupId} onNavigate={handleNavigate} />
      </Layout>
    );
  }

  const PageComponent = PAGE_MAP[activePage] ?? PAGE_MAP["home"];

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <PageComponent onNavigate={handleNavigate} />
    </Layout>
  );
};

export default Index;
