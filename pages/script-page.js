import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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
    <div>
      <h1>Hello this is Script Page</h1>
      <button
        type="submit"
        onClick={() => {
          createScripts({
            variables: {
              input: {
                src: "https://dry-husky-69.loca.lt/test-script.js",
                displayScope: "ALL",
              },
            },
          });
        }}
      >
        Create Script Tag
      </button>
      <button
        type="submit"
        onClick={() => {
          deleteScript({
            variables: {
              id: "gid://shopify/ScriptTag/172657377432",
            },
          });
        }}
      >
        Delete Script Tag
      </button>

      {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ScriptPage;
