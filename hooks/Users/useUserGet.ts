import { useAPI } from '@/contexts/API'
import { User } from '@/types/User'

type Props = {
  enabled?: boolean
  onSuccess?: () => void
  onError?: () => void
}

/**
 * https://discord.com/developers/docs/reference#image-formatting-image-base-url
 */
const getAvatar = (user: User) => {
  const avatar = user.avatar
  if (avatar)
    return `https://cdn.discordapp.com/avatars/${user.id}/${avatar}.${
      avatar.startsWith('a_') ? 'gif' : 'webp'
    }`
  else {
    const index = (BigInt(user.id) >> BigInt(22)) % BigInt(6)
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`
  }
}

export const useUserGet = (props?: Props) => {
  return useAPI().useQuery(['userGet', null], {
    enabled: props?.enabled,
    onSuccess: (data) => {
      data.user.avatarURL = getAvatar(data.user)
      props?.onSuccess?.()
    },
    onError: props?.onError,
  })
}
