import { useCallback } from 'react'

const methodKeys = ['GET', 'POST'] as const
type Method = (typeof methodKeys)[number]

const baseURLKeys = ['DH_BE', 'DH_CMS', 'CUSTOM'] as const
type BaseURL = (typeof baseURLKeys)[number]

const DEERHACKS_BASE_URL = process.env.NEXT_PUBLIC_DEERHACKS_BASE_URL
const DEERHACKS_CMS_BASE_URL = process.env.NEXT_PUBLIC_DEERHACKS_CMS_BASE_URL

type Props = {
  method: Method
  base: BaseURL
  url: string
  body?: any
  isForm?: boolean
}

const fetchHelper = async (props: Props): Promise<{ data: any; error: any; statusCode: any }> => {
  const { method, base, url, body, isForm = false } = props

  const api = () => {
    switch (base) {
      case 'DH_BE':
        return `${DEERHACKS_BASE_URL}${url}`
      case 'DH_CMS':
        return `${DEERHACKS_CMS_BASE_URL}/api${url}`
      default:
        return url
    }
  }

  const req = {
    ...(base !== 'CUSTOM' && {
      credentials: 'include' as RequestCredentials,
      mode: 'cors' as RequestMode,
    }),
    method,
    ...(method !== 'GET' && { body: isForm ? body : JSON.stringify({ ...body, ts: Date.now() }) }),
    headers: {
      ...(!isForm && { 'Content-Type': 'application/json' }),
      ...(base === 'DH_CMS' && {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEERHACKS_CMS_TOKEN}`,
      }),
    },
  }

  const resp = await fetch(api(), req)

  const response: { error: any; data: unknown; statusCode: any } = {
    error: { data: undefined },
    data: undefined,
    statusCode: resp.status,
  }

  if (resp.status >= 400) {
    const error = await resp.json()
    response.error.data = error
    throw { status: resp.status, err: response.error.data }
  } else {
    const data = await resp.json()
    response.data = data
  }
  return response
}

/** IMPORTANT: Do not use this directly, use useAPI */
const useFetch = () => {
  return useCallback(
    async (
      method: Method,
      base: BaseURL,
      url: string,
      body?: Object,
      options?: { isForm: boolean }
    ) => {
      try {
        return await fetchHelper({
          method,
          base,
          url,
          body,
          isForm: options?.isForm,
        })
      } catch (error) {
        throw error
      }
    },
    []
  )
}

export type CustomFetch = ReturnType<typeof useFetch>

export default useFetch
