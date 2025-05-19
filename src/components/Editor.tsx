import styled from "@emotion/styled"
import TopBar from "./TopBar"
import { useState, useRef, useEffect } from "react"

const Section = styled.section<{$height: number, $fitContent: boolean}>`
    width: 100%;    
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5%;
    height: ${({$height, $fitContent}) => $fitContent ? 'fit-content' : `${$height}vh`};
    transition: height 0.2s linear; 

    @media screen and (width < 400px) {
        margin-bottom: 10%;
    }

`

const Textarea = styled.textarea<{$showTextArea: boolean, $scrollHeight: number, $fitContent: boolean}>`
    display: ${({$showTextArea}) => $showTextArea ? 'block' : 'none'};
    width: 100%;
    resize: none;
    height: ${({$fitContent, $scrollHeight}) => $fitContent ? `${$scrollHeight}px` : '100%'};
    background-color: black;
    color: lightgreen;
    overflow-y: ${({$fitContent}) => $fitContent ? 'hidden' : 'scroll'};
`

type EditorProps = {
    text: string,
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    increaseEditorHeight: () => false | void,
    decreaseEditorHeight: () => false | void,
    editorHeight: number,
    toggleEditorFit: () => void,
    editorFitContent: boolean
}

export default function Editor({text, handleChange, increaseEditorHeight, decreaseEditorHeight, editorHeight, toggleEditorFit, editorFitContent}: EditorProps) {
    const [textAreaScrollHeight, setTextAreaScrollHeight] = useState(0)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if ((editorFitContent || textAreaScrollHeight === 0) && textAreaRef.current) {
            const currentHeight = textAreaRef.current.style.height
            textAreaRef.current.style.height = "auto"
            setTextAreaScrollHeight(textAreaRef.current.scrollHeight)
            textAreaRef.current.style.height = currentHeight
        }
    }, [text])
    
    return (
        <Section $height={editorHeight} $fitContent={editorFitContent}>
            <TopBar 
                caption="Editor" 
                increaseHeight={increaseEditorHeight} 
                decreaseHeight={decreaseEditorHeight} 
                windowHeight={editorHeight} 
                toggleFit={toggleEditorFit}
                fitContent={editorFitContent}
            />
            <Textarea 
                id="editor" 
                onChange={handleChange} 
                $showTextArea={editorFitContent || editorHeight > 0} 
                defaultValue={text} 
                ref={textAreaRef}
                $scrollHeight={textAreaScrollHeight}
                $fitContent={editorFitContent}
            />
        </Section>
    )
}