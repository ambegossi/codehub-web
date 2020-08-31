import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { Container, Button, List, Item } from './styles';

interface DropdownMenuProps {
  name: string;
  items: string[];
  onChangeItem: (item: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  name,
  items,
  onChangeItem,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible(): void {
    setVisible(!visible);
  }

  return (
    <Container {...rest}>
      <Button type="button" onClick={handleToggleVisible}>
        <strong>{name}</strong>
        <FiChevronDown size={20} />
      </Button>

      <List visible={visible}>
        {items.map(item => (
          <Item key={item}>
            <button type="button" onClick={() => onChangeItem(item)}>
              {item}
            </button>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default DropdownMenu;
