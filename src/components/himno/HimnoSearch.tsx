import { Flex, Input } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
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
    <Flex bg={opacityColor(Colors.bkgWhite, 0.5)} pl={8}>
      <Input
        value={query}
        placeholder={'Buscar...'}
        onChange={handleText}
        color={Colors.txtDark}
        my={2}
        bg={Colors.grayLight}
        borderRadius={50}
        fontSize={responsive(20, 16)}
      />
    </Flex>
  );
};

export default HimnoSearch;
