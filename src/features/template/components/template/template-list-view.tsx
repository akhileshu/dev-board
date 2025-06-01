"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { cn } from "@/lib/utils";
import { templateActions } from "../../actions";
import Link from "next/link";
import { Button } from "@/lib/form-and-inputs/button";
import { Template } from "@prisma/client";

type TemplateMinimalInfoProps = {
  template:Template;
};
function TemplateMinimalInfo({ template }: TemplateMinimalInfoProps) {
  return (
    <Link key={template.id} href={`/templates/${template.id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 transition cursor-pointer space-y-1">
        <div className="font-semibold">{template.type}</div>
        <div className="text-sm text-gray-600 line-clamp-1">
          {template.description}
        </div>
        <div className="text-xs text-gray-500">
          Updated: {template.updatedAt.toLocaleDateString()}
        </div>
      </div>
    </Link>
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
      <Button className="" disabled={false} onClick={()=>null} >
        create template
      </Button>
      {data.map((item) => (
        <TemplateMinimalInfo key={item.id} template={item} />
      ))}
    </AppCard>
  );
}