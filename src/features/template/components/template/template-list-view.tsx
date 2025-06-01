"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";

import { useEditToggle } from "@/lib/forms-inputs/utils";
import { Button } from "@/lib/forms-inputs/button";
import { EditTemplateForm } from "./edit-template-form";
import { Template } from "@prisma/client";

/*
type TemplateDetailCardProps = {
  className?: string;
  templateResult: Awaited<ReturnType<typeof templateActions.getById>>;
};

export function TemplateDetailCard({
  templateResult,
  className,
}: TemplateDetailCardProps) {
  const cardTitle = "Template";

  const { editing, startEditing, cancelEditing } = useEditToggle();
  const statusMessage = renderStatusMessage(templateResult, cardTitle);
  if (statusMessage || !templateResult.ok) return statusMessage;

  const { data } = templateResult;


  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      {editing ? (
        <EditTemplateForm template={data} onCancel={cancelEditing} />
      ) : (
        <>
          <Button disabled={editing} onClick={startEditing}>Edit</Button>
          <RenderTemplate template={data} />
        </>
      )}
    </AppCard>
  );
}
*/

type TemplateOverviewCardProps = {
  className?: string;
  template: Template;
};

export function TemplateOverviewCard({
  template,
  className,
}: TemplateOverviewCardProps) {
  const cardTitle = "template";

  const { editing, startEditing, cancelEditing } = useEditToggle();

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      {editing ? (
        //<EditTemplateForm template={data} onCancel={cancelEditing} />
        <></>
      ) : (
        <>
          <Button disabled={editing} onClick={startEditing}>
            Edit
          </Button>
          <RenderTemplate template={template} />
        </>
      )}
    </AppCard>
  );
}

type RenderTemplateProps = {
  template: Template;
};

export function RenderTemplate({ template }: RenderTemplateProps) {
  return (
    <div className="space-y-2 text-sm">
      <div>
        <strong>Type:</strong> {template.type}
      </div>
      {template.description && (
        <div>
          <strong>Description:</strong> {template.description}
        </div>
      )}
      {template.guide && (
        <div>
          <strong>Guide:</strong>{" "}
          <a
            href={template.guide}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Guide
          </a>
        </div>
      )}
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <strong className="w-full">Tags:</strong>
          {template.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      <div>
        <strong>Created:</strong> {template.createdAt.toLocaleDateString()}
      </div>
      <div>
        <strong>Updated:</strong> {template.updatedAt.toLocaleDateString()}
      </div>
    </div>
  );
}

type TemplateListViewProps = {
  className?: string;
  templatesResult: Awaited<ReturnType<typeof templateActions.getAll>>;
};

export function TemplateListView({
  templatesResult,
  className,
}: TemplateListViewProps) {
  const cardTitle = "Template List";

  const statusMessage = renderStatusMessage(templatesResult, cardTitle);
  if (statusMessage || !templatesResult.ok) return statusMessage;

  const { data } = templatesResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      {data.map((item) => (
        <TemplateOverviewCard key={item.id} template={item} />
      ))}
    </AppCard>
  );
}
