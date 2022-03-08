import '../common/eager_offset'
import { Bytes } from '../common/collections'

export namespace tendermint {
  export enum SignedMsgType {
    SIGNED_MSG_TYPE_UNKNOWN = 0,
    SIGNED_MSG_TYPE_PREVOTE = 1,
    SIGNED_MSG_TYPE_PRECOMMIT = 2,
    SIGNED_MSG_TYPE_PROPOSAL = 32,
  }

  export enum BlockIDFlag {
    BLOCK_ID_FLAG_UNKNOWN = 0,
    BLOCK_ID_FLAG_ABSENT = 1,
    BLOCK_ID_FLAG_COMMIT = 2,
    BLOCK_ID_FLAG_NIL = 3,
  }

  export class EventList {
    public newBlock: EventBlock
    public transaction: Array<EventTx>
    public validatorSetUpdates: EventValidatorSetUpdates

    constructor(
      newBlock: EventBlock,
      transaction: Array<EventTx>,
      validatorSetUpdates: EventValidatorSetUpdates,
    ) {
      this.newBlock = newBlock
      this.transaction = transaction
      this.validatorSetUpdates = validatorSetUpdates
    }
  }

  export class EventData {
    public event: Event
    public block: EventBlock

    constructor(event: Event, block: EventBlock) {
      this.event = event
      this.block = block
    }
  }

  export class Block {
    public header: Header
    public data: Data
    public evidence: EvidenceList
    public lastCommit: Commit

    constructor(header: Header, data: Data, evidence: EvidenceList, lastCommit: Commit) {
      this.header = header
      this.data = data
      this.evidence = evidence
      this.lastCommit = lastCommit
    }
  }

  export class BlockID {
    public hash: Bytes
    public partSetHeader: PartSetHeader

    constructor(hash: Bytes, partSetHeader: PartSetHeader) {
      this.hash = hash
      this.partSetHeader = partSetHeader
    }
  }

  export class BlockParams {
    public maxBytes: i64
    public maxGas: i64

    constructor(maxBytes: i64, maxGas: i64) {
      this.maxBytes = maxBytes
      this.maxGas = maxGas
    }
  }

  export class Commit {
    public height: i64
    public round: i32
    public blockId: BlockID
    public signatures: Array<CommitSig>

    constructor(height: i64, round: i32, blockId: BlockID, signatures: Array<CommitSig>) {
      this.height = height
      this.round = round
      this.blockId = blockId
      this.signatures = signatures
    }
  }

  export class CommitSig {
    public blockIdFlag: BlockIDFlag
    public validatorAddress: Bytes
    public timestamp: Timestamp
    public signature: Bytes

    constructor(
      blockIdFlag: BlockIDFlag,
      validatorAddress: Bytes,
      timestamp: Timestamp,
      signature: Bytes,
    ) {
      this.blockIdFlag = blockIdFlag
      this.validatorAddress = validatorAddress
      this.timestamp = timestamp
      this.signature = signature
    }
  }

  export class Consensus {
    public block: u64
    public app: u64

    constructor(block: u64, app: u64) {
      this.block = block
      this.app = app
    }
  }

  export class ConsensusParams {
    public block: BlockParams
    public evidence: EvidenceParams
    public validator: ValidatorParams
    public version: VersionParams

    constructor(
      block: BlockParams,
      evidence: EvidenceParams,
      validator: ValidatorParams,
      version: VersionParams,
    ) {
      this.block = block
      this.evidence = evidence
      this.validator = validator
      this.version = version
    }
  }

  export class Data {
    public txs: Array<Bytes>

    constructor(txs: Array<Bytes>) {
      this.txs = txs
    }
  }

  export class Duration {
    public seconds: i64
    public nanos: i32

    constructor(seconds: i64, nanos: i32) {
      this.seconds = seconds
      this.nanos = nanos
    }
  }

  export class DuplicateVoteEvidence {
    public voteA: EventVote
    public voteB: EventVote
    public totalVotingPower: i64
    public validatorPower: i64
    public timestamp: Timestamp

    constructor(
      voteA: EventVote,
      voteB: EventVote,
      totalVotingPower: i64,
      validatorPower: i64,
      timestamp: Timestamp,
    ) {
      this.voteA = voteA
      this.voteB = voteB
      this.totalVotingPower = totalVotingPower
      this.validatorPower = validatorPower
      this.timestamp = timestamp
    }
  }

  export class Event {
    public eventType: string
    public attributes: Array<EventAttribute>

    constructor(eventType: string, attributes: Array<EventAttribute>) {
      this.eventType = eventType
      this.attributes = attributes
    }
  }

  export class EventAttribute {
    public key: string
    public value: string
    public index: bool

    constructor(key: string, value: string, index: bool) {
      this.key = key
      this.value = value
      this.index = index
    }
  }

  export class EventBlock {
    public block: Block
    public blockId: BlockID
    public resultBeginBlock: ResponseBeginBlock
    public resultEndBlock: ResponseEndBlock

    constructor(
      block: Block,
      blockId: BlockID,
      resultBeginBlock: ResponseBeginBlock,
      resultEndBlock: ResponseEndBlock,
    ) {
      this.block = block
      this.blockId = blockId
      this.resultBeginBlock = resultBeginBlock
      this.resultEndBlock = resultEndBlock
    }
  }

  export class EventTx {
    public txResult: TxResult

    constructor(txResult: TxResult) {
      this.txResult = txResult
    }
  }

  export class EventValidatorSetUpdates {
    public validatorUpdates: Array<Validator>

    constructor(validatorUpdates: Array<Validator>) {
      this.validatorUpdates = validatorUpdates
    }
  }

  export class EventVote {
    public eventVoteType: SignedMsgType
    public height: u64
    public round: i32
    public blockId: BlockID
    public timestamp: Timestamp
    public validatorAddress: Bytes
    public validatorIndex: i32
    public signature: Bytes

    constructor(
      eventVoteType: SignedMsgType,
      height: u64,
      round: i32,
      blockId: BlockID,
      timestamp: Timestamp,
      validatorAddress: Bytes,
      validatorIndex: i32,
      signature: Bytes,
    ) {
      this.eventVoteType = eventVoteType
      this.height = height
      this.round = round
      this.blockId = blockId
      this.timestamp = timestamp
      this.validatorAddress = validatorAddress
      this.validatorIndex = validatorIndex
      this.signature = signature
    }
  }

  export class Evidence {
    public duplicateVoteEvidence: DuplicateVoteEvidence
    public lightClientAttackEvidence: LightClientAttackEvidence

    constructor(
      duplicateVoteEvidence: DuplicateVoteEvidence,
      lightClientAttackEvidence: LightClientAttackEvidence,
    ) {
      this.duplicateVoteEvidence = duplicateVoteEvidence
      this.lightClientAttackEvidence = lightClientAttackEvidence
    }
  }

  export class EvidenceList {
    public evidence: Array<Evidence>

    constructor(evidence: Array<Evidence>) {
      this.evidence = evidence
    }
  }

  export class EvidenceParams {
    public maxAgeNumBlocks: i64
    public maxAgeDuration: Duration
    public maxBytes: i64

    constructor(maxAgeNumBlocks: i64, maxAgeDuration: Duration, maxBytes: i64) {
      this.maxAgeNumBlocks = maxAgeNumBlocks
      this.maxAgeDuration = maxAgeDuration
      this.maxBytes = maxBytes
    }
  }

  export class Header {
    public version: Consensus
    public chainId: string
    public height: u64
    public time: Timestamp
    public lastBlockId: BlockID
    public lastCommitHash: Bytes
    public dataHash: Bytes
    public validatorsHash: Bytes
    public nextValidatorsHash: Bytes
    public consensusHash: Bytes
    public appHash: Bytes
    public lastResultsHash: Bytes
    public evidenceHash: Bytes
    public proposerAddress: Bytes

    constructor(
      version: Consensus,
      chainId: string,
      height: u64,
      time: Timestamp,
      lastBlockId: BlockID,
      lastCommitHash: Bytes,
      dataHash: Bytes,
      validatorsHash: Bytes,
      nextValidatorsHash: Bytes,
      consensusHash: Bytes,
      appHash: Bytes,
      lastResultsHash: Bytes,
      evidenceHash: Bytes,
      proposerAddress: Bytes,
    ) {
      this.version = version
      this.chainId = chainId
      this.height = height
      this.time = time
      this.lastBlockId = lastBlockId
      this.lastCommitHash = lastCommitHash
      this.dataHash = dataHash
      this.validatorsHash = validatorsHash
      this.nextValidatorsHash = nextValidatorsHash
      this.consensusHash = consensusHash
      this.appHash = appHash
      this.lastResultsHash = lastResultsHash
      this.evidenceHash = evidenceHash
      this.proposerAddress = proposerAddress
    }
  }

  export class LightBlock {
    public signedHeader: SignedHeader
    public validatorSet: ValidatorSet

    constructor(signedHeader: SignedHeader, validatorSet: ValidatorSet) {
      this.signedHeader = signedHeader
      this.validatorSet = validatorSet
    }
  }

  export class LightClientAttackEvidence {
    public conflictingBlock: LightBlock
    public commonHeight: i64
    public byzantineValidators: Array<Validator>
    public totalVotingPower: i64
    public timestamp: Timestamp

    constructor(
      conflictingBlock: LightBlock,
      commonHeight: i64,
      byzantineValidators: Array<Validator>,
      totalVotingPower: i64,
      timestamp: Timestamp,
    ) {
      this.conflictingBlock = conflictingBlock
      this.commonHeight = commonHeight
      this.byzantineValidators = byzantineValidators
      this.totalVotingPower = totalVotingPower
      this.timestamp = timestamp
    }
  }

  export class PublicKey {
    public ed25519: Bytes
    public secp256k1: Bytes

    constructor(ed25519: Bytes, secp256k1: Bytes) {
      this.ed25519 = ed25519
      this.secp256k1 = secp256k1
    }
  }

  export class PartSetHeader {
    public total: u32
    public hash: Bytes

    constructor(total: u32, hash: Bytes) {
      this.total = total
      this.hash = hash
    }
  }

  export class ResponseBeginBlock {
    public events: Array<Event>

    constructor(events: Array<Event>) {
      this.events = events
    }
  }

  export class ResponseEndBlock {
    public validatorUpdates: Array<ValidatorUpdate>
    public consensusParamUpdates: ConsensusParams
    public events: Array<Event>

    constructor(
      validatorUpdates: Array<ValidatorUpdate>,
      consensusParamUpdates: ConsensusParams,
      events: Array<Event>,
    ) {
      this.validatorUpdates = validatorUpdates
      this.consensusParamUpdates = consensusParamUpdates
      this.events = events
    }
  }

  export class ResponseDeliverTx {
    public code: u32
    public data: Bytes
    public log: string
    public info: string
    public gasWanted: i64
    public gasUsed: i64
    public events: Array<Event>
    public codespace: string

    constructor(
      code: u32,
      data: Bytes,
      log: string,
      info: string,
      gasWanted: i64,
      gasUsed: i64,
      events: Array<Event>,
      codespace: string,
    ) {
      this.code = code
      this.data = data
      this.log = log
      this.info = info
      this.gasWanted = gasWanted
      this.gasUsed = gasUsed
      this.events = events
      this.codespace = codespace
    }
  }

  export class SignedHeader {
    public header: Header
    public commit: Commit

    constructor(header: Header, commit: Commit) {
      this.header = header
      this.commit = commit
    }
  }

  export class Timestamp {
    public seconds: i64
    public nanos: i32

    constructor(seconds: i64, nanos: i32) {
      this.seconds = seconds
      this.nanos = nanos
    }
  }

  export class TxResult {
    public height: u64
    public index: u32
    public tx: Bytes
    public result: ResponseDeliverTx

    constructor(height: u64, index: u32, tx: Bytes, result: ResponseDeliverTx) {
      this.height = height
      this.index = index
      this.tx = tx
      this.result = result
    }
  }

  export class Validator {
    public address: Bytes
    public pubKey: PublicKey
    public votingPower: i64
    public proposerPriority: i64

    constructor(
      address: Bytes,
      pubKey: PublicKey,
      votingPower: i64,
      proposerPriority: i64,
    ) {
      this.address = address
      this.pubKey = pubKey
      this.votingPower = votingPower
      this.proposerPriority = proposerPriority
    }
  }

  export class ValidatorParams {
    public pubKeyTypes: Array<string>

    constructor(pubKeyTypes: Array<string>) {
      this.pubKeyTypes = pubKeyTypes
    }
  }

  export class ValidatorSet {
    public validators: Array<Validator>
    public proposer: Validator
    public totalVotingPower: i64

    constructor(
      validators: Array<Validator>,
      proposer: Validator,
      totalVotingPower: i64,
    ) {
      this.validators = validators
      this.proposer = proposer
      this.totalVotingPower = totalVotingPower
    }
  }

  export class ValidatorUpdate {
    public address: Bytes
    public pubKey: PublicKey
    public power: i64

    constructor(address: Bytes, pubKey: PublicKey, power: i64) {
      this.address = address
      this.pubKey = pubKey
      this.power = power
    }
  }

  export class VersionParams {
    public appVersion: u64

    constructor(appVersion: u64) {
      this.appVersion = appVersion
    }
  }
}
