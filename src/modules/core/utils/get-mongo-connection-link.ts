import { MongoConnectionLinkOptions } from '../interfaces/mongo-connection-link-options';

export const getMongoConnectionLink = (
  options: MongoConnectionLinkOptions,
): string => {
  let link = 'mongodb' + (options.srv || !options.port ? '+srv' : '') + '://';
  if (options.user) {
    link += options.user + ':' + options.password + '@';
  }
  link +=
    options.host +
    (options.srv || !options.port ? '' : ':' + options.port) +
    '/' +
    options.database_name;
  return link;
};
