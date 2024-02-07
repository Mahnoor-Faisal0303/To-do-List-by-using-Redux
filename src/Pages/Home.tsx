import React, { Fragment } from 'react';
import { BoxStyle, TypographyStyle } from '../HomeStyle';
import  TodoListComponent  from "../Component/TodoList";

const Home: React.FC = () => {
  return (
    <Fragment>
      <BoxStyle>
        <TypographyStyle variant="h2">Todo List</TypographyStyle>
        <TodoListComponent/>
      </BoxStyle>
    </Fragment>
  );
};

export default Home;
