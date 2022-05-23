import {
  AlignBaselineIcon,
  AlignBottomIcon,
  AlignCenterVerticallyIcon,
  AlignTopIcon,
  StretchVerticallyIcon,
} from "@radix-ui/react-icons";

import ToggleGroup, { ToggleItem } from "./ToggleGroup";

const contents = [
  {
    value: "stretch",
    "aria-label": "stretch",
    icon: <StretchVerticallyIcon />,
  },
  {
    value: "start",
    "aria-label": "start",
    icon: <AlignTopIcon />,
  },
  {
    value: "center",
    "aria-label": "center",
    icon: <AlignCenterVerticallyIcon />,
  },
  {
    value: "end",
    "aria-label": "end",
    icon: <AlignBottomIcon />,
  },
  {
    value: "baseline",
    "aria-label": "baseline",
    icon: <AlignBaselineIcon />,
  },
];

const CrossAxisAlign = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) => {
  return (
    <ToggleGroup
      type="single"
      aria-label="justify content"
      value={value}
      onValueChange={onChange}
    >
      {contents.map((item, index) => {
        return (
          <ToggleItem
            key={item["aria-label"]}
            value={item.value}
            aria-label={item["aria-label"]}
            tooltip={item["aria-label"]}
          >
            {item.icon}
          </ToggleItem>
        );
      })}
    </ToggleGroup>
  );
};

export default CrossAxisAlign;
