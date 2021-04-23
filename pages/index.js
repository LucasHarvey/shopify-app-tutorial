import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const img =
  "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png";
function Index() {
  const [modal, setModal] = useState({ open: false });
  return (
    <Page fullWidth>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
      ></ResourcePicker>
      <Layout>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: "Select products",
            onAction: () => setModal({ open: true }),
          }}
          image={img}
        >
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
      </Layout>
    </Page>
  );
}

export default Index;
