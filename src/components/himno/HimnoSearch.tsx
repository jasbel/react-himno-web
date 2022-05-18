import React, {useEffect, useState} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import { opacityColor } from '../../helpers/helper';
import Colors from '../../res/colors';
import { responsive } from '../../utils/responsive';

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
    marginLeft: 30,
  },
  textInput: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.grayLight,
    padding: responsive(12, 8),
    paddingLeft: 16,
    paddingRight: 16,
    color: Colors.txtBlack,
    fontSize: responsive(20, 18),
    borderWidth: 0,
    borderBottomColor: Colors.grayLight,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
};

export default HimnoSearch;
