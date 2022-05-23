import { DOMAttributes, PropsWithChildren } from "react";
import cx from "classnames";

const Button = (
  props: PropsWithChildren<{
    className?: string;
    type?: "primary" | "gray";
    onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  }>
) => {
  const { children, className, type = "primary", onClick } = props;
  const classnames = cx(
    "inline-flex justify-center items-center text-sm px-4 h-8 rounded",
    {
      "bg-indigo-700 text-white": type === "primary",
      "border border-slate-900/10 text-slate-500 hover:text-slate-600 ":
        type === "gray",
    },
    className
  );
  return (
    <button className={classnames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
