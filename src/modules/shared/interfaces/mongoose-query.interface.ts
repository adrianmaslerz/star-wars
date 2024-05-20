import { PipelineStage } from 'mongoose';

export interface MongooseQueryInterface {
  pipeline: PipelineStage[];
  options: Record<string, any>;
}
