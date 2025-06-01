"use client";

import { AppCard } from "@/components/app/card";
import { renderStatusMessage } from "@/components/app/status-message/renderStatusMessage";
import { cn } from "@/lib/utils";
import { sampleProjectActions } from "../../actions";



type SampleProjectDetailCardProps = {
  className?: string;
  sampleProjectResult: Awaited<ReturnType<typeof sampleProjectActions.getById>>;
};

export function SampleProjectDetailCard({
  sampleProjectResult,
  className,
}: SampleProjectDetailCardProps) {
  const cardTitle = "SampleProject";

  const { editing, startEditing, cancelEditing } = useEditToggle();
  const statusMessage = renderStatusMessage(sampleProjectResult, cardTitle);
  if (statusMessage || !sampleProjectResult.ok) return statusMessage;

  const { data } = sampleProjectResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      <RenderSampleProject sampleProject={data} />
    </AppCard>
  );
}


type SampleProjectOverviewCardProps = {
  className?: string;
  item:unknown;
};

export function SampleProjectOverviewCard({
  item,
  className,
}: SampleProjectOverviewCardProps) {
  const cardTitle = "sampleProject";

  const { editing, startEditing, cancelEditing } = useEditToggle();

  return (
    <AppCard title={cardTitle} className={cn("space-y-2", className)}>
      {editing ? (
        //<EditSampleProjectForm sampleProject={data} onCancel={cancelEditing} />
        <></>
      ) : (
        <>
          <Button disabled={editing} onClick={startEditing}>Edit</Button>
          <RenderSampleProject item={data} />
        </>
      )}
    </AppCard>
  );
}

type RenderTemplateProps = {
  item:unknown;
};

export function RenderTemplate({ item }: RenderTemplateProps) {
  return (
   <div>edit this component to display details</div>
  );
}

type SampleProjectListViewProps = {
  className?: string;
  sampleProjectsResult: Awaited<ReturnType<typeof sampleProjectActions.getAll>>;
};

export function SampleProjectListView({
  sampleProjectsResult,
  className,
}: SampleProjectListViewProps) {
  const cardTitle = "SampleProject List";

  const statusMessage = renderStatusMessage(sampleProjectsResult, cardTitle);
  if (statusMessage || !sampleProjectsResult.ok) return statusMessage;

  const { data } = sampleProjectsResult;

  return (
    <AppCard title={cardTitle} className={cn("space-y-4", className)}>
      {data.map((item) => (
        <SampleProjectOverviewCard
          key={item.id}
          item={item}
        />
      ))}
    </AppCard>
  );
}
