import FullPageLoader from '@/components/FullPageLoader'

const Offline = () => {
  return <FullPageLoader loading pulse={false} text="You're offline, check your connection." />
}

export default Offline
