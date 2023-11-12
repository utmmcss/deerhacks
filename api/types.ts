/** template all api in schema should follow */
export interface APITemplate {
  [methodName: string]: (...args: any) => Promise<any>
}

/** all api request paths in schema config */
type AllPaths<Config extends APITemplate> = {
  [MethodName in keyof Config]-?: Config[MethodName] extends Function ? MethodName : never
}[keyof Config]

const querySuffixes = ['Get', 'List'] as const
type QuerySuffix = (typeof querySuffixes)[number]

/** api paths that are queries (end in querySuffixes) */
export type QueryPaths<Contract extends APITemplate> = {
  [QueryName in keyof Contract]-?: QueryName extends `${string}${QuerySuffix}`
    ? Contract[QueryName] extends Function
      ? QueryName
      : never
    : never
}[keyof Contract]

/** api paths that mutate (doesn't end in querySuffixes) */
export type MutationPaths<Contract extends APITemplate> = Exclude<
  AllPaths<Contract>,
  QueryPaths<Contract>
>

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

/** api query paths mapped to args, response, and whatever awaitedResponse is */
export type ClientQueries<Contract extends APITemplate> = {
  [Query in QueryPaths<Contract>]: {
    args: Parameters<Contract[Query]>[0]
    response: ReturnType<Contract[Query]>
    awaitedResponse: Awaited<ReturnType<Contract[Query]>>
  }
}

/** Api mutation paths mapped to args, response, and whatever awaitedResponse is */
export type ClientMutations<Contract extends APITemplate> = {
  [Mutation in MutationPaths<Contract>]: {
    args: Parameters<Contract[Mutation]>[0]
    response: ReturnType<Contract[Mutation]>
    awaitedResponse: Awaited<ReturnType<Contract[Mutation]>>
  }
}

/** args to send with provided api path */
export type InferHandlerInput<TProcedure extends APITemplate[string]> = TProcedure extends (
  args: infer TInput,
  headers?: any
) => Promise<any>
  ? undefined extends TInput // ? is input optional
    ? unknown extends TInput // ? is input unset
      ? null | undefined // -> there is no input
      : TInput | null | undefined // -> there is optional input
    : TInput // -> input is required
  : undefined | null // -> there is no input

export type APIError = {
  apiError: {
    err: any
    status: number
  }
}
