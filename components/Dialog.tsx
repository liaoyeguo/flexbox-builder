import React, { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { styled, keyframes, CSSProperties } from "@stitches/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  //   backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "20rem",
  maxWidth: "60rem",
  overflow: "hidden",
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }: any) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export const DialogFooter = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
});

export const DialogTitle = ({
  children,
  style,
}: PropsWithChildren<{ style?: CSSProperties }>) => {
  return (
    <DialogPrimitive.Title
      className="text-gray-900 font-medium px-5 pt-3"
      style={style}
    >
      {children}
    </DialogPrimitive.Title>
  );
};

export const DialogClose = DialogPrimitive.Close;

const Dialog = (
  props: ComponentProps<typeof DialogPrimitive.Root> & {
    onVisibleChange?: (visible: boolean) => void;
    title?: string;
    footer?: ReactNode;
    padding?: string;
    width?: string;
  }
) => {
  const {
    children,
    title,
    footer,
    padding = "1.25rem",
    onVisibleChange,
    width,
    ...rest
  } = props;

  return (
    <DialogPrimitive.Root {...rest} onOpenChange={onVisibleChange}>
      <Content style={{ width }}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogPrimitive.Close asChild>
          <div className="absolute top-2 right-2 cursor-pointer hover:bg-indigo-50 p-1 rounded select-none">
            <Cross2Icon />
          </div>
        </DialogPrimitive.Close>
        <div className="max-h-[540px] overflow-auto">
          <div className="text-gray-600" style={{ padding }}>
            {children}
          </div>
          {footer && <DialogFooter className="p-5 pt-0">{footer}</DialogFooter>}
        </div>
      </Content>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
