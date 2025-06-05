import { cn } from "@/lib/utils";

import { projectTimelineActions } from "@/features/projectTimeline/actions";

import { ProjectTimelineListView  } from "@/features/project-timeline/components/project-timeline/project-timeline-list-view";
import { ProjectTimelineDetailView } from "@/features/project-timeline/components/project-timeline/project-timeline-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function projectTimelines({
  params,
  searchParams,
}: PageProps) {
  //const { slug } = await params;
  //const filters = (await searchParams).filters;

  // Render Single ProjectTimeline
    const projectTimelineResult = await projectTimelineActions.getById();

  return (
    <ProjectTimelineDetailView projectTimelineResult={ projectTimelineResult } className={cn("")} />
  );
}
