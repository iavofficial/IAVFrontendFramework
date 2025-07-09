/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import makeStyles from "@iavofficial/frontend-framework/makeStyles";
import {
  GREY5,
  GREY2,
  BLACK,
  GREY1,
  GREY6,
  WHITE,
  BLUE1,
} from "../../../constants/constants";
import {UICookieBannerProps} from "../../../types/modules/ui/cookieBannerModuleInterfaces";

const useStyles = makeStyles(({darkMode}: {darkMode: boolean}) => ({
  dialog: {
    borderRadius: "4px",
    border: `1px solid ${darkMode ? GREY5 : GREY2}`,
    "& .p-dialog-header": {
      backgroundColor: darkMode ? BLACK : GREY1,
      color: darkMode ? GREY1 : GREY5,
      borderBottom: `1px solid ${darkMode ? GREY5 : GREY2}`,
    },
    "& .p-dialog-content": {
      backgroundColor: darkMode ? GREY6 : WHITE,
      color: darkMode ? GREY1 : GREY5,
    },
    "& .p-dialog-footer": {
      backgroundColor: darkMode ? BLACK : GREY1,
      borderTop: `1px solid ${darkMode ? GREY5 : GREY2}`,
    },
  },
}));

export const UICookieBanner: React.FC<
  UICookieBannerProps & {darkMode: boolean}
> = ({
  header,
  message,
  visible,
  acceptButtonLabel,
  onAccept,
  styles = {},
  darkMode,
}) => {
  const {classes} = useStyles({darkMode});

  return (
    <Dialog
      className={classes.dialog}
      header={header}
      position={"bottom"}
      visible={visible}
      modal
      dismissableMask={false}
      closable={false}
      onHide={() => ""}
      footer={
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Button
            icon="pi pi-check"
            label={acceptButtonLabel}
            onClick={onAccept}
            style={{backgroundColor: BLUE1, border: "none"}}
          />
        </div>
      }
      style={styles}
    >
      <div style={{display: "flex", alignItems: "center"}}>
        <span
          className={"pi pi-info-circle"}
          style={{marginRight: "10px", fontSize: "xx-large"}}
        />
        <span>{message}</span>
      </div>
    </Dialog>
  );
};
