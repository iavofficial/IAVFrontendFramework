type Profile = {
  moduleKey: string;
  isDefaultModule: boolean;
  shortDescription: string;
  installCmd?: string;
};

export const ModuleProfile = (props: Profile) => {
  const Key = (props: { text: string }) => (
    <div style={{ color: "#041e96", marginBottom: "5px", fontSize: "1.2em" }}>
      <strong>{props.text}</strong>
    </div>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "fit-content",
          marginBottom: "50px",
        }}
      >
        <div>
          <Key text="Key" /> {props.moduleKey}
        </div>
        <div>
          <Key text="Default module" /> {props.isDefaultModule ? "Yes" : "No"}
        </div>
        {props.installCmd && (
          <div>
            <Key text="Install with" /> {props.installCmd}
          </div>
        )}
        <div>
          <Key text="Description" /> {props.shortDescription}
        </div>
      </div>
    </>
  );
};
