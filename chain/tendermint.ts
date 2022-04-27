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

  export enum SignMode {
    SIGN_MODE_UNSPECIFIED = 0,
    SIGN_MODE_DIRECT = 1,
    SIGN_MODE_TEXTUAL = 2,
    SIGN_MODE_LEGACY_AMINO_JSON = 127,
  }

  export enum ScalarType {
    SCALAR_TYPE_UNSPECIFIED = 0,
    SCALAR_TYPE_STRING = 1,
    SCALAR_TYPE_BYTES = 2,
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

  export class TransactionData {
    public tx: TxResult
    public block: EventBlock

    constructor(tx: TxResult, block: EventBlock) {
      this.tx = tx
      this.block = block
    }
  }

  export class Block {
    public header: Header
    public evidence: EvidenceList
    public lastCommit: Commit

    constructor(header: Header, evidence: EvidenceList, lastCommit: Commit) {
      this.header = header
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
    public tx: Tx
    public result: ResponseDeliverTx
    public hash: Bytes

    constructor(height: u64, index: u32, tx: Tx, result: ResponseDeliverTx, hash: Bytes) {
      this.height = height
      this.index = index
      this.tx = tx
      this.result = result
      this.hash = hash
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

  export class Any {
    public typeUrl: string
    public value: Bytes

    constructor(typeUrl: string, value: Bytes) {
      this.typeUrl = typeUrl
      this.value = value
    }
  }
  export class MultiSignature {
    public signatures: Array<Bytes>

    constructor(signatures: Array<Bytes>) {
      this.signatures = signatures
    }
  }

  export class CompactBitArray {
    public extraBitsStored: u32
    public elems: Bytes

    constructor(extraBitsStored: u32, elems: Bytes) {
      this.extraBitsStored = extraBitsStored
      this.elems = elems
    }
  }

  export class SignatureDescriptors {
    public signatures: Array<SignatureDescriptor>

    constructor(signatures: Array<SignatureDescriptor>) {
      this.signatures = signatures
    }
  }

  export class Single {
    public mode: SignMode
    public signature: Bytes

    constructor(mode: SignMode, signature: Bytes) {
      this.mode = mode
      this.signature = signature
    }
  }

  export class Multi {
    public bitarray: CompactBitArray
    public signatures: Array<Data>

    constructor(bitarray: CompactBitArray, signatures: Array<Data>) {
      this.bitarray = bitarray
      this.signatures = signatures
    }
  }

  export class Data {
    public single: Single
    public multi: Multi

    constructor(single: Single, multi: Multi) {
      this.single = single
      this.multi = multi
    }
  }

  export class SignatureDescriptor {
    public publicKey: Any
    public data: Data
    public sequence: u64

    constructor(publicKey: Any, data: Data, sequence: u64) {
      this.publicKey = publicKey
      this.data = data
      this.sequence = sequence
    }
  }

  export class InterfaceDescriptor {
    public name: string
    public description: string

    constructor(name: string, description: string) {
      this.name = name
      this.description = description
    }
  }

  export class ScalarDescriptor {
    public name: string
    public description: string
    public fieldType: Array<ScalarType>

    constructor(name: string, description: string, fieldType: Array<ScalarType>) {
      this.name = name
      this.description = description
      this.fieldType = fieldType
    }
  }

  export class Coin {
    public denom: string
    public amount: string

    constructor(denom: string, amount: string) {
      this.denom = denom
      this.amount = amount
    }
  }

  export class DecCoin {
    public denom: string
    public amount: string

    constructor(denom: string, amount: string) {
      this.denom = denom
      this.amount = amount
    }
  }

  export class IntProto {
    public int: string

    constructor(int: string) {
      this.int = int
    }
  }

  export class DecProto {
    public dec: string

    constructor(dec: string) {
      this.dec = dec
    }
  }

  export class Tx {
    public body: TxBody
    public authInfo: AuthInfo
    public signatures: Array<Bytes>

    constructor(body: TxBody, authInfo: AuthInfo, signatures: Array<Bytes>) {
      this.body = body
      this.authInfo = authInfo
      this.signatures = signatures
    }
  }

  export class TxRaw {
    public bodyBytes: Bytes
    public authInfoBytes: Bytes
    public signatures: Array<Bytes>

    constructor(bodyBytes: Bytes, authInfoBytes: Bytes, signatures: Array<Bytes>) {
      this.bodyBytes = bodyBytes
      this.authInfoBytes = authInfoBytes
      this.signatures = signatures
    }
  }

  export class SignDoc {
    public bodyBytes: Bytes
    public authInfoBytes: Bytes
    public chainId: string
    public accountNumber: u64

    constructor(
      bodyBytes: Bytes,
      authInfoBytes: Bytes,
      chainId: string,
      accountNumber: u64,
    ) {
      this.bodyBytes = bodyBytes
      this.authInfoBytes = authInfoBytes
      this.chainId = chainId
      this.accountNumber = accountNumber
    }
  }

  export class SignDocDirectAux {
    public bodyBytes: Bytes
    public publicKey: Any
    public chainId: string
    public accountNumber: u64
    public sequence: u64
    public tip: Tip

    constructor(
      bodyBytes: Bytes,
      publicKey: Any,
      chainId: string,
      accountNumber: u64,
      sequence: u64,
      tip: Tip,
    ) {
      this.bodyBytes = bodyBytes
      this.publicKey = publicKey
      this.chainId = chainId
      this.accountNumber = accountNumber
      this.sequence = sequence
      this.tip = tip
    }
  }

  export class TxBody {
    public messages: Array<Any>
    public memo: string
    public timeoutHeight: u64
    public extensionOptions: Array<Any>
    public nonCriticalExtensionOptions: Array<Any>

    constructor(
      messages: Array<Any>,
      memo: string,
      timeoutHeight: u64,
      extensionOptions: Array<Any>,
      nonCriticalExtensionOptions: Array<Any>,
    ) {
      this.messages = messages
      this.memo = memo
      this.timeoutHeight = timeoutHeight
      this.extensionOptions = extensionOptions
      this.nonCriticalExtensionOptions = nonCriticalExtensionOptions
    }
  }

  export class AuthInfo {
    public signerInfos: Array<SignerInfo>
    public fee: Fee
    public tip: Tip

    constructor(signerInfos: Array<SignerInfo>, fee: Fee, tip: Tip) {
      this.signerInfos = signerInfos
      this.fee = fee
      this.tip = tip
    }
  }

  export class SignerInfo {
    public publicKey: Any
    public modeInfo: ModeInfo
    public sequence: u64

    constructor(publicKey: Any, modeInfo: ModeInfo, sequence: u64) {
      this.publicKey = publicKey
      this.modeInfo = modeInfo
      this.sequence = sequence
    }
  }

  export class ModeInfo {
    public single: ModeInfoSingle
    public multi: ModeInfoMulti

    constructor(single: ModeInfoSingle, multi: ModeInfoMulti) {
      this.single = single
      this.multi = multi
    }
  }

  export class ModeInfoSingle {
    public mode: SignMode

    constructor(mode: SignMode) {
      this.mode = mode
    }
  }

  export class ModeInfoMulti {
    public bitarray: CompactBitArray
    public modeInfos: Array<ModeInfo>

    constructor(bitarray: CompactBitArray, modeInfos: Array<ModeInfo>) {
      this.bitarray = bitarray
      this.modeInfos = modeInfos
    }
  }

  export class Fee {
    public amount: Array<Coin>
    public gasLimit: u64
    public payer: string
    public granter: string

    constructor(amount: Array<Coin>, gasLimit: u64, payer: string, granter: string) {
      this.amount = amount
      this.gasLimit = gasLimit
      this.payer = payer
      this.granter = granter
    }
  }

  export class Tip {
    public amount: Array<Coin>
    public tipper: string

    constructor(amount: Array<Coin>, tipper: string) {
      this.amount = amount
      this.tipper = tipper
    }
  }

  export class AuxSignerData {
    public address: string
    public signDoc: SignDocDirectAux
    public mode: SignMode
    public sig: Bytes

    constructor(address: string, signDoc: SignDocDirectAux, mode: SignMode, sig: Bytes) {
      this.address = address
      this.signDoc = signDoc
      this.mode = mode
      this.sig = sig
    }
  }
}
