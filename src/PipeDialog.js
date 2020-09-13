import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

export function PipeDialog({ closeDialog, id }) {
  const handleClose = () => {
    closeDialog()
  }

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{id}</DialogTitle>
      <DialogContent>{id}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
