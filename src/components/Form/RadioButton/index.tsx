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
  setSelected?: (value: Option) => void;
  showResult?: boolean;
}

export function RadioButton({
  items,
  selected,
  setSelected,
  showResult = false,
}: RadioButtonProps) {
  return (
    <Container>
      {items.map((item, index) => (
        <Content
          key={item.id}
          itemIndex={index}
          enabled={!showResult}
          onPress={setSelected ? () => setSelected(item) : undefined}
        >
          {selected.id === item.id
            ? <Icon name="radiobox-marked" selected={selected.id === item.id} />
            : <Icon name="radiobox-blank" selected={selected.id === item.id} />
          }

          {showResult ? (
            <Text isCorrectAnswer={item.correct_answer}>{item.text}</Text>
          ) : (
            <Text>{item.text}</Text>
          )}
        </Content>
      ))}
    </Container>
  );
}
