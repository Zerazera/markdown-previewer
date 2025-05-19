import styled from "@emotion/styled"
import { Marked } from "marked"
import DOMPurify from "dompurify"
import TopBar from "./TopBar"

const MarkdownText = styled.section<{$height: number, $fitContent: boolean}>`
    font-size: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: ${({$height, $fitContent}) => $fitContent ? 'fit-content' : `${$height}vh`};
    transition: height 0.2s linear;
    margin-top: 5%;
`

const Preview = styled.main<{$showPreviewerArea: boolean, $fitContent: boolean}>`
    display: ${({$showPreviewerArea}) => $showPreviewerArea ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 5px;
    height: 100%;
    overflow-y: ${({$fitContent}) => $fitContent ? 'hidden' : 'scroll'};
    color: black;

    code, pre {
        background-color: #D3D3D3;
    }

    img, pre {
        width: 100%;
    }

    table {
        display: table;
        border: 3px solid black;
        border-collapse: collapse;
    }

    td {
        border: 1px solid black;
        border-right: 2px solid black;
        padding: 5px;
    }

    th {
        border: 2px solid black;
        padding: 5px;
    }

    ul, li {
        text-align: left;
        padding-left: 0;
    }

    blockquote {
        border-left: 5px solid grey;
        padding-left: 10px;
    }
`

type PreviewerProps = {
    text: string,
    increasePreviewerHeight: () => false | void,
    decreasePreviewerHeight: () => false | void,
    previewerHeight: number,
    togglePreviewerFit: () => void,
    previewerFitContent: boolean
}

export default function Previewer({text, increasePreviewerHeight, decreasePreviewerHeight, previewerHeight, togglePreviewerFit, previewerFitContent}: PreviewerProps) {
    const marked = new Marked({gfm: true, breaks: true, async: false})

    return (
        <MarkdownText $height={previewerHeight} $fitContent={previewerFitContent}>
            <TopBar 
                caption="Previewer" 
                increaseHeight={increasePreviewerHeight} 
                decreaseHeight={decreasePreviewerHeight} 
                windowHeight={previewerHeight} 
                toggleFit={togglePreviewerFit}
                fitContent={previewerFitContent}    
            />
            <Preview 
                id="preview" 
                $showPreviewerArea={previewerFitContent || previewerHeight > 0} 
                $fitContent={previewerFitContent} 
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize('' + marked.parse(text))}} 
            />
        </MarkdownText>
    )
}