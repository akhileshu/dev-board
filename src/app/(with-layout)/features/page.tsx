import { cn } from "@/lib/utils";

import { featureActions } from "@/features/feature/actions";

import { FeatureListView  } from "@/features/feature/components/feature/feature-list-view";
import { FeatureDetailView } from "@/features/feature/components/feature/feature-detail-view";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function features({
  params,
  searchParams,
}: PageProps) {
  //const { slug } = await params;
  //const filters = (await searchParams).filters;

  // Render Single Feature
    const featureResult = await featureActions.getById();

  return (
    <FeatureDetailView featureResult={ featureResult } className={cn("")} />
  );
}
