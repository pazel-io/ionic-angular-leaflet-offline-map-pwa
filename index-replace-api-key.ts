import { TargetOptions } from '@angular-builders/custom-webpack';

export default (targetOptions: TargetOptions, indexHtml: string) => {
  console.log('process.env.API_KEY', process.env.API_KEY);
  return indexHtml.replace('${API_KEY}', process.env.API_KEY);
};
