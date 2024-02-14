import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { DataGrid, FooterPropsOverrides, GridColumnVisibilityModel } from '@mui/x-data-grid'

import Modal from '@/components/Dashboard/Modal'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import { getColumns, getRows } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import TableFooter from '@/components/Dashboard/UsersTableComponents/TableFooter'
import TableToolbar from '@/components/Dashboard/UsersTableComponents/TableToolbar'
import BackButton from '@/components/Shared/BackButton'
import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useAuth } from '@/contexts/Auth'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserList } from '@/hooks/User/useUserList'
import { useUserUpdateBatch } from '@/hooks/User/useUserUpdateBatch'
import Error404Page from '@/pages/404'
import Error500Page from '@/pages/500'
import {
  UserListData,
  UserListParams,
  UserStatus,
  userStatuses,
  UserUpdateBatchReq,
} from '@/types/User'

const PAGE_SIZE = 25

type ApplyFiltersProps = {
  full?: boolean
  page?: number
  statuses?: UserStatus[]
  internal_statuses?: (UserStatus | 'empty')[]
  search?: string
}

type Props = {
  isLoading: boolean
  dataFetched: boolean
  data: UserListData[]
  updateReq: UserUpdateBatchReq
  setUpdateReq: Dispatch<SetStateAction<UserUpdateBatchReq>>
  queryParams: UserListParams
  applyFilters: (newParams: ApplyFiltersProps) => void
  totalUsers: number
  fullWidth: boolean
  setFullWidth: (val: boolean) => void
  onSave: () => void
  userStatus: UserStatus
}

const UsersTable = (props: Props) => {
  const {
    isLoading,
    dataFetched,
    data,
    updateReq,
    setUpdateReq,
    queryParams,
    applyFilters,
    totalUsers,
    fullWidth,
    setFullWidth,
    onSave,
    userStatus,
  } = props

  const router = useRouter()
  const { toggles } = useFeatureToggle()

  const [originalData, setOriginalData] = useState(data)
  const [users, setUsers] = useState(data)
  const [rowCount, setRowCount] = useState(totalUsers)
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    first_name: true,
    last_name: true,
    id: true,
    email: true,
    status: true,
    internal_status: toggles.internalFields,
    internal_notes: toggles.internalFields,
    application: true,
  })

  useEffect(() => {
    if (!dataFetched) return
    setOriginalData(data)
    setUsers(data)
    setRowCount(totalUsers)
    setUpdateReq({ users: [] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFetched])

  const [applicationData, setApplicationData] = useState<UserListData>()
  const [openApplication, setOpenApplication] = useState(false)
  const handleOpenApplication = (data: UserListData) => {
    setApplicationData(data)
    setOpenApplication(true)
  }

  const hasUnsavedChanges = updateReq.users.length > 0

  useEffect(() => {
    const handleWindowClose = (e: any) => {
      if (!hasUnsavedChanges) return
      e.preventDefault()
      return (e.returnValue = 'You have unsaved changes. Are you sure you want to leave?')
    }
    const handleBrowseAway = () => {
      if (!hasUnsavedChanges) return
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) return
      router.events.emit('routeChangeError')
      throw 'routeChange aborted.'
    }
    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUnsavedChanges])

  const handleApplyFilters = (newParams: ApplyFiltersProps) => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to proceed?')) return
      setUpdateReq({ users: [] })
    }
    applyFilters(newParams)
  }

  return (
    <>
      <DataGrid
        autoHeight
        rows={getRows(users)}
        columns={getColumns({
          users,
          setUsers,
          setUpdateReq,
          setApplicationData: handleOpenApplication,
          originalData,
          userStatus,
          statusUpdateToggle: toggles.statusUpdates || userStatus === 'admin',
        })}
        slots={{
          toolbar: TableToolbar,
          footer: TableFooter,
        }}
        slotProps={{
          toolbar: {
            queryParams,
            applyFilters: handleApplyFilters,
            onSave,
            hasUnsavedChanges,
            isLoading,
          },
          footer: { fullWidth, setFullWidth } as FooterPropsOverrides,
        }}
        pageSizeOptions={[PAGE_SIZE]}
        paginationMode="server"
        loading={isLoading}
        rowCount={rowCount}
        paginationModel={{ page: queryParams.page - 1, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(model) => handleApplyFilters({ page: model.page + 1 })}
        disableColumnFilter
        density="comfortable"
        disableRowSelectionOnClick
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      />
      <Suspense>
        <Modal
          open={openApplication}
          title={`Application - ${applicationData?.first_name} ${applicationData?.last_name}`}
          onClose={() => setOpenApplication(false)}
          TransitionProps={{
            onExited: () => setApplicationData(undefined),
          }}
          keepMounted
          maxWidth="xl"
        >
          <Box component="div" sx={{ pb: '1.5rem' }}>
            {applicationData && (
              <FormReview
                user={applicationData}
                application={{
                  ...applicationData.application,
                  resume_file_name: applicationData.resume_file_name,
                  resume_link: applicationData.resume_link,
                }}
                hideDisclaimer
              />
            )}
          </Box>
        </Modal>
      </Suspense>
    </>
  )
}

const UsersTableLoader = () => {
  const { user, loading, authenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toggles } = useFeatureToggle()

  const allowedStatuses = ['admin', 'moderator']

  const [paramsObtained, setParamsObtained] = useState(false)
  const enabled =
    authenticated &&
    user?.status &&
    allowedStatuses.includes(user.status) &&
    toggles.dashboard &&
    paramsObtained

  const [fullWidth, setFullWidth] = useState(false)

  const [params, setParams] = useState<UserListParams>({
    full: false,
    page: 1,
    statuses: [],
    internal_statuses: [],
    search: '',
  })

  // changing params calls user-list
  const applyFilters = (props: ApplyFiltersProps) => {
    setParams((curr) => {
      const full = props.full ?? curr.full
      const page = props.page ?? curr.page
      const statuses = props.statuses ?? curr.statuses
      const internal_statuses = props.internal_statuses ?? curr.internal_statuses
      const search = props.search ?? curr.search

      const state = `page=${page}&app=${full}&statuses=${statuses.join(
        ','
      )}&internal_statuses=${internal_statuses.join(',')}&search=${search}`

      localStorage.setItem('deerhacks-user-list', state)
      router.replace(`/dashboard/users?${state}`, undefined, {
        shallow: true,
      })

      return { full, page, statuses, internal_statuses, search }
    })
  }

  const { data, isError, isFetching } = useUserList({
    params,
    enabled,
  })

  const { mutate: userUpdateBatch, isLoading: isUpdating } = useUserUpdateBatch()

  const [updateReq, setUpdateReq] = useState<UserUpdateBatchReq>({ users: [] })

  useEffect(() => {
    if (!router.isReady) return

    const tempParams = {} as {
      full: string | null
      page: number
      statuses: string | null
      internal_statuses: string | null
      search: string | null
    }

    const savedParams = localStorage.getItem('deerhacks-user-list')

    if (searchParams.size > 0) {
      // use url params first if they exist
      tempParams.full = searchParams.get('app')
      tempParams.page = parseInt(searchParams.get('page') ?? '')
      tempParams.statuses = searchParams.get('statuses')
      tempParams.internal_statuses = searchParams.get('internal_statuses')
      tempParams.search = searchParams.get('search')
    } else if (!!savedParams) {
      // otherwise get params from localhost if they exist
      const params = savedParams.split('&').reduce((obj: { [key: string]: string }, str) => {
        const parts = str.split('=')
        obj[parts?.[0]] = parts?.[1]
        return obj
      }, {})
      tempParams.full = params?.app
      tempParams.page = parseInt(params?.page)
      tempParams.statuses = params?.statuses
      tempParams.internal_statuses = params?.internal_statuses
      tempParams.search = params?.search
    }

    if (
      tempParams.full &&
      ['true', 'false'].includes(tempParams.full) &&
      tempParams.page > 0 // DataGrid handles page size over limit
    ) {
      // use params only if all three are valid
      applyFilters({
        full: tempParams.full === 'true',
        page: tempParams.page,
        statuses: (tempParams.statuses ?? '')
          .split(',')
          .filter((status) => userStatuses.includes(status as UserStatus)) as UserStatus[],
        internal_statuses: (tempParams.internal_statuses ?? '')
          .split(',')
          .filter(
            (status) => userStatuses.includes(status as UserStatus) || status === 'empty'
          ) as UserStatus[],
        search: tempParams.search ?? '',
      })
    } else {
      // default values
      applyFilters({ full: false, page: 1, statuses: [], internal_statuses: [], search: '' })
    }

    setParamsObtained(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  if (!toggles.dashboard || (user?.status && !allowedStatuses.includes(user.status))) {
    return <Error404Page />
  }

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Users Table | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || !paramsObtained ? (
        <FullPageSpinner />
      ) : (
        <Fade in timeout={1000}>
          <Container
            maxWidth={fullWidth ? false : 'lg'}
            sx={{ minHeight: '100vh', flexDirection: 'column', justifyContent: 'start' }}
          >
            <BackButton navbar text="Dashboard" href="/dashboard" />
            <Typography variant="h1">Users Table</Typography>
            <UsersTable
              isLoading={isFetching || isUpdating}
              dataFetched={!isFetching && !!data}
              data={data?.users ?? []}
              updateReq={updateReq}
              setUpdateReq={setUpdateReq}
              queryParams={params}
              applyFilters={applyFilters}
              totalUsers={data?.pagination.total_users ?? 0}
              fullWidth={fullWidth}
              setFullWidth={setFullWidth}
              onSave={() => userUpdateBatch(updateReq)}
              userStatus={user.status}
            />
          </Container>
        </Fade>
      )}
    </>
  )
}

export default UsersTableLoader
