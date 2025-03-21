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
import makeStyles from "../../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "auto",
    marginBottom: "16px",
  },
}));

interface Props {
  src: string;
  alt?: string;
  className?: string;
  fromGhPages?: boolean;
}

const Image: React.FC<Props> = (props) => {
  const { src, alt, className, fromGhPages } = props;

  const { classes } = useStyles();

  return (
    <img
      src={
        fromGhPages
          ? `https://iavofficial.github.io/IAVFrontendFramework/${src}`
          : src
      }
      alt={alt}
      className={`${classes.image} ${className ? className : ""}`}
    />
  );
};

export default Image;
