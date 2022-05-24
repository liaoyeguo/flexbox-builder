import React, { ComponentProps, ReactNode } from "react";
import { styled } from "@stitches/react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import colors from "tailwindcss/colors";
import cx from "classnames";

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "auto",
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "white",
  padding: "0 20px",
  height: 36,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  lineHeight: 1,
  userSelect: "none",
  "&:hover": { color: colors.indigo[600] },
  '&[data-state="active"]': {
    color: colors.indigo[600],
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  //   "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: "16px",
  backgroundColor: "white",
  outline: "none",
});

const Tabs = (
  props: ComponentProps<typeof StyledTabs> & {
    items: {
      label: ReactNode;
      content: ReactNode;
      value: string;
      disabled?: boolean;
    }[];
  }
) => {
  const { items } = props;
  return (
    <StyledTabs>
      <StyledList className="border-b text-gray-900">
        {items.map((item) => {
          return (
            <StyledTrigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cx({
                "cursor-not-allowed": item.disabled,
              })}
            >
              {item.label}
            </StyledTrigger>
          );
        })}
      </StyledList>
      {items.map((item) => {
        return (
          <StyledContent key={item.value} value={item.value}>
            {item.content}
          </StyledContent>
        );
      })}
    </StyledTabs>
  );
};

export default Tabs;
