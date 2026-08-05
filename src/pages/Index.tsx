import { useState, lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import { DIRECTIONS } from "@/data/equipment";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const CatalogTechPage = lazy(() => import("@/pages/CatalogTechPage"));
const CatalogEquipmentPage = lazy(() => import("@/pages/CatalogEquipmentPage"));
const EquipmentGroupsPage = lazy(() => import("@/pages/EquipmentGroupsPage"));
const EquipmentDirectionPage = lazy(() => import("@/pages/EquipmentDirectionPage"));
const EquipmentGroupDetailPage = lazy(() => import("@/pages/EquipmentGroupDetailPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const MetalworkPage = lazy(() => import("@/pages/MetalworkPage"));
const EngineeringPage = lazy(() => import("@/pages/EngineeringPage"));
const ContactsPage = lazy(() => import("@/pages/ContactsPage"));
const AdminImportPage = lazy(() => import("@/pages/AdminImportPage"));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
    Загрузка...
  </div>
);

const DIRECTION_IDS = DIRECTIONS.map((d) => d.id);
const GROUP_IDS = DIRECTIONS.flatMap((d) => d.groups.map((g) => g.id));

interface PageProps {
  onNavigate: (p: string) => void;
}

const PAGE_MAP: Record<string, React.ComponentType<PageProps>> = {
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
          <Suspense fallback={<PageFallback />}>
            <EquipmentDirectionPage directionId={dirId} onNavigate={handleNavigate} />
          </Suspense>
        </Layout>
      );
    }
  }

  // Product page: product-{id}
  if (activePage.startsWith("product-")) {
    const productId = activePage.replace("product-", "");
    return (
      <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
        <Suspense fallback={<PageFallback />}>
          <ProductPage productId={productId} onNavigate={handleNavigate} />
        </Suspense>
      </Layout>
    );
  }

  // Equipment group detail page: equipment-group-{id}
  if (activePage.startsWith("equipment-group-")) {
    const groupId = activePage.replace("equipment-group-", "");
    if (GROUP_IDS.includes(groupId)) {
      return (
        <Layout activePage="equipment-groups" onNavigate={handleNavigate}>
          <Suspense fallback={<PageFallback />}>
            <EquipmentGroupDetailPage groupId={groupId} onNavigate={handleNavigate} />
          </Suspense>
        </Layout>
      );
    }
  }

  const PageComponent = PAGE_MAP[activePage] ?? PAGE_MAP["home"];

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <Suspense fallback={<PageFallback />}>
        <PageComponent onNavigate={handleNavigate} />
      </Suspense>
    </Layout>
  );
};

export default Index;