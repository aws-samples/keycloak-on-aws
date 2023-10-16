import { App } from 'aws-cdk-lib';
import { BootstraplessStackSynthesizer } from 'cdk-bootstrapless-synthesizer';
import { KeycloakStack } from './stack';

const app = new App();

mkstack(app, 'keycloak-aurora-serverless-from-existing-vpc');
mkstack(app, 'keycloak-aurora-serverless-from-new-vpc');
mkstack(app, 'keycloak-from-existing-vpc');
mkstack(app, 'keycloak-from-new-vpc');

app.synth();

function mkstack(a: App, id: string) {
  return new KeycloakStack(a, id, {
    auroraServerless: id.includes('aurora'),
    fromExistingVPC: id.includes('existing-vpc'),
    synthesizer: newSynthesizer(),
  });
}

function newSynthesizer() {
  return process.env.USE_BSS ? new BootstraplessStackSynthesizer(): undefined;
}