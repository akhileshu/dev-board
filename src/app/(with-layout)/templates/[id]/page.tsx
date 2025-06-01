import { cn } from "@/lib/utils";

import { templateActions } from "@/features/template/actions";

import { TemplateListView  } from "@/features/template/components/template/template-list-view";
import { TemplateDetailView } from "@/features/template/components/template/template-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function templates({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  //const filters = (await searchParams).filters;

  // Render Single Template
    const templateResult = await templateActions.getById(id);

  return (
    <TemplateDetailView templateResult={ templateResult } className={cn("")} />
  );
}
