import Button from "./Button";

const Error = ({ text, getJobs }) => {
  return (
    <div className="error-container">
      <p>
        Üzgünüz verilere erişirken bir hata oluştu <span>{text}</span>
      </p>

      <Button getJobs={getJobs} />
    </div>
  );
};

export default Error;
