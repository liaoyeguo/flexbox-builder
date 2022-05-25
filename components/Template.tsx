import { WidthIcon } from "@radix-ui/react-icons";
import { runInAction } from "mobx";
import React, { DOMAttributes, PropsWithChildren, ReactNode } from "react";
import { ContanerConfig, ItemConfig, useFlexBoxStore } from "../store/flexbox";
import cx from "classnames";

const BlockContainer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const classnems = cx("flex gap-1 grow text-gray-50", className);
  return <div className={classnems}>{children}</div>;
};

const Block = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const classnems = cx(
    "bg-indigo-500 rounded-sm flex justify-center text-xs px-1",
    className
  );
  return <div className={classnems}>{children}</div>;
};

const TEMPLATES: {
  containerConfig?: Partial<ContanerConfig>;
  itemConfigs?: Partial<ItemConfig>[];
  icon: ReactNode;
}[] = [
  {
    itemConfigs: [
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
      {
        isFixedSize: false,
        grow: 1,
        shrink: 1,
      },
    ],
    icon: (
      <BlockContainer>
        <Block className="w-4 h-4" />
        <Block className="grow shrink">
          <WidthIcon />
        </Block>
      </BlockContainer>
    ),
  },
  {
    itemConfigs: [
      {
        isFixedSize: true,
        width: "20%",
        height: "64px",
      },
      {
        isFixedSize: true,
        width: "80%",
        height: "64px",
      },
    ],
    icon: (
      <BlockContainer>
        <Block className="grow-[1]">
          <WidthIcon />
        </Block>

        <Block className="grow-[4]">
          <WidthIcon />
        </Block>
      </BlockContainer>
    ),
  },
  {
    containerConfig: {
      justifyContent: "center",
    },
    itemConfigs: [
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
    ],
    icon: (
      <BlockContainer className="justify-center">
        <Block className="w-4 h-4"></Block>
        <Block className="w-4 h-4"></Block>
        <Block className="w-4 h-4"></Block>
      </BlockContainer>
    ),
  },
  {
    containerConfig: {
      justifyContent: "center",
    },
    itemConfigs: [
      {
        isFixedSize: false,
      },
      {
        isFixedSize: false,
      },
      {
        isFixedSize: false,
      },
    ],
    icon: (
      <BlockContainer className="justify-center">
        <Block className="h-4">a</Block>
        <Block className="h-4">aa</Block>
        <Block className="h-4">a</Block>
      </BlockContainer>
    ),
  },
  {
    containerConfig: {
      justifyContent: "flex-start",
    },
    itemConfigs: [
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
      {
        isFixedSize: true,
        width: "80px",
        height: "64px",
      },
    ],
    icon: (
      <BlockContainer className="justify-start">
        <Block className="w-4 h-4"></Block>
        <Block className="w-4 h-4"></Block>
        <Block className="w-4 h-4"></Block>
      </BlockContainer>
    ),
  },
  {
    containerConfig: {
      justifyContent: "flex-start",
    },
    itemConfigs: [
      {
        isFixedSize: false,
      },
      {
        isFixedSize: false,
      },
      {
        isFixedSize: false,
      },
    ],
    icon: (
      <BlockContainer className="justify-start">
        <Block className="h-4">a</Block>
        <Block className="h-4">aa</Block>
        <Block className="h-4">a</Block>
      </BlockContainer>
    ),
  },
  {
    itemConfigs: [
      {
        isFixedSize: false,
        grow: 1,
      },
      {
        isFixedSize: false,
        grow: 1,
      },
      {
        isFixedSize: false,
        grow: 1,
      },
    ],
    icon: (
      <BlockContainer className="justify-start">
        <Block className="h-4 grow"></Block>
        <Block className="h-4 grow"></Block>
        <Block className="h-4 grow"></Block>
      </BlockContainer>
    ),
  },
];

const Templates = () => {
  const store = useFlexBoxStore();

  const handleClickFact = (item: typeof TEMPLATES[number]) => () => {
    runInAction(() => {
      if (item.containerConfig) {
        store.containerConfig = new ContanerConfig(
          item.containerConfig.horizontal,
          item.containerConfig.justifyContent,
          item.containerConfig.alignItems,
          item.containerConfig.gap,
          item.containerConfig.wrap
        );
      }
      if (Array.isArray(item.itemConfigs))
        store.items = item.itemConfigs.map((item) => {
          return new ItemConfig(
            item.isFixedSize,
            item.width,
            item.height,
            item.grow,
            item.shrink,
            item.basis
          );
        });

      store.select("root");
    });
  };

  return (
    <div className="flex items-center ml-6">
      <div className="mr-4 text-indigo-900">Template</div>
      {TEMPLATES.map((item, i) => {
        return (
          <Template key={i} onClick={handleClickFact(item)}>
            {item.icon}
          </Template>
        );
      })}
    </div>
  );
};

const Template = ({
  children,
  onClick,
}: PropsWithChildren<{
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
}>) => {
  return (
    <div
      className="flex w-24 h-16 bg-white border border-gray-300 rounded mr-2 last:mr-0 p-2
    hover:border-indigo-600 items-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default Templates;
