import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "react-use";
import { strSlice } from "@/utils/string";
import { cn } from "@/lib/utils";

export default function CopyText({
  text,
  link,
  short = false,
}: {
  text: string;
  link?: string;
  short?: boolean;
}) {
  const [state, copy] = useCopyToClipboard();
  const handleCopy = () => {
    copy(text);
    if (state.error) {
      toast.error("Failed to copy to clipboard");
    } else {
      toast.success("Copied to clipboard");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "relative",
          link && "cursor-pointer text-primary hover:underline"
        )}
      >
        {short ? strSlice(text) : text}
        {link && (
          <a
            className="absolute inset-0"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </span>
      <CopyIcon
        className="cursor-pointer w-4 h-4 hover:text-primary"
        onClick={handleCopy}
      />
    </div>
  );
}
