# Problem

We need to destruct the contact and transfer its tokens to some destination account.

## Expected behaviour

-   Desctructed contract has zero balance and "non exists" type.
-   Account destination has positive balance

## Resulting behaviour

-   in Devnet
    -   as expected
-   in Evernode SE
    -   Desctructed contract is not destructed, its balance unchanged, but transfer to destination account exists!
    -   Account destination has positive balance!

## How to reproduce a bug

Start Evernode SE

```
everdev se start
```

Intall dependencies and run

```
npm i
node selfdestruct.js
```

Open http://localhost and finds accounts in the output
