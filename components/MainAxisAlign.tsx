import {
  AlignCenterHorizontallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  SpaceBetweenHorizontallyIcon,
  SpaceEvenlyHorizontallyIcon,
} from "@radix-ui/react-icons";

import ToggleGroup, { ToggleItem } from "./ToggleGroup";

const contents = [
  {
    value: "flex-start",
    "aria-label": "flex start",
    icon: <AlignLeftIcon />,
  },
  {
    value: "space-around",
    "aria-label": "space around",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4999 1C14.2237 1 13.9999 1.22386 13.9999 1.5L13.9999 13.5C13.9999 13.7761 14.2237 14 14.4999 14C14.776 14 14.9999 13.7761 14.9999 13.5L14.9999 1.5C14.9999 1.22386 14.776 1 14.4999 1ZM0.5 0.999999C0.223858 0.999999 -9.7854e-09 1.22386 -2.1856e-08 1.5L4.07282e-07 13.5C3.95211e-07 13.7761 0.223857 14 0.5 14C0.776143 14 1 13.7761 1 13.5L1 1.5C1 1.22386 0.776142 0.999999 0.5 0.999999Z"
          fill="black"
        />
        <path
          d="M4 7C4 6.44772 4.44772 6 5 6L10 6C10.5523 6 11 6.44772 11 7V8C11 8.55228 10.5523 9 10 9H5C4.44772 9 4 8.55228 4 8V7Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    value: "space-between",
    "aria-label": "space between",
    icon: <SpaceBetweenHorizontallyIcon />,
  },
  {
    value: "center",
    "aria-label": "center",
    icon: <AlignCenterHorizontallyIcon />,
  },
  {
    value: "space-evenly",
    "aria-label": "space-evenly",
    icon: <SpaceEvenlyHorizontallyIcon />,
  },
  {
    value: "flex-end",
    "aria-label": "flex-end",
    icon: <AlignRightIcon />,
  },
];

const MainAxisAlign = ({
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

export default MainAxisAlign;
