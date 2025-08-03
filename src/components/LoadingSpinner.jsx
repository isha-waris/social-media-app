export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        role="status"
        style={{ width: "5rem", height: "5rem", margin: 50 }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
