import "./../index.css";

export const Loading = () => {
  return (
    <div className="loading-map flex justify-center items-center">
      <div className="text-center">
        <h3>Espere por favor</h3>
        <span>Localizando...</span>
      </div>
    </div>
  );
};
