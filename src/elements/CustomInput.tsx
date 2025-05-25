import ControlForm from "./ControlForm";

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  onInput: (v: string) => void;
  value?: string;
}

const CustomInput = ({ id, label , onInput, placeholder, value}: Props) => {
  return (
    <ControlForm label={label} >
      <input
        id={id}
        style={{
          border: "1px solid black",
          borderRadius: 8,
          padding: "3px 12px",
        }}
        className="w-100"
        placeholder={placeholder}
        onChange={e => {
          onInput((e.target as HTMLInputElement).value)
        }}
        value={value}
      />
    </ControlForm>
  );
};

export default CustomInput;
