import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KeycloakStack } from '../src/stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new KeycloakStack(app, 'test', { fromExistingVPC: true });
  const template = Template.fromStack(stack);
  
  template.resourceCountIs('AWS::S3::Bucket', 0);
  expect(template).toMatchSnapshot();
});