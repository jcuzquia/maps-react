import viteLogo from "./../../public/vite.svg";

export const ReactLogo = () => {
  return (
    <img
      src={viteLogo}
      alt={"Vite Logo"}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
      }}
    />
  );
};
