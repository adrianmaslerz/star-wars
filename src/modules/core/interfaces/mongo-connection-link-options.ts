export interface MongoConnectionLinkOptions {
  host: string;
  port: number;
  srv: boolean;
  database_name: string;
  user?: string;
  password?: string;
}
