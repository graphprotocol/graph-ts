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

  export class Block {
    public header: Header
    public data: Data
    public evidence: EvidenceList
    public last_commit: Commit

    constructor(header: Header, data: Data, evidence: EvidenceList, last_commit: Commit) {
      this.header = header
      this.data = data
      this.evidence = evidence
      this.last_commit = last_commit
    }
  }

  export class BlockID {
    public hash: Bytes
    public part_set_header: PartSetHeader

    constructor(hash: Bytes, part_set_header: PartSetHeader) {
      this.hash = hash
      this.part_set_header = part_set_header
    }
  }

  export class BlockParams {
    public max_bytes: i64
    public max_gas: i64

    constructor(max_bytes: i64, max_gas: i64) {
      this.max_bytes = max_bytes
      this.max_gas = max_gas
    }
  }

  export class Commit {
    public height: i64
    public round: i32
    public block_id: BlockID
    public signatures: Array<CommitSig>

    constructor(
      height: i64,
      round: i32,
      block_id: BlockID,
      signatures: Array<CommitSig>,
    ) {
      this.height = height
      this.round = round
      this.block_id = block_id
      this.signatures = signatures
    }
  }

  export class CommitSig {
    public block_id_flag: BlockIDFlag
    public validator_address: Bytes
    public timestamp: Timestamp
    public signature: Bytes

    constructor(
      block_id_flag: BlockIDFlag,
      validator_address: Bytes,
      timestamp: Timestamp,
      signature: Bytes,
    ) {
      this.block_id_flag = block_id_flag
      this.validator_address = validator_address
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
    public vote_a: EventVote
    public vote_b: EventVote
    public total_voting_power: i64
    public validator_power: i64
    public timestamp: Timestamp

    constructor(
      vote_a: EventVote,
      vote_b: EventVote,
      total_voting_power: i64,
      validator_power: i64,
      timestamp: Timestamp,
    ) {
      this.vote_a = vote_a
      this.vote_b = vote_b
      this.total_voting_power = total_voting_power
      this.validator_power = validator_power
      this.timestamp = timestamp
    }
  }

  export class Event {
    public event_type: string
    public attributes: Array<EventAttribute>

    constructor(event_type: string, attributes: Array<EventAttribute>) {
      this.event_type = event_type
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
    public block_id: BlockID
    public result_begin_block: ResponseBeginBlock
    public result_end_block: ResponseEndBlock

    constructor(
      block: Block,
      block_id: BlockID,
      result_begin_block: ResponseBeginBlock,
      result_end_block: ResponseEndBlock,
    ) {
      this.block = block
      this.block_id = block_id
      this.result_begin_block = result_begin_block
      this.result_end_block = result_end_block
    }
  }

  export class EventData {
    public event: Event
    public block: EventList

    constructor(event: Event, block: EventList) {
      this.event = event
      this.block = block
    }
  }

  export class EventList {
    public new_block: EventBlock
    public transaction: Array<EventTx>
    public validator_set_updates: EventValidatorSetUpdates

    constructor(
      new_block: EventBlock,
      transaction: Array<EventTx>,
      validator_set_updates: EventValidatorSetUpdates,
    ) {
      this.new_block = new_block
      this.transaction = transaction
      this.validator_set_updates = validator_set_updates
    }
  }

  export class EventTx {
    public tx_result: TxResult

    constructor(tx_result: TxResult) {
      this.tx_result = tx_result
    }
  }

  export class EventValidatorSetUpdates {
    public validator_updates: Array<Validator>

    constructor(validator_updates: Array<Validator>) {
      this.validator_updates = validator_updates
    }
  }

  export class EventVote {
    public event_vote_type: SignedMsgType
    public height: u64
    public round: i32
    public block_id: BlockID
    public timestamp: Timestamp
    public validator_address: Bytes
    public validator_index: i32
    public signature: Bytes

    constructor(
      event_vote_type: SignedMsgType,
      height: u64,
      round: i32,
      block_id: BlockID,
      timestamp: Timestamp,
      validator_address: Bytes,
      validator_index: i32,
      signature: Bytes,
    ) {
      this.event_vote_type = event_vote_type
      this.height = height
      this.round = round
      this.block_id = block_id
      this.timestamp = timestamp
      this.validator_address = validator_address
      this.validator_index = validator_index
      this.signature = signature
    }
  }

  export class Evidence {
    public duplicate_vote_evidence: DuplicateVoteEvidence
    public light_client_attack_evidence: LightClientAttackEvidence

    constructor(
      duplicate_vote_evidence: DuplicateVoteEvidence,
      light_client_attack_evidence: LightClientAttackEvidence,
    ) {
      this.duplicate_vote_evidence = duplicate_vote_evidence
      this.light_client_attack_evidence = light_client_attack_evidence
    }
  }

  export class EvidenceList {
    public evidence: Array<Evidence>

    constructor(evidence: Array<Evidence>) {
      this.evidence = evidence
    }
  }

  export class EvidenceParams {
    public max_age_num_blocks: i64
    public max_age_duration: Duration
    public max_bytes: i64

    constructor(max_age_num_blocks: i64, max_age_duration: Duration, max_bytes: i64) {
      this.max_age_num_blocks = max_age_num_blocks
      this.max_age_duration = max_age_duration
      this.max_bytes = max_bytes
    }
  }

  export class Header {
    public version: Consensus
    public chain_id: string
    public height: u64
    public time: Timestamp
    public last_block_id: BlockID
    public last_commit_hash: Bytes
    public data_hash: Bytes
    public validators_hash: Bytes
    public next_validators_hash: Bytes
    public consensus_hash: Bytes
    public app_hash: Bytes
    public last_results_hash: Bytes
    public evidence_hash: Bytes
    public proposer_address: Bytes

    constructor(
      version: Consensus,
      chain_id: string,
      height: u64,
      time: Timestamp,
      last_block_id: BlockID,
      last_commit_hash: Bytes,
      data_hash: Bytes,
      validators_hash: Bytes,
      next_validators_hash: Bytes,
      consensus_hash: Bytes,
      app_hash: Bytes,
      last_results_hash: Bytes,
      evidence_hash: Bytes,
      proposer_address: Bytes,
    ) {
      this.version = version
      this.chain_id = chain_id
      this.height = height
      this.time = time
      this.last_block_id = last_block_id
      this.last_commit_hash = last_commit_hash
      this.data_hash = data_hash
      this.validators_hash = validators_hash
      this.next_validators_hash = next_validators_hash
      this.consensus_hash = consensus_hash
      this.app_hash = app_hash
      this.last_results_hash = last_results_hash
      this.evidence_hash = evidence_hash
      this.proposer_address = proposer_address
    }
  }

  export class LightBlock {
    public signed_header: SignedHeader
    public validator_set: ValidatorSet

    constructor(signed_header: SignedHeader, validator_set: ValidatorSet) {
      this.signed_header = signed_header
      this.validator_set = validator_set
    }
  }

  export class LightClientAttackEvidence {
    public conflicting_block: LightBlock
    public common_height: i64
    public byzantine_validators: Array<Validator>
    public total_voting_power: i64
    public timestamp: Timestamp

    constructor(
      conflicting_block: LightBlock,
      common_height: i64,
      byzantine_validators: Array<Validator>,
      total_voting_power: i64,
      timestamp: Timestamp,
    ) {
      this.conflicting_block = conflicting_block
      this.common_height = common_height
      this.byzantine_validators = byzantine_validators
      this.total_voting_power = total_voting_power
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
    public validator_updates: Array<ValidatorUpdate>
    public consensus_param_updates: ConsensusParams
    public events: Array<Event>

    constructor(
      validator_updates: Array<ValidatorUpdate>,
      consensus_param_updates: ConsensusParams,
      events: Array<Event>,
    ) {
      this.validator_updates = validator_updates
      this.consensus_param_updates = consensus_param_updates
      this.events = events
    }
  }

  export class ResponseDeliverTx {
    public code: u32
    public data: Bytes
    public log: string
    public info: string
    public gas_wanted: i64
    public gas_used: i64
    public events: Array<Event>
    public codespace: string

    constructor(
      code: u32,
      data: Bytes,
      log: string,
      info: string,
      gas_wanted: i64,
      gas_used: i64,
      events: Array<Event>,
      codespace: string,
    ) {
      this.code = code
      this.data = data
      this.log = log
      this.info = info
      this.gas_wanted = gas_wanted
      this.gas_used = gas_used
      this.events = events
      this.codespace = codespace
    }
  }

  export class Reward {
    public amount: string
    public validator: string

    constructor(amount: string, validator: string) {
      this.amount = amount
      this.validator = validator
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
    public pub_key: PublicKey
    public voting_power: i64
    public proposer_priority: i64

    constructor(
      address: Bytes,
      pub_key: PublicKey,
      voting_power: i64,
      proposer_priority: i64,
    ) {
      this.address = address
      this.pub_key = pub_key
      this.voting_power = voting_power
      this.proposer_priority = proposer_priority
    }
  }

  export class ValidatorParams {
    public pub_key_types: Array<string>

    constructor(pub_key_types: Array<string>) {
      this.pub_key_types = pub_key_types
    }
  }

  export class ValidatorSet {
    public validators: Array<Validator>
    public proposer: Validator
    public total_voting_power: i64

    constructor(
      validators: Array<Validator>,
      proposer: Validator,
      total_voting_power: i64,
    ) {
      this.validators = validators
      this.proposer = proposer
      this.total_voting_power = total_voting_power
    }
  }

  export class ValidatorUpdate {
    public address: Bytes
    public pub_key: PublicKey
    public power: i64

    constructor(address: Bytes, pub_key: PublicKey, power: i64) {
      this.address = address
      this.pub_key = pub_key
      this.power = power
    }
  }

  export class VersionParams {
    public app_version: u64

    constructor(app_version: u64) {
      this.app_version = app_version
    }
  }
}
