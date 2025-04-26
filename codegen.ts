
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "graphql",
        importTypesNamespace: "gql",
        importTypesFrom: "../gql/types.ts",
        typesPath: "../gql/types.ts",
        importDocumentNodeExternallyFrom: "near-operation-file",
      }
    }
  }
};

export default config;
