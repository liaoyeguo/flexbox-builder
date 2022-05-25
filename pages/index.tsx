import type { NextPage } from "next";
import { useMemo } from "react";
import ResizableContainer from "../components/ResizableContainer";
import { FlexBoxStoreProvider, useFlexBoxStore } from "../store/flexbox";
import FlexBox, { FlexItem } from "../components/FlexBox";
import { observer } from "mobx-react-lite";
import FlexBoxStore from "../store/flexbox";
import ContainerPanel from "../components/ContainerPanel";
import FlexItemPanel from "../components/FlexItemPanel";
import { PlusIcon } from "@radix-ui/react-icons";
import CodeDialog from "../components/CodeDialog";
import Header from "../components/Header";
import Head from "next/head";

const EditorPage: NextPage = () => {
  const store = useMemo(() => new FlexBoxStore(), []);
  return (
    <FlexBoxStoreProvider value={store}>
      <Content />
    </FlexBoxStoreProvider>
  );
};

const Content = observer(() => {
  const store = useFlexBoxStore();
  const { items, selection } = store;

  return (
    <>
      <Head>
        <title>Flexbox builder</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Make flexbox layout in a few clicks!"
        />
        <meta
          name="og:description"
          content="Make flexbox layout in a few clicks!"
        />
      </Head>
      <div className="h-screen bg-gradient-to-r from-fuchsia-500 to-purple-600">
        <Header />
        <div className="pt-[60px] pl-[120px]">
          <div className="flex gap-2">
            <div
              className="bg-black/40 w-5 h-5 px-1 py-1 flex justify-center items-center 
          cursor-pointer rounded box-content text-white  mb-2"
              onClick={store.pushItem}
            >
              <PlusIcon />
            </div>
            <CodeDialog />
          </div>
          <ResizableContainer>
            <FlexBox
              config={store.containerConfig}
              onClick={() => {
                store.select("root");
              }}
            >
              {items.map((config) => {
                return (
                  <FlexItem
                    key={config.id}
                    config={config}
                    onClick={(e) => {
                      e.stopPropagation();
                      store.select(config.id);
                    }}
                    isSelected={selection === config.id}
                  />
                );
              })}
            </FlexBox>
          </ResizableContainer>
          {selection !== "root" ? <FlexItemPanel /> : <ContainerPanel />}
        </div>
      </div>
    </>
  );
});
export default observer(EditorPage);
