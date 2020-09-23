---
date: 2020-09-10
featured: false
title: "What is Blockchain? Your blockchain 101"
cover: "https://i.imgur.com/ne0xJoX.png"
categories: 
    - Technology
tags:
    - Blockchain
    - database
    - ethereum
    - bitcoin
slug: "/what-is-block-chain"
---

## What is Blockchain technology?

A blockchain is a distributed database that is used to maintain a continuously growing list of records called blocks. But what does this mean? Consider a decentralized database that is managed by multiple participants, this can also be called as [Distributed Ledger](https://en.wikipedia.org/wiki/Distributed_ledger). Blockchain is a type of **Distributed Ledger**, containing blocks of transactions. These transactions are recorded with an immutable cryptographic signature called [hash](https://en.wikipedia.org/wiki/Hash). Not all distributed ledgers apply this concept of sequence of blocks being connected via cryptographic signatures. Blockchain is a type of distributed ledger designed to record transactions digitally without the need for third-party interference.

## What is the need for blockchain technology?
Blockchain technology is useful because it eliminates the need for a trusted third party to take care of the bookkeeping. Consider a scenario in which a set of transactions need to take place. If both parties keep their books containing the details of the transactions, anyone can tamper it and claim that their version of the transaction is true. This calls for a trusted authority trying to safeguard the source of truth. Blockchain eliminates the need for such a middleman while handling transactions. Blockchain provides a distributed, immutable, tamper-proof way of recording transactions digitally.

## How is blockchain secure and immutable?

Two of the most common terms revolving around blockchain are secure and immutable. While secure and immutable have different meanings, concerning blockchain technology, one is dependant on the other. Blockchain technology is secure because it is immutable, and this immutability provides the ultimate security of having transactions that will always speak the truth, no matter where it is accessed from.

To understand why blockchain is immutable, let's look at the structure of a blockchain and how transactions occur:

### Structure: Every block in a blockchain contains the following details

1. **Index**: The position of the block in the blockchain
2. **Previous hash**: This contains the cryptographic hash of the previous block in the blockchain
3. **TimeStamp**: This contains the timestamp of when the block was added to the chain
4. **Hash**: The cryptographic hash of the current transaction
5. **Data**: The actual data stored on the block (Note that this data is public)
6. **Nonce**: How many iterations occurred before finding a valid block (More on this later)


### How does a transaction occur?:
1. Every blockchain starts with the genesis block. This is the beginning of the blockchain and contains the basic details. The `previous hash` and `index` of this block will be 0.
2. Now we know that, when a new block is added, the following data is added: **index**, **previous hash**, **timestamp**, **data**, **hash** and **nonce**. Except for the `hash` and the `nonce`, the rest of the data is fixed. Let us see how these values are calculated.

### Calculation of hash:

A hash is a value that is uniquely calculated based on the index, previous hash, timestamp, data, and nonce as input

```javascript
hash = SHA256(index, prev_hash, timestamp, data, nonce)
```

But what makes the `hash` valid in a given blockchain? In any given blockchain, there is a set agreement that the hash must contain a given number of preceding zeros. For example: `0000132243352353523535` has 4 preceding zeros. 

While all the other data is fixed, finding the perfect `nonce` to match these criteria is an important step in the blockchain. A given block is valid only if the hash containing the given number of preceding zeros can be generated using the `nonce` and the rest of the data. Also, as the number of 0's increases, the number of possible valid hashes for the given data decreases, and hence the complexity increases.

This is also called as block mining, and the procedure implemented to mine a block is called [Proof of work system](https://en.wikipedia.org/wiki/Proof-of-work_system)

### How does this make blockchain immutable?

Imagine we have 3 blocks in our blockchain: A -> B -> C

1. Block A has the `previous hash` 0, a `nonce` and a unique `hash` having four 0s
2. Block B has `previous hash` equal to block A's `hash`, Block B has its own `hash` generated using the **previous hash (block A's hash)** and unique **nonce**.
3. Block C has `previous hash` equal to block B's `hash`, Block C also has its own `hash` generated using **previous hash (block B's hash)** and unique **nonce**.

Let's say, someone, tampers with the data in block A:

1. The hash in block A becomes invalid for the given `nonce` because the data changed.
2. The hash in block B also becomes invalid because its **previous hash (block A's hash)** changed.
3. The hash in block C also becomes invalid and so on.

The only way to successfully mutate one block is to mine the block again and every block after the given block. The blockchain is distributed and the new blocks keep getting added all the time. Because of this, it is impossible to mutate blockchain. 

## Types of blockchain
The common types of blockchain include public and private blockchains:

1. Public blockchain: The ledger is not owned by anyone. There is no consent required to mine the blocks. Anyone in the world can participate and maintain the blockchain.
2. Private blockchain: Only the trusted parties can take part in the transactions occurring in the blockchain.

## What does native currency mean?

You might have heard of bitcoin, ethereum, ripple network, etc. These are different blockchains, in the sense, their underlying implementation has slightly differed from one another. The native currency of a blockchain is an accepted currency that was instantiated when the blockchain originated, and this currency can be added (this is equal to mining and adding a block to update the existing value). For example, the ethereum blockchain has ether as its native cryptocurrency. The ether supply has crossed over 100M now and it is constantly mined by the miners.

## What are Smart Contracts?

While the initial intention of blockchain was to record purely financial transactions, as the blockchain grew, the need for customizable transaction increased. To serve the need for customizable transactions, smart contracts were introduced. Smart contracts are simple executable code that also lives in the blockchain. However, they contain specific instructions to add or update transactions.

## What is tokenization?

With the advent of smart contracts, it became possible to introduce new types of currencies within a given blockchain. Such currencies introduced are called tokens. Ethereum blockchain contains nearly 7 types of accepted tokens and several others that were proposed and got rejected. [ERC-20](https://etherscan.io/tokens), [ERC-721](http://erc721.org/), [ERC-777](https://eips.ethereum.org/EIPS/eip-777), [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) are only few tokens that have gained popularity. Think of the tokens as a new type of currency introduced with a set of guidelines given that dictates how the currency can be used.

While this article has mainly talked about blockchain technology and has closely associated it with cryptocurrencies, and financial transactions, those are not its only uses. Blockchain is used in the field of networking, trustless authentication, supply-chain management, and many other fields, sky is the limit :)
