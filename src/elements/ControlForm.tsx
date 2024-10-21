import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<unknown> {
  label: string;
}

const ControlForm = ({ label ,  children}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginBottom: 8,
        textAlign: "start",
        position: "relative",
      }}
    >
      <label
        style={{
          paddingRight: 8,
          // minWidth: 150,
          position: "absolute",
          fontSize: 10,
          top: 0,
          left: 12,
          transform: "translateY(-50%)",
          backgroundColor: "white",
          lineHeight: 1,
          borderRadius: 4,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default ControlForm;
