import { ActionType } from "plop";
import {
  ComponentConfig,
  ComponentKind,
  FormAction,
  PageType,
  RenderType,
} from "../../types/component-config";
import { templatePaths } from "../template-paths";
import { targetPaths } from "../target-paths";
import { stringHelpers } from "../helpers";
import { FeatureConfig } from "../../types/types";

export const GenerateActionsForFeatureComponents = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  if (!feature.components?.length) return;

  feature.components.forEach((componentConfig) => {
    switch (componentConfig.kind) {
      case ComponentKind.Page:
        addPage(componentConfig, feature, actions);
        break;
      case ComponentKind.ComponentRender:
        addComponentRender(componentConfig, feature, actions);
        break;
      case ComponentKind.ComponentForm:
        addComponentForm(componentConfig, feature, actions);
        break;
    }
  });
};

function addPage(
  config: Extract<ComponentConfig, { kind: ComponentKind.Page }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, restResource, pages, forms } = config;

  pages.forEach((pageType: PageType) => {
    const isList = pageType === "list";
    const pageSegment = isList ? "" : "[id]";
    const pagePath = targetPaths.components.page(
      `${restResource}/${pageSegment}`
    );
    const viewPath = targetPaths.components.view(
      { featureName: feature.name, componentName: name },
      isList
    );

    actions.push({
      type: "add",
      path: pagePath,
      templateFile: templatePaths.components.page,
      data: { name },
    });

    actions.push({
      type: "add",
      path: viewPath,
      templateFile: templatePaths.components.view(isList),
      data: { name, renderAsList: isList },
    });
  });

  forms?.forEach((formType: FormAction) =>
    addComponentForm(
      { name, kind: ComponentKind.ComponentForm, forms: [formType] },
      feature,
      actions
    )
  );
}

function addComponentRender(
  config: Extract<ComponentConfig, { kind: ComponentKind.ComponentRender }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, renderTypes } = config;

  renderTypes.forEach((renderType: RenderType) => {
    const isList = renderType === "list";

    actions.push({
      type: "add",
      path: targetPaths.components.view(
        { featureName: feature.name, componentName: name },
        isList
      ),
      templateFile: templatePaths.components.view(isList),
      data: { name, renderAsList: isList },
    });
  });
}

function addComponentForm(
  config: Extract<ComponentConfig, { kind: ComponentKind.ComponentForm }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, forms } = config;

  forms.forEach((formType: FormAction) => {
    actions.push({
      type: "add",
      path: targetPaths.components.form(
        { featureName: feature.name, componentName: name },
        formType
      ),
      templateFile: getTemplateFilePath(
        `form${stringHelpers.toPascalCase(formType)}`
      ),
      data: { name },
    });
  });
}

function getTemplateFilePath(key: string): string {
  const templateFilePath =
    templatePaths.components[key as keyof typeof templatePaths.components];
  if (!templateFilePath) {
    throw new Error(
      `Template file for key "${key}" not found in templatePaths.components`
    );
  }
  return templateFilePath as string;
}
