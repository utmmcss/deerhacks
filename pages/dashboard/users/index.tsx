import Head from 'next/head'
import { Suspense, useEffect, useState } from 'react'

import AssignmentIcon from '@mui/icons-material/Assignment'
import CloseIcon from '@mui/icons-material/Close'
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Fade from '@mui/material/Fade'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridFooterContainer,
  GridPagination,
  GridRenderCellParams,
  GridRowParams,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'

import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import UserStatusFilter from '@/components/Dashboard/UserStatusFilter'
import UserStatusSelect from '@/components/Dashboard/UserStatusSelect'
import BackButton from '@/components/Shared/BackButton'
import FullPageLoader from '@/components/Shared/FullPageLoader'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useUserList } from '@/hooks/User/useUserList'
import Error500Page from '@/pages/500'
import { UserListData, UserStatus } from '@/types/User'

const statusWithoutApplications: UserStatus[] = [
  'admin',
  'moderator',
  'volunteer',
  'pending',
  'registering',
  'unverified',
]

const PAGE_SIZE = 2

// hanatodo add chips to side of data settings one for each application data & statuses
// statuses are combined into one chip
// clicking on a chip opens modal with both options
// add full width table indication somewhere else (expand/minimize icon)

type GetColumnsProps = {
  users: UserListData[]
  setUsers: (users: UserListData[]) => void
  setApplicationData: (data: UserListData) => void
  originalData: UserListData[]
}

const getColumns = (props: GetColumnsProps): GridColDef[] => {
  const { users, setUsers, setApplicationData, originalData } = props
  return [
    {
      field: 'first_name',
      headerName: 'First Name',
      description: 'First Name',
      hideable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      description: 'Last Name',
      hideable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'id',
      headerName: 'Username',
      description: 'Discord Username',
      hideable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email',
      flex: 1.5,
      minWidth: 150,
    },
    {
      // hanatodo cant change status until feature toggle is on
      field: 'status',
      headerName: 'Status',
      description: 'Current User Status: Status visible to user & discord',
      flex: 1,
      minWidth: 100,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].status !== params.row.status ? 'modified' : ''
      },
      renderCell: (params: GridRenderCellParams) => (
        <UserStatusSelect
          value={params.row.status}
          onChange={(e) => {
            params.row.status = e.target.value
            const newUsers = users.slice()
            newUsers[params.row.index] = params.row
            setUsers(newUsers)
          }}
        />
      ),
    },
    {
      field: 'internal_status',
      headerName: 'Internal Status',
      description:
        'Internal User Status: Status only visible internally, use to stage potential status before committing',
      flex: 1,
      minWidth: 100,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].internal_status !== params.row.internal_status
          ? 'modified'
          : ''
      },
      renderCell: (params: GridRenderCellParams) => (
        <UserStatusSelect
          value={params.row.internal_status}
          onChange={(e) => {
            params.row.internal_status = e.target.value
            const newUsers = users.slice()
            newUsers[params.row.index] = params.row
            setUsers(newUsers)
          }}
          isClearable
        />
      ),
    },
    {
      field: 'internal_notes',
      headerName: 'Internal Notes',
      description: 'Internal Notes: Notes only visible internally',
      flex: 2,
      minWidth: 200,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].internal_notes !== params.row.internal_notes
          ? 'modified'
          : ''
      },
      renderCell: (params: GridRenderCellParams) => (
        <TextField
          inputProps={{ maxLength: 128 }}
          value={params.row.internal_notes}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            params.row.internal_notes = e.target.value
            const newUsers = users.slice()
            newUsers[params.row.index] = params.row
            setUsers(newUsers)
          }}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
      ),
    },
    {
      field: 'application',
      headerName: 'Application',
      description: 'Application Data',
      flex: 1,
      minWidth: 100,
      sortable: false,
      type: 'actions',
      headerAlign: 'left',
      getActions: (params: GridRowParams) => [
        statusWithoutApplications.includes(params.row.status) ? (
          <></>
        ) : (
          <Tooltip
            title={!params.row.application ? 'Disabled in Data Settings' : 'View Application'}
            key={params.row.username}
          >
            <span>
              <GridActionsCellItem
                icon={<AssignmentIcon sx={{ m: '0.5rem' }} />}
                onClick={() => {
                  setApplicationData(params.row as UserListData)
                }}
                label="View Application"
                disabled={!params.row.application}
              />
            </span>
          </Tooltip>
        ),
      ],
    },
  ]
}

const getRows = (data: UserListData[]) => {
  return data.map((user, i) => {
    return {
      ...user,
      index: i,
      id: user.username,
    }
  })
}

type Props = {
  isLoading: boolean
  data: UserListData[]
  page: number
  setPage: (i: number) => void
  totalUsers: number
}

// hanatodo admin-user-update

// hanatodo add query from filter in url if theres time

const UsersTable = (props: Props) => {
  const { isLoading, data, page, setPage, totalUsers } = props

  const [users, setUsers] = useState(data)
  useEffect(() => {
    setUsers(data)
  }, [data])

  const [applicationData, setApplicationData] = useState<UserListData>()

  const TableToolbar = () => {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
        <Box
          component="div"
          sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}
        >
          <Button startIcon={<SettingsIcon />} sx={{ gap: 0, p: '0.75rem 1rem' }}>
            Data Settings
          </Button>
        </Box>
        <GridToolbarQuickFilter sx={{ p: '0.6rem 0.8rem' }} />
      </GridToolbarContainer>
    )
  }

  const TableFooter = () => {
    return (
      <GridFooterContainer
        sx={{ justifyContent: { xs: 'end', xl: 'space-between' }, px: '0.5rem' }}
      >
        <Tooltip title="Toggle Full Width">
          <IconButton sx={{ display: { xs: 'none', xl: 'flex' } }}>
            {true ? ( // replace with full width state
              <FullscreenExitRoundedIcon />
            ) : (
              <FullscreenRoundedIcon />
            )}
          </IconButton>
        </Tooltip>
        <GridPagination sx={{ p: '0.75rem 0' }} />
      </GridFooterContainer>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={getRows(users)}
        columns={getColumns({ users, setUsers, setApplicationData, originalData: data })}
        slots={{
          toolbar: TableToolbar,
          footer: TableFooter,
        }}
        pageSizeOptions={[PAGE_SIZE]}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalUsers}
        density="comfortable"
        paginationModel={{ page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(model) => setPage(model.page)}
        disableRowSelectionOnClick
      />
      <Suspense>
        {applicationData && (
          <Dialog
            open
            onClose={() => setApplicationData(undefined)}
            TransitionComponent={Grow}
            PaperProps={{
              elevation: 2,
              sx: { m: '1rem', maxHeight: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' },
            }}
            maxWidth="xl"
          >
            <DialogTitle
              sx={{ m: 0, p: 2, textAlign: 'start' }}
            >{`${applicationData.first_name} ${applicationData.last_name}'s Application`}</DialogTitle>
            <IconButton
              onClick={() => setApplicationData(undefined)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: 'text.secondary',
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent sx={{ pb: '1.5rem' }}>
              <FormReview
                user={applicationData}
                application={{
                  ...applicationData.application,
                  resume_file_name: applicationData.resume_file_name,
                  resume_link: applicationData.resume_link,
                }}
                hideDisclaimer
              />
            </DialogContent>
          </Dialog>
        )}
      </Suspense>
    </div>
  )
}

const UsersTableLoader = () => {
  const { user, loading, authenticated } = useAuth()

  const allowedStatuses = ['admin', 'moderator']

  const enabled =
    authenticated &&
    user?.status &&
    allowedStatuses.includes(user.status) &&
    user.status !== 'registering'

  const [fullWidth, setFullWidth] = useState(false)

  const [full, setFull] = useState(false)
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState<UserStatus[]>([])

  const [params, setParams] = useState({ full, page: page + 1, status })

  const { data, isLoading, isError } = useUserList({
    params,
    enabled,
  })

  if (user?.status && !allowedStatuses.includes(user.status)) {
    return (
      <FullPageLoader
        show
        pulse={false}
        text="User unauthorized to register."
        buttonText="Go Back"
        buttonLink="/dashboard"
      />
    )
  }

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Users Table | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            maxWidth={fullWidth ? false : 'lg'}
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography
              variant="h1"
              display="flex"
              alignItems="center"
              textAlign="left"
              gap="0.5rem"
            >
              Users Table
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch value={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />
                }
                label="Full Width"
              />
              <FormControlLabel
                control={<Switch value={full} onChange={(e) => setFull(e.target.checked)} />}
                label="Include Application Data"
              />
              <UserStatusFilter
                values={status}
                onChange={(status) => {
                  setStatus(status)
                  setPage(0)
                }}
              />
              <Button
                onClick={() => {
                  // hanatodo warn if not saved
                  setParams({ full, page: page + 1, status })
                }}
              >
                Apply Filter(s)
              </Button>
            </FormGroup>
            <UsersTable
              isLoading={isLoading}
              data={data?.users ?? []}
              page={page}
              setPage={(page) => {
                // hanatodo warn if not saved
                setPage(page)
                setParams({ full, page: page + 1, status })
              }}
              totalUsers={data?.pagination.total_users ?? 0}
            />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default UsersTableLoader
