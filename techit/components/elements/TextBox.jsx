import React from "react";

const TextBox = React.forwardRef(
  (
    {
      className,
      labelText,
      type = "text",
      error,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={className + " relative"}>
        {labelText && (
          <label
            className="block text-gray-600 mb-2 text-xs lg:text-sm xl:text-base"
            htmlFor="txt"
          >
            {labelText}
          </label>
        )}
        <div className="flex items-stretch">
          <input
            id="txt"
            autoComplete="off"
            className={` text-black border border-b-cyan-500 disabled:border-slate-100 w-full min-[320px]:w-3 block outline-none py-2 px-1 min-[320px]:py-2 min-[320px]: transition-all text-xs lg:text-sm xl:text-base bg-slate-50 focus:shadow focus:shadow-blue-500
              ${error && "border-red-500 border  animate-shake"} ${
              children ? "rounded-r-md" : "rounded-md"
            }`}
            {...props}
            ref={ref}
            type={type}
          ></input>

          <div className="flex">{children}</div>
        </div>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
export default TextBox;
