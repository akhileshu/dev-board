import { ComponentKind } from "./types/component-config";
import { FeatureConfig } from "./types/types";

export const featuresList: FeatureConfig[] = [
  {
    name: "template",
    // components: {
    //   rendering: [
    //     {
    //       name: "sampleProject",
    //       isEditable: false,
    //       isPage: false,
    //       type: "list",
    //     },
    //     {
    //       name: "template",
    //       restResourceName: "templates",
    //       isEditable: false,
    //       isPage: true,
    //       type: "list",
    //     },
    //     {
    //       name: "template",
    //       restResourceName: "templates",
    //       isEditable: true,
    //       isPage: true,
    //       type: "detail",
    //     },
    //   ],
    //   forms: {
    //     create: [
    //       {
    //         name: "template",
    //       },
    //       {
    //         name: "projectFromTemplate",
    //       },
    //     ],
    //     edit: [
    //       {
    //         name: "template",
    //       },
    //     ],
    //     delete: [
    //       {
    //         name: "template",
    //       },
    //     ],
    //   },
    // },

    components: [
      {
        name: "template",
        restResource: "templates",
        kind: ComponentKind.Page,
        pages: ["detail", "list"],
        forms: ["create", "edit", "delete"],
      },
      {
        name: "projectFromTemplate",
        kind: ComponentKind.ComponentForm,
        forms: ["create"],
      },
      {
        name: "sampleProject",
        kind: ComponentKind.ComponentRender,
        renderTypes: ["list"],
      },
    ],
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "TemplateSampleProjects" },
        { operation: "create", name: "ProjectFromTemplate" },
      ],
    },

    zodSchemas: [
      {
        resourceName: "template",
        type: ["create", "delete", "update"],
      },
      {
        resourceName: "ProjectFromTemplate",
        type: ["create"],
      },
    ],
    types: ["template", "projectFromTemplate"],
    constants: ["template", "projectFromTemplate"],
  },
];
