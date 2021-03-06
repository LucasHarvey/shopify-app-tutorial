import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Layout,
  Page,
  ResourceList,
  Stack,
} from "@shopify/polaris";

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation ScriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

function ScriptPage() {
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScript] = useMutation(DELETE_SCRIPTTAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Active Script Tags:" sectioned>
            <p>Create or delete script tag</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Create Tag" sectioned>
            <Button
              primary
              size="slim"
              type="submit"
              onClick={() => {
                createScripts({
                  variables: {
                    input: {
                      src: "https://green-otter-14.loca.lt/test-script.js",
                      displayScope: "ALL",
                    },
                  },
                  refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                });
              }}
            >
              Create Script Tag
            </Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Script", plural: "Scripts" }}
              items={data.scriptTags.edges}
              renderItem={(item) => {
                return (
                  <ResourceList.Item id={item.id}>
                    <Stack>
                      <Stack.Item>
                        <p>{item.node.id}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          type="submit"
                          onClick={() => {
                            deleteScript({
                              variables: {
                                id: item.node.id,
                              },
                              refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                            });
                          }}
                        >
                          Delete Script Tag
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            ></ResourceList>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ScriptPage;
