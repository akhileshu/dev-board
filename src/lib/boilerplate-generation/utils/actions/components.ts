import { ActionType } from "plop";
import {
  ComponentConfig,
  FeatureConfig,
  FormType,
  formTypes,
  RenderingComponentConfig,
  UIType,
  uiTypes,
} from "../../types";
import { templatePaths } from "../template-paths";
import { targetPaths } from "../target-paths";
import { stringHelpers } from "../helpers";

export const GenerateActionsForFeatureComponents = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  if (!feature.components) return;

  const { rendering, forms, ui } = feature.components;

  rendering?.forEach((ComponentConfig) =>
    addRendering(ComponentConfig, feature, actions)
  );
  formTypes.forEach((formType) =>
    forms?.[formType]?.forEach((ComponentConfig) =>
      addForm(ComponentConfig, formType, feature, actions)
    )
  );
  uiTypes.forEach((uiType) =>
    ui?.[uiType]?.forEach((comp) => addUI(comp, uiType, feature, actions))
  );
};

function addRendering(
  config: RenderingComponentConfig,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { isPage, name, type, isEditable, restResourceName } = config;

  const isList = type === "list";
  const isDetail = type === "detail";

  const data = {
    name,
    isEditableView: isEditable,
    renderAsList: isList,
  };

  function addAction(path: string,templateFile: string) {
    actions.push({
      type: "add",
      path,
      templateFile,
      data,
    });
  }

  const componentTargetPath = targetPaths.components.view(
    { featureName: feature.name, componentName: name },
    isList
  );
  const componentTemplatePath = templatePaths.components.view(isList);
  const pageTemplatePath = templatePaths.components.page;
  let pageTargetPath: string;

  if (isPage) {
    const pageSegment = isList ? "" : isDetail ? "[id]" : ""; // fallback handled
    const pagePathSegment = `${restResourceName ?? name}/${pageSegment}`;
    pageTargetPath = targetPaths.components.page(pagePathSegment);

    // Add page route file
    addAction(pageTargetPath, pageTemplatePath);

    // Add supporting component
    addAction(componentTargetPath, componentTemplatePath);
  } else {
    // Component only
    addAction(componentTargetPath, componentTemplatePath);
  }
}


function addForm(
  formComponentConfig: ComponentConfig,
  formType: FormType,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const data = { name: formComponentConfig.name };

  actions.push({
    type: "add",
    path: targetPaths.components.form(
      { featureName: feature.name, componentName: formComponentConfig.name },
      formType
    ),
    templateFile: getTemplateFilePath(
      `form${stringHelpers.toPascalCase(formType)}`
    ),
    data,
  });
}

function addUI(
  UIComponentConfig: ComponentConfig,
  uiType: UIType,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const data = { name: UIComponentConfig.name };

  actions.push({
    type: "add",
    path: targetPaths.components.ui(
      { featureName: feature.name, componentName: UIComponentConfig.name },
      uiType
    ),
    templateFile: getTemplateFilePath(
      `ui${stringHelpers.toPascalCase(uiType)}`
    ),
    data,
  });
}

function getTemplateFilePath(key: string) {
  const templateFilePath =
    templatePaths.components[key as keyof typeof templatePaths.components];
  if (!templateFilePath) {
    throw new Error(
      `Template file for key "${key}" not found in templatePaths.components`
    );
  }
  return templateFilePath;
}

