import React, {PropsWithChildren} from "react";

interface Props {
    condition: boolean | undefined
}

const If: React.FC<PropsWithChildren<Props>> = props => {

    const {condition, children} = props;

    return (
        <>
            {condition ? children : null}
        </>
    );
}

export default If;
