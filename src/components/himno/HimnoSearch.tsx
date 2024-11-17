import { Flex, Input } from '@components/ui';
import React, { useEffect, useState } from 'react';
import { opacityColor } from '../../helpers/helper';
import Colors from '../../res/colors';
import { responsive } from '../../utils/responsive';

interface Props {
  onChange: (query: string) => void;
  modeSearch?: boolean;
}

const HimnoSearch = ({ onChange, modeSearch }: Props) => {
  const [query, setQuery] = useState('' as string);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(event.target.value);

    if (onChange) onChange(event.target.value);
  };

  useEffect(() => {
    !modeSearch && setQuery('');
  }, [modeSearch]);

  return (
    <Flex style={{backgroundColor: opacityColor(Colors.bkgWhite, 0.5)}}>
      <Input
        value={query}
        placeholder={'Buscar...'}
        onChange={handleText}
      />
    </Flex>
  );
};

export default HimnoSearch;
