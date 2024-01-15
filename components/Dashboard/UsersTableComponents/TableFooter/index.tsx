import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { GridFooterContainer, GridPagination } from '@mui/x-data-grid'

type Props = {
  fullWidth: boolean
  setFullWidth: (fullWidth: boolean) => void
}

const TableFooter = (props: Props) => {
  const { fullWidth, setFullWidth } = props

  const desktop = useMediaQuery('(min-width:1400px)')

  return (
    <GridFooterContainer sx={{ justifyContent: desktop ? 'space-between' : 'end', px: '0.5rem' }}>
      <Tooltip title="Toggle Full Width">
        <IconButton
          sx={{ display: desktop ? 'flex' : 'none' }}
          onClick={() => setFullWidth(!fullWidth)}
        >
          {fullWidth ? <FullscreenExitRoundedIcon /> : <FullscreenRoundedIcon />}
        </IconButton>
      </Tooltip>
      <GridPagination showFirstButton showLastButton sx={{ p: '0.75rem 0' }} />
    </GridFooterContainer>
  )
}

export default TableFooter
