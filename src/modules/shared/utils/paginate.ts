import { PaginationInputDTO } from '../dto/pagination.input.dto';
import { MongooseQueryInterface } from '../interfaces/mongoose-query.interface';
import { Model } from 'mongoose';
import { PaginationOutputDTO } from '../dto/pagination.output.dto';
export const paginate = async <T>(
  model: Model<T>,
  params: MongooseQueryInterface,
  data: PaginationInputDTO,
): Promise<PaginationOutputDTO<T>> => {
  //params
  const page =
    parseInt(data.page?.toString()) > 0 ? parseInt(data.page?.toString()) : 1;
  const results =
    parseInt(data.results?.toString()) > 0
      ? parseInt(data.results?.toString())
      : 10;

  params.options.limit = results;
  params.options.page = page;

  const paginationResult = await (<any>model).aggregatePaginate(
    model.aggregate(params.pipeline),
    params.options,
  );

  return {
    page: page,
    results: paginationResult.docs,
    pages: paginationResult.totalPages || 0,
    total: paginationResult.totalDocs || 0,
  };
};
