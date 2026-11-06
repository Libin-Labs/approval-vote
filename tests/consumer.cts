import { approval } from '@lp-labs/approval-vote';
if (approval(['a', 'b'], [['a', 'b'], ['b']])[0].candidate !== 'b') throw new Error('Approval');
// @ts-expect-error invalid argument must be rejected by declarations
approval([1, 2], [['a']]);
