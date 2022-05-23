import { observer } from "mobx-react-lite";
import {
  CSSProperties,
  DOMAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContanerConfig, ItemConfig } from "../store/flexbox";
import cx from "classnames";
import { throttle } from "lodash-es";

const FlexBox = (
  props: PropsWithChildren<{
    config: ContanerConfig;
    onClick?: DOMAttributes<HTMLDivElement>["onClick"];
  }>
) => {
  const { children, config, onClick } = props;

  const className = cx("flex shrink-1 grow-1 bg-stripes-indigo ", {
    "flex-wrap": config.wrap,
  });

  const style: CSSProperties = {
    justifyContent: config.justifyContent,
    alignItems: config.alignItems,
    gap: config.gap,
  };

  return (
    <div className="cursor-pointer p-4" onClick={onClick}>
      <div className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export const FlexItem = observer(
  (props: {
    config: ItemConfig;
    onClick?: DOMAttributes<HTMLDivElement>["onClick"];
    isSelected: boolean;
  }) => {
    const { config, onClick, isSelected } = props;
    const style: CSSProperties = {
      flexGrow: config.grow,
      flexShrink: config.shrink,
      flexBasis: config.basis,
      height: config.height,
    };

    if (config.isFixedSize) {
      style.width = config.width;
      style.flexGrow = 0;
      style.flexShrink = 0;
    }

    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (!ref.current) return;

      const callback = throttle((target: any) => {
        setWidth(Math.floor(target[0].contentBoxSize[0].inlineSize));
        setHeight(Math.floor(target[0].contentBoxSize[0].blockSize));
      }, 100);

      const observer = new ResizeObserver(callback);

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }, []);

    const classnames = cx(
      "bg-indigo-600 rounded-lg overflow-hidden text-white ring-indigo-800",
      "flex justify-center items-center text-xs flex-col select-none hover:bg-indigo-500 cursor-pointer",
      {
        "ring-4": isSelected,
      }
    );
    return (
      <div className={classnames} style={style} ref={ref} onClick={onClick}>
        <p className="text-center	whitespace-nowrap ">
          {width}px <span className="text-white/50">x</span> {height}
          px
        </p>
        <p className="mt-1 text-center whitespace-nowrap">
          {config.isFixedSize ? (
            "fixed size"
          ) : (
            <span>
              flex: {config.grow} {config.shrink} {config.basis}
            </span>
          )}
        </p>
      </div>
    );
  }
);

export default observer(FlexBox);
