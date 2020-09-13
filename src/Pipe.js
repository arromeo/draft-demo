import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { PipeDialog } from './PipeDialog'

const useStyles = makeStyles(() => ({
  pipeLink: {
    color: 'blue',

    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
      opacity: 0.7
    }
  }
}))

export function Pipe({ children, contentState, entityKey }) {
  const classes = useStyles()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const closeDialog = useCallback(() => {
    setDialogIsOpen(false)
  }, [setDialogIsOpen])

  const handleDialogOpen = () => setDialogIsOpen(true)

  const { id } = contentState.getEntity(entityKey).getData()

  return (
    <>
      <Box component="span" marginX="4px">
        <Typography
          className={classes.pipeLink}
          component="span"
          onClick={handleDialogOpen}
        >
          {children}
        </Typography>
      </Box>
      {dialogIsOpen && <PipeDialog closeDialog={closeDialog} id={id} />}
    </>
  )
}
