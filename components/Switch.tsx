import * as SwitchPrimitive from "@radix-ui/react-switch";
import { styled } from "@stitches/react";
import colors from "tailwindcss/colors";

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: "unset",
  width: 42,
  height: 24,
  backgroundColor: colors.indigo[500],
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  '&[data-state="checked"]': { backgroundColor: colors.indigo[700] },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});

const Switch = ({
  value,
  onChange,
}: {
  value?: boolean;
  onChange?: (v: boolean) => void;
}) => {
  return (
    <StyledSwitch checked={value} onCheckedChange={onChange}>
      <StyledThumb className="shadow-lg" />
    </StyledSwitch>
  );
};
export default Switch;
