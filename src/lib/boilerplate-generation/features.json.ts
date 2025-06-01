import { FeatureConfig } from "./types";

export const featuresList: FeatureConfig[] = [
  {
    name: "template",
    components: {
      rendering: [
        {
          name: "sampleProject",
          option: {
            renderAsList: true,
          },
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
    // zodSchemas: [
    //   "createTemplateInput",
    //   "updateTemplateInput",
    //   "deleteTemplateInput",
    //   "createProjectFromTemplateInput",
    // ],
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
    // pages: [
    //   "/templates", // list all templates
    //   "/templates/[id]", // read , update , delete a particular template , create a project from template
    // ],
    pages: {
      resourceName: "templates",
      options: [
        { type: "list", isEditableView: false },
        { type: "detail", isEditableView: true },
      ],
    },
  },
];

