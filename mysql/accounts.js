import { buildSchema } from 'graphql';
import Account from './accountService';

export const schema = buildSchema(`
type Query {
    accounts(acc_name: String): String
}
`);

export const resolvers = {
    accounts: ({ acc_name }) => {
        var acc = new Account();
        return acc.getAccountsAsync(acc_name).then(data => {
            return JSON.stringify(data);
        })
    }
}