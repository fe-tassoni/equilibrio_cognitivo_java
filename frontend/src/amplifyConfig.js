import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_cBNVK5vov',
    userPoolWebClientId: '1lj9d5u67tmrjrc3hg30tfb82o',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});
