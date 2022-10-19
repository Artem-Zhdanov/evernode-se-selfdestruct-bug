const fs = require('fs')
const path = require('path')
const { TonClient } = require('@eversdk/core')
const { libNode } = require('@eversdk/lib-node')
const { Account } = require('@eversdk/appkit')

TonClient.useBinaryLibrary(libNode)
const client = new TonClient({
    network: { endpoints: ['http://localhost'] },
})

const contractPackage = {
    abi: JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'Contract.abi.json'), {
            encoding: 'utf-8',
        }),
    ),
    tvc: fs.readFileSync(path.resolve(__dirname, 'Contract.tvc'), {
        encoding: 'base64',
    }),
}

// Preparations are done, lets deploy and then destruct the contract
// All tokens require( the destroyable contract will be sent here:
const DST = '0:10074942eb64433fb6ae89eb4927ede221fb815b7b5285790ac66a3a69373711'

;(async () => {
    // Create "account" instance with random keys
    const acc = new Account(contractPackage, {
        signer: {
            type: 'Keys',
            keys: await client.crypto.generate_random_sign_keys(),
        },
        client,
    })

    console.log(`Contact will be deployed to address: ${await acc.getAddress()}`)
    await acc.deploy({ useGiver: true })
    await acc.run('die', { dest: DST })
    console.log(`Contract was descructed, all tokens ware sent to ${DST}`)
    client.close()
})().catch((e) => {
    console.log(e)
    process.exit(1)
})
