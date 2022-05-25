import { DialogClose } from "@radix-ui/react-dialog";
import { CodeIcon } from "@radix-ui/react-icons";
import React, { useMemo, useState } from "react";
import { ContanerConfig, ItemConfig, useFlexBoxStore } from "../store/flexbox";
import Button from "./Button";
import CodeBlock from "./CodeBlock";
import Dialog from "./Dialog";
import Tabs from "./Tabs";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import cssParser from "prettier/parser-postcss";

const getCode = (
  containerConfig: ContanerConfig,
  itemConfigs: ItemConfig[]
) => {
  const js = `
import styles from './index.module.css'

const FlexBox = () => {
  return (
    <div className={styles.container}>
      ${itemConfigs
        .map((item, i) => {
          return `<div className={styles.item${
            i + 1
          }}>{/* your content */}</div>`;
        })
        .join("\n        ")}
    </div>
  );
};
  `;

  const css = `
.container{
  display: flex;
  ${containerConfig.horizontal ? "" : "flex-direction: containerConfig;"}
  justify-content: ${containerConfig.justifyContent};
  align-items: ${containerConfig.alignItems};
  ${containerConfig.gap === undefined ? "" : `gap: ${containerConfig.gap};`}
}
${itemConfigs
  .map((item, i) => {
    return `
.item${i + 1}{
  ${
    item.isFixedSize
      ? `
  width: ${item.width};
  height: ${item.height};
  flex: 0 0 ${item.width};
  `
      : `
  flex: ${item.grow} ${item.shrink} ${item.basis};
      `
  }
}
`;
  })
  .join("\n")}
  `.replace(/\n\s*\n/, "\n");

  return {
    js: prettier.format(js, { parser: "babel", plugins: [babelParser] }),
    css: prettier.format(css, { parser: "css", plugins: [cssParser] }),
  };
};

const CodeDialog = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className="bg-black/40 text-xs h-5 px-1 py-1 flex justify-center items-center 
cursor-pointer rounded box-content text-white mb-2"
        onClick={() => {
          setVisible(true);
        }}
      >
        <CodeIcon className="mr-1 text-xl" /> Get Code
      </div>
      <Dialog
        open={visible}
        onVisibleChange={setVisible}
        title="Get code"
        padding="1rem 0 0"
        width="960px"
        footer={
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        }
      >
        <Tabs
          defaultValue="react"
          items={[
            { label: "React", value: "react", content: <ReactCode /> },
            {
              label: "Vue(coming soon)",
              value: "vue",
              content: "Coming soon!",
              disabled: true,
            },
          ]}
        />
      </Dialog>
    </>
  );
};

const ReactCode = () => {
  const store = useFlexBoxStore();

  const containerConfig = store.containerConfig;
  const itemConfigs = store.items.slice();

  const { js, css } = useMemo(
    () => getCode(containerConfig, itemConfigs),
    [containerConfig, itemConfigs]
  );
  return (
    <>
      <CodeBlock code={js} filename="App.jsx" />
      <CodeBlock code={css} filename="index.module.css" language="css" />
    </>
  );
};
export default CodeDialog;
