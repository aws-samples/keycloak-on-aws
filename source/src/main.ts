import { App } from '@aws-cdk/core';
import { BootstraplessStackSynthesizer } from 'cdk-bootstrapless-synthesizer';
import { KeycloakFromExistingVPC, KeycloakFromNewVPC } from './stack';

const app = new App();

new KeycloakFromExistingVPC(app, { synthesizer: newSynthesizer() });
new KeycloakFromExistingVPC(app, { synthesizer: newSynthesizer(), auroraServerless: true });
new KeycloakFromNewVPC(app, { synthesizer: newSynthesizer() });
new KeycloakFromNewVPC(app, { synthesizer: newSynthesizer(), auroraServerless: true });

app.synth();

function newSynthesizer() {
  return process.env.USE_BSS ? new BootstraplessStackSynthesizer(): undefined;
}
