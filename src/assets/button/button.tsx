import { GroupItem } from "devextreme-react/form";
import React from "react";
import { Button } from 'devextreme-react/button';

const ButtonCustom = (props:any) => {
    // const {} = props;
    return (
        // <GroupItem caption="">
            <Button
               {...props}
            />
        // </GroupItem>
    );
}

export default ButtonCustom