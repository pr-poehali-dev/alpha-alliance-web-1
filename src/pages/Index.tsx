import { useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import CatalogTechPage from "@/pages/CatalogTechPage";
import CatalogEquipmentPage from "@/pages/CatalogEquipmentPage";
import EquipmentGroupsPage from "@/pages/EquipmentGroupsPage";
import EquipmentDirectionPage from "@/pages/EquipmentDirectionPage";
import EquipmentGroupDetailPage from "@/pages/EquipmentGroupDetailPage";
import ProductPage from "@/pages/ProductPage";
import MetalworkPage from "@/pages/MetalworkPage";
import EngineeringPage from "@/pages/EngineeringPage";
import ContactsPage from "@/pages/ContactsPage";
import AdminImportPage from "@/pages/AdminImportPage";
import { DIRECTIONS } from "@/data/equipment";

const DIRECTION_IDS = DIRECTIONS.map((d) => d.id);
const GROUP_IDS = DIRECTIONS.flatMap((d) => d.groups.map((g) => g.id));

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
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Equipment direction page: equipment-direction-{id}
  if (activePage.startsWith("equipment-direction-")) {
    const dirId = activePage.replace("equipment-direction-", "");
    if (DIRECTION_IDS.includes(dirId)) {
      return (
        <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
          <EquipmentDirectionPage directionId={dirId} onNavigate={handleNavigate} />
        </Layout>
      );
    }
  }

  // Product page: product-{id}
  if (activePage.startsWith("product-")) {
    const productId = activePage.replace("product-", "");
    return (
      <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
        <ProductPage productId={productId} onNavigate={handleNavigate} />
      </Layout>
    );
  }

  // Equipment group detail page: equipment-group-{id}
  if (activePage.startsWith("equipment-group-")) {
    const groupId = activePage.replace("equipment-group-", "");
    if (GROUP_IDS.includes(groupId)) {
      return (
        <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
          <EquipmentGroupDetailPage groupId={groupId} onNavigate={handleNavigate} />
        </Layout>
      );
    }
  }

  const PageComponent = PAGE_MAP[activePage] ?? PAGE_MAP["home"];

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <PageComponent onNavigate={handleNavigate} />
    </Layout>
  );
};

export default Index;