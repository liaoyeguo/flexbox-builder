import type { NextPage } from "next";
import { useMemo } from "react";
import ResizableContainer from "../../components/ResizableContainer";
import { FlexBoxStoreProvider, useFlexBoxStore } from "../../store/flexbox";
import FlexBox, { FlexItem } from "../../components/FlexBox";
import { observer } from "mobx-react-lite";
import FlexBoxStore from "../../store/flexbox";
import { BsPlus } from "react-icons/bs";
import ContainerPanel from "../../components/ContainerPanel";

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
  const items = store.items;

  return (
    <div className="h-screen bg-gradient-to-r from-fuchsia-500 to-purple-600">
      <div className="pt-[120px] pl-[120px]">
        <div
          className="bg-black/40 w-5 h-5 px-1 py-1 flex justify-center items-center 
          cursor-pointer rounded box-content text-white text-xl mb-2"
          onClick={store.pushItem}
        >
          <BsPlus />
        </div>
        <ResizableContainer>
          <FlexBox>
            {items.map(({ id }) => {
              return <FlexItem key={id} />;
            })}
          </FlexBox>
        </ResizableContainer>
        <ContainerPanel />
      </div>
    </div>
  );
});
export default observer(EditorPage);
