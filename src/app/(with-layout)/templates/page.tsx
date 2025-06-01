import { cn } from "@/lib/utils";

import { templateActions } from "@/features/template/actions";

import { TemplateListView  } from "@/features/template/components/template/template-list-view";
import { TemplateDetailView } from "@/features/template/components/template/template-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function template({
  params,
  searchParams,
}: PageProps) {
  //const { slug } = await params;
  //const filters = (await searchParams).filters;

// Render List of Templates

  const templatesResult = await templateActions.getAll();
  return (
    <TemplateListView templatesResult={ templatesResult } className={cn("")} />
  );

}
