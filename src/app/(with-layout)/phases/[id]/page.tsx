import { cn } from "@/lib/utils";

import { phaseActions } from "@/features/phase/actions";

import { PhaseListView  } from "@/features/phase/components/phase/phase-list-view";
import { PhaseDetailView } from "@/features/phase/components/phase/phase-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function phases({
  params,
  searchParams,
}: PageProps) {
  //const { slug } = await params;
  //const filters = (await searchParams).filters;

  // Render Single Phase
    const phaseResult = await phaseActions.getById();

  return (
    <PhaseDetailView phaseResult={ phaseResult } className={cn("")} />
  );
}
