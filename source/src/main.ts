import { App } from '@aws-cdk/core';
import { BootstraplessStackSynthesizer } from 'cdk-bootstrapless-synthesizer';
import { MyStack } from './stack';

const app = new App();

new MyStack(app, 'MyStack', {
  synthesizer: process.env.USE_BSS ? new BootstraplessStackSynthesizer(): undefined,
});

app.synth();
