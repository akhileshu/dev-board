import { FeatureConfig } from "./types";

export const featuresList: FeatureConfig[] = [
  {
    name: "template",
    components: {
      rendering: [
        {
          name: "sampleProject",
          isEditable: false,
          isPage: false,
          type: "list",
        },
        {
          name: "template",
          restResourceName: "templates",
          isEditable: false,
          isPage: true,
          type: "list",
        },
        {
          name: "template",
          restResourceName: "templates",
          isEditable: true,
          isPage: true,
          type: "detail",
        },
      ],
      forms: {
        create: [
          {
            name: "template",
          },
          {
            name: "projectFromTemplate",
          },
        ],
        edit: [
          {
            name: "template",
          },
        ],
        delete: [
          {
            name: "template",
          },
        ],
      },
    },
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "getTemplateSampleProjects" },
        { operation: "create", name: "createProjectFromTemplate" },
      ],
    },

    zodSchemas: [
      {
        resourceName: "template",
        type: ["create", "delete", "edit"],
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

