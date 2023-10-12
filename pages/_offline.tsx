import FullPageLoader from '@/components/FullPageLoader'

const OfflinePage = () => {
  return <FullPageLoader show pulse={false} text="You're offline, check your connection." />
}

export default OfflinePage
