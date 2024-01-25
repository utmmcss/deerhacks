import { Suspense, useState } from 'react'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import SettingsIcon from '@mui/icons-material/Settings'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'

import LoadingButton from '@/components/Dashboard/LoadingButton'
import Modal from '@/components/Dashboard/Modal'
import UserStatusFilter from '@/components/Dashboard/UsersTableComponents/UserStatusFilter'
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
  const [all_users, setAllUsers] = useState(queryParams.all_users)
  const [status, setStatus] = useState<UserStatus[]>(queryParams.status)

  const handleOpen = () => {
    setFull(queryParams.full)
    setAllUsers(queryParams.all_users)
    setStatus(queryParams.status)
    setOpenDataSettings(true)
  }

  const noStatusChange =
    status.length === queryParams.status.length &&
    status.every((value, index) => value === queryParams.status[index])

  const noAllUsersChange = all_users === queryParams.all_users

  const noChanges = full === queryParams.full && noStatusChange && noAllUsersChange

  return (
    <>
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
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
          {all_users ? (
            <>
              <GridToolbarFilterButton />
              <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            </>
          ) : (
            <Tooltip title="Fetch all user data to export">
              <span>
                <GridToolbarExport disabled />
              </span>
            </Tooltip>
          )}
          {queryParams.full && (
            <Chip
              color="primary"
              label="Data: Applications Included"
              icon={<BubbleChartIcon />}
              onClick={handleOpen}
              disabled={isLoading}
            />
          )}
          {queryParams.all_users && (
            <Chip
              color="primary"
              label="Data: All Users"
              icon={<SupervisedUserCircleIcon />}
              onClick={handleOpen}
              disabled={isLoading}
            />
          )}
          {!!queryParams.status.length && (
            <Chip
              color="primary"
              label={`Statuses: ${queryParams.status.join(', ')}`}
              icon={<AccountCircleOutlinedIcon />}
              onClick={handleOpen}
              disabled={isLoading}
            />
          )}
        </Box>
        <GridToolbarQuickFilter
          placeholder={all_users ? 'Search All Users' : 'Search Current Page'}
          sx={{
            p: '0.6rem 0.8rem',
            '& .MuiInputBase-root': {
              fontSize: '0.9375rem',
              '& input': {
                mx: '0.5rem',
                minWidth: '10.5rem',
              },
            },
          }}
        />
      </GridToolbarContainer>
      <Suspense>
        <Modal
          open={openDataSettings}
          title="Data Settings"
          onClose={() => setOpenDataSettings(false)}
          primaryButton={{
            text: 'Apply Changes',
            disabled: noChanges,
            onClick: () => {
              applyFilters({
                full,
                page: !noStatusChange || all_users ? 1 : queryParams.page,
                all_users: all_users,
                status: all_users ? [] : status,
              })
              setOpenDataSettings(false)
            },
          }}
        >
          <FormGroup sx={{ gap: '2rem' }}>
            <FormControlLabel
              control={
                <Switch checked={full} value={full} onChange={(e) => setFull(e.target.checked)} />
              }
              label="Include Application Data"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={all_users}
                  value={all_users}
                  onChange={(e) => setAllUsers(e.target.checked)}
                />
              }
              label="Fetch All User Data"
            />
            {all_users ? (
              <Tooltip title="Use table column filters when fetching all data">
                <span>
                  <UserStatusFilter values={[]} onChange={setStatus} disabled />
                </span>
              </Tooltip>
            ) : (
              <UserStatusFilter values={status} onChange={setStatus} />
            )}
          </FormGroup>
        </Modal>
      </Suspense>
    </>
  )
}

export default TableToolbar
