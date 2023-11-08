import { useAPI } from '@/contexts/API'
import { User } from '@/types/User'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

export const useUserGet = (props?: Props) => {
  return useAPI().useQuery(['userGet', null], {
    enabled: props?.enabled,
    onSuccess: (data) => {
      data.user.avatar = getAvatar(data.user)
      data.user.qr_code = getQRCode(data.user.qr_code)
      props?.onSuccess?.()
    },
    onError: props?.onError,
  })
}

/**
 * https://discord.com/developers/docs/reference#image-formatting-image-base-url
 */
const getAvatar = (user: User) => {
  const avatar = user.avatar
  if (avatar)
    return `https://cdn.discordapp.com/avatars/${user.discord_id}/${avatar}.${
      avatar.startsWith('a_') ? 'gif' : 'webp'
    }`
  else {
    const index = (BigInt(user.discord_id) >> BigInt(22)) % BigInt(6)
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`
  }
}

const getQRCode = (qrCode: string) => {
  return `https://chart.googleapis.com/chart?cht=qr&chl=${qrCode}&chs=500x500`
}
