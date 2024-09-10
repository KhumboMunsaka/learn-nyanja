import { useContext } from "react";
import ModContext from "../contexts/MODContext";

function MemeOfTheDay() {
  const { memeOfTheDay } = useContext(ModContext);
  console.log(memeOfTheDay);
  return (
    <div>
      MOD
      {memeOfTheDay ? (
        <img src={memeOfTheDay} alt="Meme Of the Day3" />
      ) : (
        <p>There is no meme of the day...yet :(</p>
      )}
    </div>
  );
}

export default MemeOfTheDay;
