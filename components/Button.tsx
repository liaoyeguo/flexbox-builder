import {
  ClassAttributes,
  DOMAttributes,
  forwardRef,
  PropsWithChildren,
} from "react";
import cx from "classnames";

const Button = (
  props: PropsWithChildren<{
    className?: string;
    type?: "primary" | "gray";
    onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  }>,
  ref: ClassAttributes<HTMLButtonElement>["ref"]
) => {
  const { children, className, type = "primary", onClick } = props;

  const classnames = cx(
    "inline-flex justify-center items-center text-sm px-4 h-8 rounded",
    {
      "bg-indigo-100 hover:bg-indigo-200 text-white text-indigo-900 font-medium":
        type === "primary",
      "border border-slate-900/10 text-slate-500 hover:text-slate-600 ":
        type === "gray",
    },
    className
  );
  return (
    <button className={classnames} onClick={onClick} ref={ref}>
      {children}
    </button>
  );
};

export default forwardRef(Button);
