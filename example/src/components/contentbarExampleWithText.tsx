import { CellPaddings, ContentCell } from "iav-frontend-framework/contentCell";
import { Button } from "primereact/button";
import { useState } from "react";

export interface Props {
  exampleText: string;
}

export const ContentbarExampleWithText = (props: Props) => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="col-8 grid grid-nogutter">
        <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
          <span>First row left</span>
          <h2>{props.exampleText}</h2>
          <h3>Contentbar with default tabelements</h3>
          <h3>Advanced useCase</h3>
          <div></div>
        </ContentCell>
        <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
          <span>First row center</span>
          <div style={{ marginTop: "80px" }}>{counter}</div>
          <div style={{ marginTop: "40px" }}>
            <Button
              label={"Increment counter"}
              onClick={() => {
                setCounter((prevCounter) => prevCounter + 1);
              }}
            />
          </div>
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
    </>
  );
};
