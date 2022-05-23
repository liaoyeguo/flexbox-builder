import cx from "classnames";

const Input = ({
  value,
  onChange,
  placeholder,
  width,
  textAlign = "left",
  className,
}: {
  value?: any;
  onChange?: (v: any) => void;
  placeholder?: string;
  width?: string;
  textAlign?: "left" | "right";
  className?: string;
}) => {
  const classNames = cx(
    "text-xs py-1 px-2 text-slate-500 rounded ring-1 ring-slate-900/10 outline-none",
    {
      "text-right": textAlign,
    },
    className
  );

  return (
    <input
      value={value}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      type="text"
      placeholder={placeholder}
      className={classNames}
      style={{
        width,
      }}
    />
  );
};

export default Input;
