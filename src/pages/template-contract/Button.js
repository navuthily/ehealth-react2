const btnStyle = {
    padding: "10px 30px",
    backgroundColor: "none",
    border: "1px solid black",
    borderRadius: "5px",
  };
  
  const ApplyButton = ({ title = "Lưu", click }) => (
    <button style={btnStyle} onClick={click}>
      {title}
    </button>
  );
  
  export default ApplyButton;
  