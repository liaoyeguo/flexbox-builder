import { PropsWithChildren } from "react";

const Panel = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return (
    <div className="bg-white shadow-lg rounded-lg w-72 mt-8">{children}</div>
  );
};

export const Item = (props: PropsWithChildren<{ label: string }>) => {
  const { label, children } = props;
  return (
    <div className="flex py-2 px-4 justify-between">
      <label className="shrink-0 text-gray-400 select-none text-xs pt-1">
        {label}
      </label>
      {children}
    </div>
  );
};
export default Panel;
