import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"
import { windowHeights } from "../windowHeights"

const Header = styled.header`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    text-align: center;
    background-color: grey;
    padding: 5px;
    border-radius: 5px 5px 0 0;
    color: white;
    font-weight: bold;
    font-size: 1.1em;
`

const IconSpan = styled.span`
    display: flex;
    gap: 10px;
`

const Button = styled.button`
    border: none;
    background-color: grey;
    color: white;
    cursor: pointer;

    &:hover {
        color: black;
    }

    &:disabled {
        cursor: not-allowed;
        color: darkgrey;
    }
`

type TopBarProps = {
    caption: string,
    increaseHeight: () => false | void,
    decreaseHeight: () => false | void,
    windowHeight: number,
    toggleFit: () => void,
    fitContent: boolean
}

export default function TopBar({caption, increaseHeight, decreaseHeight, windowHeight, toggleFit, fitContent} : TopBarProps) {
    return (
        <Header>
            <span>{caption}</span>
            <IconSpan>
                <Button onClick={toggleFit}>
                    {(fitContent && <FontAwesomeIcon icon={faMinimize} />) || <FontAwesomeIcon icon={faMaximize} />}
                </Button>

                <Button
                    onClick={decreaseHeight} 
                    disabled={fitContent || windowHeight === windowHeights[0]}
                >
                    <FontAwesomeIcon icon={faAngleUp} />
                </Button>
                
                <Button
                    onClick={increaseHeight} 
                    disabled={fitContent || windowHeight === windowHeights[windowHeights.length - 1]}
                >
                    <FontAwesomeIcon icon={faAngleDown} />
                </Button>
            
            </IconSpan>
        </Header>
    )
}