

interface Props {
    color: string;
    size: number;
    onClick?: Function;
}

const FontIcon = ({ color, size, onClick }: Props) => {

    return (
        <span onClick={() => onClick && onClick()} className="pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={size + "px"} fill={color}>

                <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z" />
            </svg>
        </span>
    )
}

export default FontIcon;