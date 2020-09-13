import React, { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import {
  Editor as DraftEditor,
  EditorState,
  CompositeDecorator,
  Modifier
} from 'draft-js'
import { Box, Button } from '@material-ui/core'
import { Pipe } from './Pipe'

function findPipeEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'PIPE'
    )
  }, callback)
}

const compositeDecorator = new CompositeDecorator([
  {
    strategy: findPipeEntities,
    component: Pipe
  }
])

export function Editor() {
  const editorRef = useRef()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(compositeDecorator)
  )

  const handlePipeInsert = () => {
    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()

    const id = uuid()
    contentState.createEntity('PIPE', 'IMMUTABLE', {
      id
    })

    const entityKey = contentState.getLastCreatedEntityKey()

    const newContentState = Modifier.replaceText(
      contentState,
      selection,
      `{{pipe-${id.slice(-6)}}}`,
      null,
      entityKey
    )
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    )
    setEditorState(newEditorState)
    setTimeout(() => editorRef.current.focus(), 0)
  }

  return (
    <>
      <Button color="primary" variant="contained" onClick={handlePipeInsert}>
        Insert Pipe
      </Button>
      <Box border="solid blue 1px" width="80ch" padding={1} marginY={2}>
        <DraftEditor
          ref={editorRef}
          style={editorStyles}
          editorState={editorState}
          onChange={setEditorState}
        />
      </Box>
    </>
  )
}

const editorStyles = {
  backgroundColor: 'pink',
  border: 'solid blue 2px',
  borderRadius: '5px'
}
