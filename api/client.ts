import {
  APITemplate,
  ClientMutations,
  ClientQueries,
  InferHandlerInput,
  MutationPaths,
  QueryPaths,
} from '@/api/types';
import {
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  QueryKey,
  useMutation as __useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery as __useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export class API<const APISchema extends APITemplate> {
  public queryClient: QueryClient;

  private contract: APISchema;

  constructor(contract: APISchema) {
    this.queryClient = new QueryClient();
    this.contract = contract;
  }

  private validateApiError() {
    return (apiError: any) => {
      throw { apiError };
    };
  }
  public useQuery<
    TPath extends QueryPaths<APISchema> & string,
    TQueryOutput extends ClientQueries<APISchema>[TPath]['awaitedResponse'],
    TQueryInput extends InferHandlerInput<APISchema[TPath]>
  >(pathAndInput: [path: TPath, args: TQueryInput], opts?: UseQueryOptions<TQueryOutput>) {
    const [path, args] = pathAndInput;
    const endpoint = this.contract[path];

    return __useQuery(
      pathAndInput as QueryKey,
      () => endpoint(args).catch(this.validateApiError()),
      opts
    );
  }

  public useMutation<
    TPath extends MutationPaths<APISchema> & string,
    TMutationOutput extends ClientMutations<APISchema>[TPath]['awaitedResponse'],
    TMutationInput extends InferHandlerInput<APISchema[TPath]>
  >(
    path: [TPath] | TPath,
    opts?: UseMutationOptions<TMutationOutput, unknown, TMutationInput>
  ): UseMutationResult<TMutationOutput, unknown, TMutationInput> {
    const actualPath = Array.isArray(path) ? path[0] : path;
    const endpoint = this.contract[actualPath];

    return __useMutation(
      (input: TMutationInput) => endpoint(input).catch(this.validateApiError()),
      opts
    );
  }

  public invalidateQueries<
    TPath extends QueryPaths<APISchema> & string,
    TQueryInput extends InferHandlerInput<APISchema[TPath]>
  >(
    filters: InvalidateQueryFilters & { queryKey: [path: TPath, args: Partial<TQueryInput>] },
    options?: InvalidateOptions
  ) {
    return this.queryClient.invalidateQueries(filters, options);
  }
}
