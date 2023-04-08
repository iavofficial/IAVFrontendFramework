import React, { useState } from 'react';
import { CellPaddings, ContentCell } from 'disa-framework/contentCell';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';

export const TestComponent = () => {
  const [selectedId, setSelectedId] = useState('');

  console.log('hier dein selectedId: ', selectedId);

  const test = (value: string) => {
    console.log('triggerd test');

    setSelectedId(value);
  };

  let test2 = function () {
    console.log('das ist ein test');
  };

  return (
    <Content
      layoutBehaviour={LayoutBehaviour.GRID}
      contentElements={[
        new BasicContentbarWrapper(
          'test124',
          'car123',
          selectedId,
          () => test,
          true,
          test2
        ),
        new BasicContentbarWrapper(
          'test123',
          'car124',
          selectedId,
          () => test,
          true,
          function () {}
        ),
      ]}
    >
      <div className={'col-8 grid grid-nogutter'}>
        <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
          <span>First row left</span>

          <div className="mt-3">
            <h2>layer one</h2>
          </div>
          <div></div>
        </ContentCell>
        <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
          <span>First row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_HOR}>
          <span>Second row left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center right</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row right</span>
        </ContentCell>
        <ContentCell colWidth={12} paddings={CellPaddings.BOT_HOR}>
          <span>Third row</span>
        </ContentCell>
      </div>
      <ContentCell
        paddings={CellPaddings.VERT_RIGHT}
        colWidth={4}
        clearStyle={true}
      >
        <span>Right with cleared style</span>
      </ContentCell>
    </Content>
  );
};
