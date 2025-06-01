import { ActionType } from "plop";
import { FeatureConfig } from "../../types";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForFeaturePages = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  const { pages } = feature;
  pages?.options?.forEach((option) => {
    const pageFileNamePattern = `${pages.resourceName}/${
      option.type === "list" ? "" : option.type === "detail" ? "[id]" : "" // fallback for unknown types
    }`;

    actions.push({
      type: "add",
      path: targetPaths.routes.page(pageFileNamePattern),
      templateFile: templatePaths.routes.page,
      data: {
        renderAsList: option.type === "list",
        name: feature.name,
      },
    });
    // supporting components for page routes
    actions.push({
      type: "add",
      path: targetPaths.components.view(
        {
          featureName: feature.name,
          componentName: feature.name,
        },
        option.type === "list"
      ),
      templateFile: templatePaths.components.view(option.type === "list"),
      data: {
        name: feature.name,
        isEditableView: option.isEditableView,
        renderAsList: option.type === "list",
      },
    });
  });
};

// todo : review e2e tests generation
// actions.push({
//   type: "add",
//   path: `cypress/e2e/${feature.name}/${pageName}.cy.ts`,
//   templateFile: templatePaths.e2e, // define this in your template config
//   data: {
//     featureName: feature.name,
//     pageUrl: page,
//     testName: pageName,
//   },
// });
