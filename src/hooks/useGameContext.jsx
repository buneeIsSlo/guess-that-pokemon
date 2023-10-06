import { useContext } from "react";
import { GameContext } from "../context/GameContext";

const useGameContext = () => {
    const context = useContext(GameContext);
    if(!context) {
        throw new Error("useGameContext must be used within GameContextProvider");
    }

    return context;
}

export default useGameContext;