import { XMark } from "@medusajs/icons";
import { clx, IconButton } from "@medusajs/ui";
import * as FocusModalPrimitives from "@radix-ui/react-dialog";
import * as React from "react";
import { motion } from "framer-motion";
/**
 * @prop defaultOpen - Whether the modal is opened by default.
 * @prop open - Whether the modal is opened.
 * @prop onOpenChange - A function to handle when the modal is opened or closed.
 */
type FocusModalRootProps = {} & React.ComponentPropsWithoutRef<
  typeof FocusModalPrimitives.Root
>;

/**
 * This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
 */
const FocusModalRoot = (props: FocusModalRootProps) => {
  return <FocusModalPrimitives.Root {...props} />;
};
FocusModalRoot.displayName = "FocusModal";

const FocusModalTrigger = React.forwardRef<
  React.ElementRef<typeof FocusModalPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof FocusModalPrimitives.Trigger>
>((props, ref) => {
  return <FocusModalPrimitives.Trigger ref={ref} {...props} />;
});
FocusModalTrigger.displayName = "FocusModal.Trigger";

const FocusModalClose = FocusModalPrimitives.Close;
FocusModalClose.displayName = "FocusModal.Close";

const FocusModalPortal = (props: FocusModalPrimitives.DialogPortalProps) => {
  return <FocusModalPrimitives.DialogPortal {...props} />;
};
FocusModalPortal.displayName = "FocusModal.Portal";

const FocusModalOverlay = React.forwardRef<
  React.ElementRef<typeof FocusModalPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof FocusModalPrimitives.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <FocusModalPrimitives.Overlay
      ref={ref}
      className={clx(
        "fixed inset-0 z-10 bg-black/50", // dùng nền đen trong suốt 50%
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  );
});
FocusModalOverlay.displayName = "FocusModal.Overlay";

const FocusModalContent = React.forwardRef<
  React.ElementRef<typeof FocusModalPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof FocusModalPrimitives.Content> & {
    overlayProps?: React.ComponentPropsWithoutRef<typeof FocusModalOverlay>;
    portalProps?: React.ComponentPropsWithoutRef<typeof FocusModalPortal>;
  }
>(({ className, overlayProps, portalProps, ...props }, ref) => {
  return (
    <FocusModalPortal {...portalProps}>
      <FocusModalOverlay {...overlayProps} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0 }}
        className="w-full"
      >
        <FocusModalPrimitives.Content
          ref={ref}
          className={clx(
            "fixed inset-2 z-10 flex flex-col overflow-hidden rounded-lg bg-white shadow-elevation-modal outline-none",
            className
          )}
          {...props}
        />
      </motion.div>
    </FocusModalPortal>
  );
});
FocusModalContent.displayName = "FocusModal.Content";

/**
 * This component is based on the `div` element and supports all of its props
 */
const FocusModalHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clx(
        "flex items-center justify-between gap-x-4 border-b border-gray-300 px-4 py-2",
        className
      )}
      {...props}
    >
      {/* Tiêu đề nằm bên trái */}
      <div className="flex items-center gap-x-2 font-semibold">{children}</div>

      {/* Dấu X nằm bên phải */}
      <FocusModalPrimitives.Close asChild>
        <IconButton
          className="border rounded-full p-2 border-gray-300 hover:bg-gray-300 "
          size="base"
          type="button"
          variant="transparent"
        >
          <XMark className="cursor-pointer m-auto" />
        </IconButton>
      </FocusModalPrimitives.Close>
    </div>
  );
});

FocusModalHeader.displayName = "FocusModal.Header";

const FocusModalFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    className?: string;
    children?: React.ReactNode;
  }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clx(
        "flex items-center justify-end gap-x-2 border-t border-ui-border-base p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
FocusModalFooter.displayName = "FocusModal.Footer";

const FocusModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof FocusModalPrimitives.Title>
>(({ ...props }, ref) => {
  return <FocusModalPrimitives.Title ref={ref} {...props} />;
});
FocusModalTitle.displayName = "FocusModal.Title";

const FocusModalDescription = FocusModalPrimitives.Description;
FocusModalDescription.displayName = "FocusModal.Description";

/**
 * This component is based on the `div` element and supports all of its props
 */
const FocusModalBody = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clx("flex-1", className)} {...props} />;
});
FocusModalBody.displayName = "FocusModal.Body";

const FocusModal = Object.assign(FocusModalRoot, {
  Trigger: FocusModalTrigger,
  Title: FocusModalTitle,
  Description: FocusModalDescription,
  Content: FocusModalContent,
  Header: FocusModalHeader,
  Body: FocusModalBody,
  Close: FocusModalClose,
  Footer: FocusModalFooter,
});

export { FocusModal };
