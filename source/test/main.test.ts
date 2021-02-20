import '@aws-cdk/assert/jest';
import { App } from '@aws-cdk/core';
import { KeycloakStack } from '../src/stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new KeycloakStack(app, 'test', { fromExistingVPC: true });

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});
