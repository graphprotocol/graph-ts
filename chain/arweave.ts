import '../common/eager_offset'
import { Bytes } from '../common/collections'

// Most types from this namespace are direct mappings or adaptations from:
// https://github.com/ChainSafe/firehose-arweave/blob/master/proto/sf/arweave/type/v1/type.proto
export namespace arweave {
  /**
   * A key-value pair for arbitrary metadata
   */
  export class Tag {
    constructor(public name: Bytes, public value: Bytes) {}
  }

  export class ProofOfAccess {
    constructor(
      public option: string,
      public txPath: Bytes,
      public dataPath: Bytes,
      public chunk: Bytes,
    ) {}
  }

  /**
   * An Arweave block.
   */
  export class Block {
    constructor(
      public indepHash: Bytes,
      public nonce: Bytes,
      public previousBlock: Bytes,
      public timestamp: u64,
      public lastRetarget: u64,
      public diff: string,
      public height: u64,
      public hash: Bytes,
      public txRoot: Bytes,
      public walletList: Bytes,
      public rewardAddr: Bytes,
      public tags: Tag[],
      public rewardPool: string,
      public weaveSize: string,
      public blockSize: string,
      public cumulativeDiff: string,
      public hashList: Bytes,
      public hashListMerkle: Bytes,
      public poa: ProofOfAccess,
    ) {}
  }

  /**
   * An Arweave transaction
   */
  export class Transaction {
    constructor(
      public format: u32,
      public id: string,
      public lastTx: Bytes,
      public owner: Bytes,
      public tags: Tag[],
      public target: Bytes,
      public quantity: string,
      public data: Bytes,
      public dataSize: string,
      public dataRoot: string,
      public signature: Bytes,
      public reward: string,
    ) {}
  }
}
