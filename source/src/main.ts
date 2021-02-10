import { App } from '@aws-cdk/core';
import { BootstraplessStackSynthesizer } from 'cdk-bootstrapless-synthesizer';
import { KeycloakStack } from './stack';

const app = new App();

new KeycloakStack(app, 'keycloak-aurora-serverless-from-existing-vpc', { auroraServerless: true, fromExistingVPC: true, synthesizer: newSynthesizer() });
new KeycloakStack(app, 'keycloak-aurora-serverless-from-new-vpc', { auroraServerless: true, fromExistingVPC: false, synthesizer: newSynthesizer() });
new KeycloakStack(app, 'keycloak-from-existing-vpc', { auroraServerless: false, fromExistingVPC: true, synthesizer: newSynthesizer() });
new KeycloakStack(app, 'keycloak-from-new-vpc', { auroraServerless: false, fromExistingVPC: false, synthesizer: newSynthesizer() });

app.synth();

function newSynthesizer() {
  return process.env.USE_BSS ? new BootstraplessStackSynthesizer(): undefined;
}
