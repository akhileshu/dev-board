"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";



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
      <RenderTemplate template={data} />
    </AppCard>
  );
}

type RenderTemplateProps = {
  template:unknown;
};

function RenderTemplate({ template }: RenderTemplateProps) {
  return (
   <div>edit this component to display details of Template</div>
  );
}