import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import ResourceListWithProducts from "../components/ResourceList";
import { TitleBar } from "@shopify/app-bridge-react";
import axios from "axios";

const img =
  "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png";
function Index() {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    console.log(idsFromResources);
    store.set("ids", idsFromResources);

    const selectedProducts = resources.selection;

    deleteApiData();

    selectedProducts.map((product) => makeApiCall(product));
  };

  function deleteApiData() {
    const url = "/api/products";
    axios.delete(url);
  }

  async function makeApiCall(product) {
    const url = "/api/products";
    axios
      .post(url, product)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  return (
    <Page fullWidth>
      <TitleBar
        title="Test App"
        primaryAction={{
          content: "Select products",
          onAction: () => setModal({ open: true }),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setModal({ open: false })}
      ></ResourcePicker>
      {emptyState ? (
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
      ) : (
        <ResourceListWithProducts />
      )}
    </Page>
  );
}

export default Index;
