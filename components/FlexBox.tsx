import { observer } from "mobx-react-lite";
import { CSSProperties, PropsWithChildren } from "react";
import { useFlexBoxStore } from "../store/flexbox";
import cx from "classnames";

const FlexBox = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const store = useFlexBoxStore();

  const config = store.containerConfig;

  const className = cx("flex gap-2 shrink-1 grow-1", {
    "flex-wrap": config.wrap,
  });

  const style: CSSProperties = {
    justifyContent: config.justifyContent,
    alignItems: config.alignItems,
    gap: config.gap,
  };

  return (
    <div>
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export const FlexItem = () => {
  return <div className="h-16 w-20 bg-indigo-500 rounded-lg"></div>;
};

export default observer(FlexBox);
