import { useState } from 'react'
import styled from '@emotion/styled'
import Editor from './components/Editor'
import Previewer from './components/Previewer'
import { initialText } from './initialText'
import { windowHeights } from './windowHeights'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown, faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;

  @media screen and (width < 600px) {
    width: 90%;
  }
`

const Title = styled.h1`
  font-size: 2rem;
`

const UnorderedList = styled.ul`
  text-align: left;
  font-size: 1.1rem;
  list-style-type: none;

  li {
    margin-block: 5px;
  }
`

export default function App() {
  const [text, setText] = useState(initialText)

  const [components, setComponents] = useState({
    editor: {
      height: 50,
      fitContent: false
    },
    previewer: {
      height: 100,
      fitContent: false
    }
  })

  type ElementName = 'editor' | 'previewer'

  const increaseHeight = (elementName: ElementName) => components[elementName].height < windowHeights[windowHeights.length - 1] &&
    setComponents(prev => ({...prev, [elementName]: {...prev[elementName], height: windowHeights[windowHeights.findIndex(x => x === prev[elementName].height) + 1]}}))
  const decreaseHeight = (elementName: ElementName) => components[elementName].height > windowHeights[0] &&
  setComponents(prev => ({...prev, [elementName]: {...prev[elementName], height: windowHeights[windowHeights.findIndex(x => x === prev[elementName].height) - 1]}}))
  const toggleFitContent = (elementName: ElementName) => setComponents(prev => ({...prev, [elementName]: {...prev[elementName], 
    fitContent: !prev[elementName].fitContent}}))

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.currentTarget.value)

  return (
    <Body>
      <header>
        <Title>Markdown Previewer</Title>
      </header>
      <Main>
        <section>
          <UnorderedList>
            <li><FontAwesomeIcon icon={faMaximize} /><span> - Fit the window to the content</span></li>
            <li><FontAwesomeIcon icon={faMinimize} /><span> - Unfit the window to the content</span></li>
            <li><FontAwesomeIcon icon={faAngleDown} /><span> - Increase the window size</span></li>
            <li><FontAwesomeIcon icon={faAngleUp} /><span> - Decrease the window size</span></li>
          </UnorderedList>
        </section>
        <Editor 
          text={text} 
          handleChange={handleChange} 
          increaseEditorHeight={() => increaseHeight('editor')} 
          decreaseEditorHeight={() => decreaseHeight('editor')}
          editorHeight={components.editor.height}
          toggleEditorFit={() => toggleFitContent('editor')}
          editorFitContent={components.editor.fitContent}
        />

        <Previewer 
          text={text} 
            increasePreviewerHeight={() => increaseHeight('previewer')} 
            decreasePreviewerHeight={() => decreaseHeight('previewer')} 
            previewerHeight={components.previewer.height}
            togglePreviewerFit={() => toggleFitContent('previewer')}
            previewerFitContent={components.previewer.fitContent}
        />

      </Main>
    </Body>
  )
}