import { AppCard } from "@/components/app/card";
import { useEditToggle } from "./utils";
import { cn } from "../utils";
import { Button } from "./button";

type EditableCardProps = {
  title: string;
  className?: string;
  editForm: React.ReactNode;
  renderComponent: React.ReactNode;
};
export function EditableCard({
  title,
  className,
  editForm,
  renderComponent,
}: EditableCardProps) {
  const { editing, startEditing, cancelEditing } = useEditToggle();

  return (
    <AppCard
      title={title}
      className={cn(
        "space-y-2  border-t-0 border-l-0 border-r-0 border-b",
        className
      )}
    >
      {editing ? (
        <>
          {editForm}
          <Button disabled={!editing} onClick={cancelEditing}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button disabled={editing} onClick={startEditing}>
            Edit
          </Button>
          {renderComponent}
        </>
      )}
    </AppCard>
  );
}
