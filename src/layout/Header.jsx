import useGameContext from "../hooks/useGameContext"

const Header = () => {
    const { state } = useGameContext();

    return (
        <div id="header">
            <h1>GTP</h1>
            <p>Points: {state.mainScore}</p>
        </div>
    )
}

export default Header;