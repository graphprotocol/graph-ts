# NEWS

Note: This file only includes short summaries of the changes introduced in
each release. More detailed release notes can be found in the
[graph-node](https://github.com/graphprotocol/graph-node/tree/master/NEWS.md)
repo.

## Unreleased

- Add `json.try_fromBytes` for handling JSON parsing errors (#110).
- Add a `DataSourceContext` class for `SomeTemplate.createWithContext()`
  (#106, #108).
- Add support for calling overloaded Ethereum contract functions (#100).
- Add a Babylonian `.sqrt()` method to `BigInt` (#104).
- Move Ethereum integration into a dedicated `ethereum` module. Rename
  types from `EthereumBlock` to `ethereum.Block` etc. (#99).
