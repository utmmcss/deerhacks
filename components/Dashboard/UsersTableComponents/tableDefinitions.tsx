import { Dispatch, ReactNode, SetStateAction } from 'react'

import AssignmentIcon from '@mui/icons-material/Assignment'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import {
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid'

import InternalNotesField from '@/components/Dashboard/UsersTableComponents/InternalNotesField'
import UserStatusSelect from '@/components/Dashboard/UsersTableComponents/UserStatusSelect'
import { UserListData, UserStatus, UserUpdateBatchReq } from '@/types/User'

export const statusColors: {
  [key in UserStatus]: string
} = {
  admin: '#ffffff',
  moderator: '#ffffff',
  guest: '#ffffff',
  volunteer: '#b1dbff',
  pending: '#ffa726',
  registering: '#ffadf4',
  applied: '#bb86fc',
  selected: '#bcffb1',
  accepted: '#53e25a',
  attended: '#56caff',
  rejected: '#ff574e',
}

export const getRows = (data: UserListData[]) => {
  return data.map((user, i) => {
    return {
      ...user,
      index: i,
      id: user.username,
    }
  })
}

const statusWithCompleteApplications: UserStatus[] = ['applied', 'selected', 'accepted', 'attended']

const TableCellValue = (value: ReactNode, title?: string) => {
  return (
    <Tooltip title={title ?? value} placement="bottom-start" PopperProps={{ sx: { zIndex: 1000 } }}>
      <Box component="div" display="flex" alignItems="center" height="100%" width="100%">
        <span
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </span>
      </Box>
    </Tooltip>
  )
}

type GetColumnsProps = {
  users: UserListData[]
  setUsers: (users: UserListData[]) => void
  setUpdateReq: Dispatch<SetStateAction<UserUpdateBatchReq>>
  setApplicationData: (data: UserListData) => void
  originalData: UserListData[]
  userStatus: UserStatus
  statusUpdateToggle: boolean
}

export const getColumns = (props: GetColumnsProps): GridColDef[] => {
  const {
    users,
    setUsers,
    setUpdateReq,
    setApplicationData,
    originalData,
    userStatus,
    statusUpdateToggle,
  } = props

  const getDisabledForModerator = (rowStatus: UserStatus) => {
    return ['admin', 'moderator'].includes(rowStatus) && userStatus !== 'admin'
  }

  const updateValue = (
    key: 'status' | 'internal_status' | 'internal_notes',
    newValue: string,
    params: GridRenderCellParams
  ) => {
    params.row[key] = newValue
    const newUsers = users.slice()
    newUsers[params.row.index] = params.row
    setUsers(newUsers)
    setUpdateReq((prev) => {
      const prevId = prev.users.findIndex((update) => update.discord_id === params.row.discord_id)
      const sameAsOriginal = originalData[params.row.index][key] === newValue
      if (sameAsOriginal) {
        if (prevId !== -1) {
          delete prev.users[prevId].fields[key]
          if (Object.keys(prev.users[prevId].fields).length === 0) {
            prev.users.splice(prevId, 1)
          }
        }
      } else {
        if (prevId === -1) {
          prev.users.push({
            discord_id: params.row.discord_id,
            fields: {
              [key]: newValue,
            },
          })
        } else {
          if (key === 'internal_notes') prev.users[prevId].fields[key] = newValue
          if (key !== 'internal_notes') prev.users[prevId].fields[key] = newValue as UserStatus
        }
      }
      return prev
    })
  }

  return [
    {
      field: 'first_name',
      headerName: 'First Name',
      description: 'First Name',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => TableCellValue(params.row.first_name),
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      description: 'Last Name',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => TableCellValue(params.row.last_name),
    },
    {
      field: 'id',
      headerName: 'Username',
      description: 'Discord Username',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => TableCellValue(params.row.id),
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email',
      filterable: false,
      sortable: false,
      flex: 1.5,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => TableCellValue(params.row.email),
    },
    {
      field: 'status',
      headerName: 'Status',
      description: 'User Status',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].status !== params.row.status ? 'modified' : ''
      },
      renderCell: (params: GridRenderCellParams) =>
        TableCellValue(
          <UserStatusSelect
            value={params.row.status}
            originalValue={originalData[params.row.index].status}
            disabled={!statusUpdateToggle || getDisabledForModerator(params.row.status)}
            onChange={(val) => updateValue('status', val, params)}
          />,
          params.row.status
        ),
    },
    {
      field: 'internal_status',
      headerName: 'Internal Status',
      description:
        'Internal User Status: Status only visible internally, use to stage potential status before committing',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].internal_status !== params.row.internal_status
          ? 'modified'
          : ''
      },
      renderCell: (params: GridRenderCellParams) =>
        TableCellValue(
          <UserStatusSelect
            value={params.row.internal_status}
            originalValue={originalData[params.row.index].internal_status}
            onChange={(val) => updateValue('internal_status', val, params)}
            disabled={getDisabledForModerator(params.row.status)}
            isClearable
          />,
          params.row.internal_status
        ),
    },
    {
      field: 'internal_notes',
      headerName: 'Internal Notes',
      description: 'Internal Notes: Notes only visible internally',
      filterable: false,
      sortable: false,
      flex: 2,
      minWidth: 200,
      cellClassName: (params: GridCellParams) => {
        if (!originalData[params.row.index]) return ''
        return originalData[params.row.index].internal_notes !== params.row.internal_notes
          ? 'modified'
          : ''
      },
      renderCell: (params: GridRenderCellParams) => (
        <InternalNotesField
          value={params.row.internal_notes}
          onSubmit={(newVal) => updateValue('internal_notes', newVal, params)}
          originalValue={originalData[params.row.index].internal_notes ?? ''}
          name={
            params.row.first_name && params.row.last_name
              ? `${params.row.first_name} ${params.row.last_name}`
              : params.row.username
          }
          disabled={getDisabledForModerator(params.row.status)}
        />
      ),
    },
    {
      field: 'application',
      headerName: 'Application',
      description: 'Application Data',
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {(statusWithCompleteApplications.includes(params.row.status) ||
            params.row.is_draft === false) && (
            <Tooltip
              title={!params.row.application ? 'Disabled in Data Settings' : 'View Application'}
              key={params.row.username}
            >
              <span style={{ height: '100%', width: '100%' }}>
                <GridActionsCellItem
                  icon={<AssignmentIcon sx={{ m: '0.5rem' }} />}
                  onClick={() => {
                    setApplicationData(params.row as UserListData)
                  }}
                  label="View Application"
                  disabled={!params.row.application}
                  style={{ height: '100%', width: '100%', borderRadius: '4px' }}
                />
              </span>
            </Tooltip>
          )}
        </>
      ),
    },
  ]
}
