"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";

import { EditableCard } from "@/lib/form-and-inputs/editable-card";
import { EditTemplateForm } from "./edit-template-form";
import { Template } from "@prisma/client";


type TemplateDetailViewProps = {
  className?: string;
  templateResult: Awaited<ReturnType<typeof templateActions.getById>>;
};

export function TemplateDetailView({
  templateResult,
  className,
}: TemplateDetailViewProps) {
  const cardTitle = "Template";

  const statusMessage = renderStatusMessage(templateResult, cardTitle);
  if (statusMessage || !templateResult.ok) return statusMessage;

  const { data } = templateResult;


  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <EditableCard
          key={data.id}
          title="Template"
          className={className}
          editForm={<EditTemplateForm template={data} />}
          renderComponent={<RenderTemplate template={data} />}
        />
    </AppCard>
  );
}

type RenderTemplateProps = {
  template:Template;
};

function RenderTemplate({ template }: RenderTemplateProps) {
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