import { cn } from "@/lib/utils";

import { projectActions } from "@/features/project/actions";

import { ProjectListView  } from "@/features/project/components/project/project-list-view";
import { ProjectDetailView } from "@/features/project/components/project/project-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function projects({
  params,
  searchParams,
}: PageProps) {
  //const { slug } = await params;
  //const filters = (await searchParams).filters;

  // Render Single Project
    const projectResult = await projectActions.getById();

  return (
    <ProjectDetailView projectResult={ projectResult } className={cn("")} />
  );
}
