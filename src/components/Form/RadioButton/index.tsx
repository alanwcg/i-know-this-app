import React from 'react';

import { Option } from '../../../types/Question';

import {
  Container,
  Content,
  Icon,
  Text,
} from './styles';

type RadioButtonProps = {
  items: Option[];
  selected: Option;
  setSelected: (value: Option) => void;
}

export function RadioButton({
  items,
  selected,
  setSelected,
}: RadioButtonProps) {
  return (
    <Container>
      {items.map((item, index) => (
        <Content
          key={item.id}
          itemIndex={index}
          onPress={() => setSelected(item)}
        >
          {selected.id === item.id
            ? <Icon name="radiobox-marked" selected={selected.id === item.id} />
            : <Icon name="radiobox-blank" selected={selected.id === item.id} />
          }
          
          <Text>{item.text}</Text>
        </Content>
      ))}
    </Container>
  );
}
