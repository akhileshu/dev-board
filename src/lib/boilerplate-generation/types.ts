/*
export interface FeatureConfig {
  name: string;
  components: string[];
  apiRoutes?: string[];
  serverActions: string[];
  dbModel: string[];
  zodSchemas: string[];
  hooks: string[];
  types: string[];
  store: string;
  utils: string[];
  constants: string[];
  messages: string[];
  pages: string[];
}
*/

import { Answers } from "inquirer";

export type RenderingComponentConfig = {
  name: string;
  option?: {
    generateTestFile?: boolean;
    isEditableView?: boolean;
    renderAsList?: boolean; // true = render list (of detail cards), false/undefined = render detail card
  };
};
export type ComponentConfig = {
  name: string;
  option?: {
    generateTestFile?: boolean;
  };
};

export type FormType = "create" | "edit" | "delete";
export type zodSchemaType = FormType;
export type UIType = "table" | "modal";
export const formTypes: FormType[] = ["create", "edit", "delete"];
export const uiTypes: UIType[] = ["table", "modal"];

type FeatureComponents = {
  rendering?: RenderingComponentConfig[];
  forms?: Partial<Record<FormType, ComponentConfig[]>>;
  ui?: Partial<Record<UIType, ComponentConfig[]>>;
};

export type pageResourceType =
  | "list" /* /templates */
  | "detail" /* /templates/id */;

export type CRUDOperation = "create" | "read" | "update" | "delete";
export interface FeatureConfig {
  name: string;
  // components?: string[];
  components?: FeatureComponents;
  apiRoutes?: string[];
  pages?: {
    resourceName: string; //"templates"
    resourceTypes: pageResourceType[];
  };
  serverActions?: {
    generateCRUD?: boolean;
    custom: {
      operation: CRUDOperation;
      name: string;
    }[];
  };
  prismaSchemas?: string[];
  // zodSchemas?: string[];
  zodSchemas?: {
    resourceName: string;
    type: zodSchemaType[];
  }[];
  hooks?: string[];
  types?: string[];
  utils?: string[];
  constants?: string[];

  store?: string;
  messages?: string[];

  services?: string[];
  permissions?: string[];
  layouts?: string[];
  providers?: string[];
  tests?: {
    components?: string[];
    api?: string[];
    utils?: string[];
  };
  mockData?: string[];
  env?: string[];
  readme?: boolean;
}

export interface PlopData extends Answers {
  featureName: string;
  partsToGenerate?: string[];
}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const exampleFeaturesList: FeatureConfig[] = [
//   {
//     name: "video",
//     components: {
//       rendering: [
//         {
//           name: "video",
//           option: {
//             generateTestFile: true,
//             isEditableView: true,
//             renderAsList: false,
//           },
//         },
//         {
//           name: "videoPlaylist",
//           option: {
//             isEditableView: true,
//             generateTestFile: false,
//             renderAsList: true,
//           },
//         },
//       ],
//       forms: {
//         create: [
//           {
//             name: "video",
//             option: {
//               generateTestFile: true,
//             },
//           },
//           {
//             name: "videoPlaylist",
//             option: {
//               generateTestFile: false,
//             },
//           },
//         ],
//         edit: [
//           {
//             name: "video",
//             option: {
//               generateTestFile: true,
//             },
//           },
//         ],
//         delete: [
//           {
//             name: "videoPlaylist",
//             option: {
//               generateTestFile: false,
//             },
//           },
//         ],
//       },
//       ui: {
//         table: [
//           {
//             name: "videoTable",
//             option: {
//               generateTestFile: true,
//             },
//           },
//         ],
//         modal: [
//           {
//             name: "confirmDeleteVideo",
//             option: {
//               generateTestFile: false,
//             },
//           },
//         ],
//       },
//     },
//     serverActions: {
//       generateCRUD: true,
//       custom: [
//         { operation: "read", name: "getTrendingPlaylists" },
//         { operation: "create", name: "clonePlaylist" },
//       ],
//     },
//     prismaSchemas: ["Video", "VideoPlaylist"],
//     zodSchemas: ["video", "videoInput"],
//     hooks: ["uploadVideo", "processStatus"],
//     types: ["Video"],
//     utils: ["formatDuration", "getThumbnail"],
//     constants: ["videoStatus"],
//     // pages: ["/video/[id]", "/video/upload", "/video/(analytics)"],

//     /*
//     // below fields are still not generated and tested
//     apiRoutes: ["upload", "process", "get", "delete"],
//     store: "useVideoStore",
//     messages: ["ADD_SUCCESS", "ADD_ERROR", "REMOVE_SUCCESS"],
//     services: ["videoService"], // e.g., for encapsulating business logic
//     permissions: ["canUploadVideo", "canDeleteVideo"], // access control layer
//     layouts: ["VideoLayout"], // for shared page layout (Next.js)
//     providers: ["VideoProvider"], // context/provider (React Context API)
//     tests: {
//       // todo : can add an option field to generate test files with individual sections like components , serveractions , etc
//       components: ["VideoUploadForm.test.tsx"],
//       api: ["upload.test.ts"],
//       utils: ["formatDuration.test.ts"],
//     },
//     mockData: ["mockVideoData.ts"], // useful for testing/demo
//     env: ["VIDEO_UPLOAD_URL", "MAX_VIDEO_SIZE_MB"], // env var template entries
//     readme: true, // optionally generate a README.md per feature
//     */
//   },
// ];

// // todo : currently i am skipping all tests - boilerplate generation , will review later
