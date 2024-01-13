import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { DataGrid, FooterPropsOverrides } from '@mui/x-data-grid'

import Modal from '@/components/Dashboard/Modal'
import FormReview from '@/components/Dashboard/RegistrationForms/Review'
import { getColumns, getRows } from '@/components/Dashboard/UsersTableComponents/tableDefinitions'
import TableFooter from '@/components/Dashboard/UsersTableComponents/TableFooter'
import TableToolbar from '@/components/Dashboard/UsersTableComponents/TableToolbar'
import BackButton from '@/components/Shared/BackButton'
import FullPageLoader from '@/components/Shared/FullPageLoader'
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

type ApplyFiltersProps = { full?: boolean; page?: number; status?: UserStatus[] }

type Props = {
  isLoading: boolean
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
  useEffect(() => {
    if (isLoading) return
    setOriginalData(data)
    setUsers(data)
    setUpdateReq({ users: [] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const [rowCount, setRowCount] = useState(totalUsers)
  useEffect(() => {
    setRowCount((prev) => (totalUsers > 0 ? totalUsers : prev))
  }, [totalUsers, setRowCount])

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
      if (confirm('You have unsaved changes. Are you sure you want to proceed?')) {
        setUpdateReq({ users: [] })
        applyFilters(newParams)
      }
      return
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
          statusUpdateToggle: toggles.statusUpdates,
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
        density="comfortable"
        paginationModel={{ page: queryParams.page - 1, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(model) => handleApplyFilters({ page: model.page + 1 })}
        disableRowSelectionOnClick
      />
      <Suspense>
        <Modal
          open={openApplication}
          title={`Application - ${applicationData?.first_name} ${applicationData?.last_name}`}
          onClose={() => setOpenApplication(false)}
          TransitionProps={{
            onExited: () => setApplicationData(undefined),
          }}
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

  const enabled =
    authenticated &&
    user?.status &&
    allowedStatuses.includes(user.status) &&
    router.isReady &&
    toggles.dashboard

  const [fullWidth, setFullWidth] = useState(false)

  const [params, setParams] = useState<UserListParams>({ full: false, page: 1, status: [] })

  // changing params calls user-list
  const applyFilters = (props: ApplyFiltersProps) => {
    setParams((curr) => {
      const full = props.full ?? curr.full
      const page = props.page ?? curr.page
      const status = props.status ?? curr.status

      router.replace(
        `/dashboard/users?full=${full}&page=${page}&status=${status.join(',')}`,
        undefined,
        { shallow: true }
      )

      return { full, page, status }
    })
  }

  const { data, isLoading, isError } = useUserList({
    params,
    enabled,
  })

  const { mutate: userUpdateBatch, isLoading: isUpdating } = useUserUpdateBatch()

  const [updateReq, setUpdateReq] = useState<UserUpdateBatchReq>({ users: [] })

  useEffect(() => {
    if (!router.isReady) return
    const full = searchParams.get('full') === 'true'
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1') || 1) // BE handles page size over limit
    const status = (searchParams.get('status')?.split(',') ?? []).filter((status) =>
      userStatuses.includes(status as UserStatus)
    ) as UserStatus[]
    applyFilters({ full, page, status })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

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

  if (!toggles.dashboard) return <Error404Page />

  if (isError) return <Error500Page />

  return (
    <>
      <Head>
        <title>Users Table | DeerHacks</title>
      </Head>
      {loading || !authenticated || !user || !router.isReady ? (
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
            <UsersTable
              isLoading={isLoading || isUpdating}
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
