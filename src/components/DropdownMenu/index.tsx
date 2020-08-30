import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { Container, Button, List, Item } from './styles';

interface DropdownMenuProps {
  items: string[];
  handleCategoryFilter: any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  handleCategoryFilter,
}) => {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible(): void {
    setVisible(!visible);
  }

  return (
    <Container>
      <Button type="button" onClick={handleToggleVisible}>
        <strong>Categorias</strong>
        <FiChevronDown size={20} />
      </Button>

      <List visible={visible}>
        {items.map(item => (
          <Item key={item}>
            <button type="button" onClick={() => handleCategoryFilter(item)}>
              {item}
            </button>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default DropdownMenu;
