import Colors from "@/res/colors";
import { responsive } from "@/utils/responsive";

interface GenericStyledProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = (props: InputProps) => (
  <input
    style={{
      color: Colors.txtDark,
      marginTop: 22,
      marginBottom: 22,
      backgroundColor: Colors.grayLight,
      borderRadius: 50,
      fontSize: responsive(20, 16),
      padding: 22,
      paddingTop: 12,
      paddingBottom: 12,
      width: '100%',
    }}
    {...props}
  />
);

const Heading: React.FC<GenericStyledProps<'h1'>> = ({style, children, ...props}) => (
  <h1 style={{
    fontWeight: 'bold', whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...style
  }} {...props}>
    {children}
  </h1>
);

const TextSingle: React.FC<GenericStyledProps<'p'>> = ({style, children, ...props}) => (
  <p style={{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...style,
  }} {...props}>
    {children}
  </p>
);

const Box: React.FC<GenericStyledProps<'div'>> = ({children,...props}) => (
  <div {...props}>
    {children}
  </div>
);

const Flex: React.FC<GenericStyledProps<'div'>> = ({ style, children, ...props }) => {
  return (<div style={{
    display: 'flex',
    flexDirection: 'row', ...style
  }} {...props}>
    {children}
  </div>
  )
};

export {
  Box,
  Flex,
  TextSingle,
  Heading,
  Input,
};
