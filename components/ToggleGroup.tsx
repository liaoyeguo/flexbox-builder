import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { styled } from "@stitches/react";
import { Children, ComponentProps } from "react";
import colors from "tailwindcss/colors";
import Tooltip from "./Tooltip";

const ToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "inline-flex",
});

const StyledToggleItem = styled(ToggleGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  height: 24,
  width: 24,
  display: "flex",
  fontSize: 12,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,
  borderRadius: 4,
  color: colors.gray[600],
  "&:hover": { backgroundColor: colors.indigo[50] },
  "&[data-state=on]": {
    backgroundColor: colors.indigo[200],
    color: colors.indigo[900],
  },
});

export const ToggleItem = (
  props: ComponentProps<typeof StyledToggleItem> & { tooltip?: string }
) => {
  const { children, tooltip, ...rest } = props;
  if (!tooltip)
    return <StyledToggleItem {...rest}>{children}</StyledToggleItem>;

  return (
    <StyledToggleItem {...rest}>
      <Tooltip content={tooltip}>{children}</Tooltip>
    </StyledToggleItem>
  );
};

export default ToggleGroup;
