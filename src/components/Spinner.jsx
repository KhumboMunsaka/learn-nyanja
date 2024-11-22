import { ThreeDots } from "react-loader-spinner";
function Spinner() {
  return (
    <ThreeDots
      visible={true}
      height="20"
      width="20"
      color="#fff"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Spinner;
