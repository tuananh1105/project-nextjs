import { cn } from "@/utils/utils";

const ListBlank = ({
  className,
  title = "Your list is empty. Start filling it up!",
}: {
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 bg-ui-bg-base py-6",
        className
      )}
    >
      <img
        src="/empty-inbox.png"
        alt="empty list"
        width={213}
        height={137}
        className="object-cover"
      />
      <p className="txt-medium text-ui-fg-subtle">{title}</p>
    </div>
  );
};

export default ListBlank;
