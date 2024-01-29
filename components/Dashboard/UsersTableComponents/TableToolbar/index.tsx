import { Suspense, useState } from 'react'

import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import FaceIcon from '@mui/icons-material/Face'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import { GridToolbarContainer } from '@mui/x-data-grid'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import Modal from '@/components/Dashboard/Modal'
import UserStatusFilter from '@/components/Dashboard/UsersTableComponents/UserStatusFilter'
import theme from '@/styles/theme'
import { UserListParams, UserStatus } from '@/types/User'

type Props = {
  queryParams: UserListParams
  applyFilters: (newParams: UserListParams) => void
  onSave: () => void
  hasUnsavedChanges?: boolean
  isLoading?: boolean
}

const TableToolbar = (props: Props) => {
  const { queryParams, applyFilters, onSave, hasUnsavedChanges = false, isLoading = false } = props

  const [openDataSettings, setOpenDataSettings] = useState(false)

  const [full, setFull] = useState(queryParams.full)
  const [statuses, setStatuses] = useState<UserStatus[]>(queryParams.statuses)
  const [internal_statuses, setInternalStatuses] = useState<(UserStatus | 'empty')[]>(
    queryParams.internal_statuses
  )
  const [search, setSearch] = useState(queryParams.search)

  const handleOpen = () => {
    setFull(queryParams.full)
    setStatuses(queryParams.statuses)
    setInternalStatuses(queryParams.internal_statuses)
    setSearch(queryParams.search)
    setOpenDataSettings(true)
  }

  const noStatusChange =
    statuses.length === queryParams.statuses.length &&
    statuses.every((value, index) => value === queryParams.statuses[index])

  const noInternalStatusChange =
    internal_statuses.length === queryParams.internal_statuses.length &&
    internal_statuses.every((value, index) => value === queryParams.internal_statuses[index])

  const noPageChange = noStatusChange && noInternalStatusChange && search === queryParams.search
  const noChanges = full === queryParams.full && noPageChange
  const isDefault =
    statuses.length === 0 && internal_statuses.length === 0 && search.length === 0 && !full

  return (
    <>
      <GridToolbarContainer
        sx={{
          backgroundColor: theme.palette.background.default,
          justifyContent: 'space-between',
          position: 'sticky',
          zIndex: 1,
          top: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            p: '0.5rem',
            maxWidth: '100%',
          }}
        >
          <LoadingButton
            loading={isLoading}
            disabled={!hasUnsavedChanges}
            size="medium"
            onClick={onSave}
            sx={{ p: '0.75rem 1.25rem' }}
          >
            Save Changes
          </LoadingButton>
          <Button
            disabled={isLoading}
            startIcon={<SettingsIcon />}
            onClick={handleOpen}
            sx={{ gap: 0, p: '0.75rem 1rem' }}
          >
            Data Settings
          </Button>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem',
            p: '0.5rem',
            mx: '0.5rem',
            maxWidth: '100%',
          }}
        >
          <>
            {queryParams.full && (
              <Chip
                color="primary"
                label="applications"
                icon={<BubbleChartIcon />}
                onClick={handleOpen}
                disabled={isLoading}
              />
            )}
            {!!queryParams.search && (
              <Chip
                color="primary"
                label={queryParams.search}
                icon={<SearchRoundedIcon />}
                onClick={handleOpen}
                disabled={isLoading}
                sx={{ textTransform: 'lowercase' }}
              />
            )}
            {!!queryParams.statuses.length && (
              <Chip
                color="primary"
                label={`status: ${queryParams.statuses.join(', ')}`}
                icon={<FaceIcon />}
                onClick={handleOpen}
                disabled={isLoading}
              />
            )}
            {!!queryParams.internal_statuses.length && (
              <Chip
                color="primary"
                label={`internal: ${queryParams.internal_statuses.join(', ')}`}
                icon={<AdminPanelSettingsRoundedIcon />}
                onClick={handleOpen}
                disabled={isLoading}
              />
            )}
          </>
        </Box>
      </GridToolbarContainer>
      <Suspense>
        <Modal
          open={openDataSettings}
          title="Data Settings"
          onClose={() => setOpenDataSettings(false)}
          dialogActionsProps={{ sx: { justifyContent: 'space-between' } }}
          primaryButton={{
            text: 'Apply Changes',
            disabled: noChanges,
            onClick: () => {
              applyFilters({
                full,
                page: noPageChange ? queryParams.page : 1,
                statuses,
                internal_statuses,
                search,
              })
              setOpenDataSettings(false)
            },
          }}
          secondaryButton={{
            text: 'Clear All',
            disabled: isDefault,
            onClick: () => {
              setFull(false)
              setStatuses([])
              setInternalStatuses([])
              setSearch('')
            },
          }}
        >
          <FormGroup sx={{ gap: '1rem' }}>
            <Box
              component="div"
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              alignItems="center"
              gap="1rem"
              p="4px"
            >
              <FormControlLabel
                control={
                  <Switch checked={full} value={full} onChange={(e) => setFull(e.target.checked)} />
                }
                label="Include Applications"
                sx={{ width: '100%' }}
              />
              <TextField
                placeholder="Search User Fields"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="standard"
                autoComplete="off"
                style={{ fontSize: 'inherit' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <UserStatusFilter
              label="User Status Filters"
              values={statuses}
              onChange={setStatuses}
            />
            <UserStatusFilter
              label="Internal Status Filters"
              values={internal_statuses}
              onChange={setInternalStatuses}
              hasEmpty
            />
          </FormGroup>
        </Modal>
      </Suspense>
    </>
  )
}

export default TableToolbar
