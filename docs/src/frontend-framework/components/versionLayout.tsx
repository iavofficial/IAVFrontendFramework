import { useParams } from "react-router-dom";
import Version1_1_0 from "../versions/1.1.0";
import Version1_3_0 from "../versions/1.3.0";
import Version2_0_0 from "../versions/2.0.0";
import React from "react";

export const VERSIONS = ["1.1.0", "1.3.0", "2.0.0"];

const VersionLayout: React.FC = () => {
  const { version } = useParams<{ version: string }>();

  const versions: Record<string, JSX.Element> = {
    "1.1.0": <Version1_1_0 />,
    "1.3.0": <Version1_3_0 />,
    "2.0.0": <Version2_0_0 />,
  };

  return versions[version ?? ""];
};

export default VersionLayout;
