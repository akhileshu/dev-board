import { ActionType } from "plop";
import { FeatureConfig } from "../../types";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForFeaturePages = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  const { pages } = feature;
  pages?.resourceTypes?.forEach((pageResourceType) => {
    const pageFileNamePattern = `${pages.resourceName}/${
      pageResourceType === "list"
        ? ""
        : pageResourceType === "detail"
        ? "[id]"
        : "" // this case is unhandled
    }`;
    actions.push({
      type: "add",
      path: targetPaths.routes.page(pageFileNamePattern),
      templateFile: templatePaths.routes.page,
      data: {
        renderAsList: pageResourceType === "list",
        name: feature.name,
      },
    });

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
  });
};
