import React, {useEffect, useState} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import { opacityColor } from '../../helpers/helper';
import Colors from '../../res/colors';

interface Props {
  onChange: (query: string) => void;
  modeSearch: boolean;
}

const HimnoSearch = ({onChange, modeSearch}: Props) => {
  const [query, setQuery] = useState('' as string);

  const handleText = (event:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(event.target.value);

    if (onChange) onChange(event.target.value);
  };

  useEffect(() => {
    !modeSearch && setQuery('');
  }, [modeSearch]);

  return (
    <div style={styles.container}>
      <input
        style={{...styles.textInput}}
        value={query}
        placeholder={'Buscar...'}
        onChange={handleText}
        color={Colors.txtDark}
      />
    </div>
  );
};

const styles : { [key in any]: React.CSSProperties } ={
  container: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    borderBottomColor: opacityColor(Colors.bkgWhite, 0.5),
    borderBottomWidth: 4,
  },
  textInput: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.grayLight,
    padding: 12,
    paddingLeft: 18,
    paddingRight: 18,
    color: Colors.txtBlack,
    fontSize: 20,
    borderWidth: 0,
    borderBottomColor: Colors.grayLight,
    margin: 8,
    borderRadius: 50,
  },
};

export default HimnoSearch;
