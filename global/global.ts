import { BigDecimal } from '../common/numbers'
import {
  Bytes,
  TypedMapEntry,
  Entity,
  TypedMap,
  Result,
  Wrapped,
} from '../common/collections'
import { JSONValue, Value } from '../common/value'
import { ethereum } from '../chain/ethereum'
import { near } from '../chain/near'
import { tendermint } from '../chain/tendermint'

/**
 * Contains type IDs and their discriminants for every blockchain supported by Graph-Node.
 *
 * Each variant corresponds to the unique ID of an AssemblyScript concrete class used by
 * Graph-Node's runtime.
 *
 * # Rules for updating this enum
 *
 * 1. The discriminants must have the same value as their counterparts in `IndexForAscTypeId` enum
 *    from `graph-node`'s `graph::runtime` module. If not, the runtime will fail to determine the
 *    correct class during allocation.
 * 2. Each supported blockchain has a reserved space of 1,000 * contiguous variants.
 * 3. Once defined, items and their discriminants cannot be changed, as this would break running
 *    subgraphs compiled in previous versions of this representation.
 */
export enum TypeId {
  String = 0,
  ArrayBuffer = 1,
  Int8Array = 2,
  Int16Array = 3,
  Int32Array = 4,
  Int64Array = 5,
  Uint8Array = 6,
  Uint16Array = 7,
  Uint32Array = 8,
  Uint64Array = 9,
  Float32Array = 10,
  Float64Array = 11,
  BigDecimal = 12,
  ArrayBool = 13,
  ArrayUint8Array = 14,
  ArrayEthereumValue = 15,
  ArrayStoreValue = 16,
  ArrayJsonValue = 17,
  ArrayString = 18,
  ArrayEventParam = 19,
  ArrayTypedMapEntryStringJsonValue = 20,
  ArrayTypedMapEntryStringStoreValue = 21,
  SmartContractCall = 22,
  EventParam = 23,
  EthereumTransaction = 24,
  EthereumBlock = 25,
  EthereumCall = 26,
  WrappedTypedMapStringJsonValue = 27,
  WrappedBool = 28,
  WrappedJsonValue = 29,
  EthereumValue = 30,
  StoreValue = 31,
  JsonValue = 32,
  EthereumEvent = 33,
  TypedMapEntryStringStoreValue = 34,
  TypedMapEntryStringJsonValue = 35,
  TypedMapStringStoreValue = 36,
  TypedMapStringJsonValue = 37,
  TypedMapStringTypedMapStringJsonValue = 38,
  ResultTypedMapStringJsonValueBool = 39,
  ResultJsonValueBool = 40,
  ArrayU8 = 41,
  ArrayU16 = 42,
  ArrayU32 = 43,
  ArrayU64 = 44,
  ArrayI8 = 45,
  ArrayI16 = 46,
  ArrayI32 = 47,
  ArrayI64 = 48,
  ArrayF32 = 49,
  ArrayF64 = 50,
  ArrayBigDecimal = 51,

  // Near types
  NearArrayDataReceiver = 52,
  NearArrayCryptoHash = 53,
  NearArrayActionValue = 54,
  NearMerklePath = 55, // or NearArrayMerklePathItem
  NearArrayValidatorStake = 56,
  NearArraySlashedValidator = 57,
  NearArraySignature = 58,
  NearArrayChunkHeader = 59,
  NearAccessKeyPermissionValue = 60,
  NearActionValue = 61,
  NearDirection = 62, // not used in graph-node anymore. Can be ignored.
  NearPublicKey = 63,
  NearSignature = 64,
  NearFunctionCallPermission = 65,
  NearFullAccessPermission = 66,
  NearAccessKey = 67,
  NearDataReceiver = 68,
  NearCreateAccountAction = 69,
  NearDeployContractAction = 70,
  NearFunctionCallAction = 71,
  NearTransferAction = 72,
  NearStakeAction = 73,
  NearAddKeyAction = 74,
  NearDeleteKeyAction = 75,
  NearDeleteAccountAction = 76,
  NearActionReceipt = 77,
  NearSuccessStatus = 78,
  NearMerklePathItem = 79,
  NearExecutionOutcome = 80,
  NearSlashedValidator = 81,
  NearBlockHeader = 82,
  NearValidatorStake = 83,
  NearChunkHeader = 84,
  NearBlock = 85,
  NearReceiptWithOutcome = 86,
  /*
  Reserved discriminant space for more Near type IDs: [87, 999]:
  Continue to add more Near type IDs here. e.g.:
  ```
  NextNearType = 87,
  AnotherNearType = 88,
  ...
  LastNearType = 999,
  ```
  */

  // Reserved discriminant space for more Ethereum type IDs: [1000, 1499]
  TransactionReceipt = 1000,
  Log = 1001,
  ArrayH256 = 1002,
  ArrayLog = 1003,
  /*
  Continue to add more Ethereum type IDs here. e.g.:
  ```
  NextEthereumType = 1004,
  AnotherEthereumType = 1005,
  ...
  LastEthereumType = 1499,
  ```
  */

  // Reserved discriminant space for Tendermint type IDs: [1,500, 2,499]
  TendermintArrayBytes = 1500,
  TendermintArrayCommitSig = 1501,
  TendermintArrayEvent = 1502,
  TendermintArrayEventAttribute = 1503,
  TendermintArrayEventTx = 1504,
  TendermintArrayEvidence = 1505,
  TendermintArrayValidator = 1506,
  TendermintArrayValidatorUpdate = 1507,
  TendermintBlock = 1508,
  TendermintBlockID = 1509,
  TendermintBlockIDFlagEnum = 1510,
  TendermintBlockParams = 1511,
  TendermintCommit = 1512,
  TendermintCommitSig = 1513,
  TendermintConsensus = 1514,
  TendermintConsensusParams = 1515,
  TendermintData = 1516,
  TendermintDuplicateVoteEvidence = 1517,
  TendermintDuration = 1518,
  TendermintEvent = 1519,
  TendermintEventAttribute = 1520,
  TendermintEventBlock = 1521,
  TendermintEventData = 1522,
  TendermintEventList = 1523,
  TendermintEventTx = 1524,
  TendermintEventValidatorSetUpdates = 1525,
  TendermintEventVote = 1526,
  TendermintEvidence = 1527,
  TendermintEvidenceList = 1528,
  TendermintEvidenceParams = 1529,
  TendermintHeader = 1530,
  TendermintLightBlock = 1531,
  TendermintLightClientAttackEvidence = 1532,
  TendermintPartSetHeader = 1533,
  TendermintPublicKey = 1534,
  TendermintResponseBeginBlock = 1535,
  TendermintResponseDeliverTx = 1536,
  TendermintResponseEndBlock = 1537,
  TendermintSignedHeader = 1538,
  TendermintSignedMsgTypeEnum = 1539,
  TendermintTimestamp = 1540,
  TendermintTxResult = 1541,
  TendermintValidator = 1542,
  TendermintValidatorParams = 1543,
  TendermintValidatorSet = 1544,
  TendermintValidatorUpdate = 1545,
  TendermintVersionParams = 1546,
  /*
  Continue to add more Tendermint type IDs here. e.g.:
  ```
  NextTendermintType = 1547,
  AnotherTendermintType = 1547,
  ...
  LastTendermintType = 2499,
  ```
  */

  // Reserved discriminant space for a future blockchain type IDs: [2,500, 3,499]
}

export function id_of_type(typeId: TypeId): usize {
  switch (typeId) {
    case TypeId.String:
      return idof<string>()
    case TypeId.ArrayBuffer:
      return idof<ArrayBuffer>()
    case TypeId.Int8Array:
      return idof<Int8Array>()
    case TypeId.Int16Array:
      return idof<Int16Array>()
    case TypeId.Int32Array:
      return idof<Int32Array>()
    case TypeId.Int64Array:
      return idof<Int64Array>()
    case TypeId.Uint8Array:
      return idof<Uint8Array>()
    case TypeId.Uint16Array:
      return idof<Uint16Array>()
    case TypeId.Uint32Array:
      return idof<Uint32Array>()
    case TypeId.Uint64Array:
      return idof<Uint64Array>()
    case TypeId.Float32Array:
      return idof<Float32Array>()
    case TypeId.Float64Array:
      return idof<Float64Array>()
    case TypeId.BigDecimal:
      return idof<BigDecimal>()
    case TypeId.ArrayBool:
      return idof<Array<bool>>()
    case TypeId.ArrayUint8Array:
      return idof<Array<Uint8Array>>()
    case TypeId.ArrayEthereumValue:
      return idof<Array<ethereum.Value>>()
    case TypeId.ArrayStoreValue:
      return idof<Array<Value>>()
    case TypeId.ArrayJsonValue:
      return idof<Array<JSONValue>>()
    case TypeId.ArrayString:
      return idof<Array<string>>()
    case TypeId.ArrayEventParam:
      return idof<Array<ethereum.EventParam>>()
    case TypeId.ArrayTypedMapEntryStringJsonValue:
      return idof<Array<TypedMapEntry<string, JSONValue>>>()
    case TypeId.ArrayTypedMapEntryStringStoreValue:
      return idof<Array<Entity>>()
    case TypeId.WrappedTypedMapStringJsonValue:
      return idof<Wrapped<TypedMapEntry<string, JSONValue>>>()
    case TypeId.WrappedBool:
      return idof<Wrapped<boolean>>()
    case TypeId.WrappedJsonValue:
      return idof<Wrapped<JSONValue>>()
    case TypeId.SmartContractCall:
      return idof<ethereum.SmartContractCall>()
    case TypeId.EventParam:
      return idof<ethereum.EventParam>()
    case TypeId.EthereumTransaction:
      return idof<ethereum.Transaction>()
    case TypeId.EthereumBlock:
      return idof<ethereum.Block>()
    case TypeId.EthereumCall:
      return idof<ethereum.Call>()
    case TypeId.EthereumValue:
      return idof<ethereum.Value>()
    case TypeId.StoreValue:
      return idof<Value>()
    case TypeId.JsonValue:
      return idof<JSONValue>()
    case TypeId.EthereumEvent:
      return idof<ethereum.Event>()
    case TypeId.TypedMapEntryStringStoreValue:
      return idof<Entity>()
    case TypeId.TypedMapEntryStringJsonValue:
      return idof<TypedMap<string, JSONValue>>()
    case TypeId.TypedMapStringStoreValue:
      return idof<TypedMap<string, Value>>()
    case TypeId.TypedMapStringJsonValue:
      return idof<TypedMap<string, JSONValue>>()
    case TypeId.TypedMapStringTypedMapStringJsonValue:
      return idof<TypedMap<string, TypedMap<string, JSONValue>>>()
    case TypeId.ResultTypedMapStringJsonValueBool:
      return idof<Result<TypedMap<string, JSONValue>, boolean>>()
    case TypeId.ResultJsonValueBool:
      return idof<Result<JSONValue, boolean>>()
    case TypeId.ArrayU8:
      return idof<Array<u8>>()
    case TypeId.ArrayU16:
      return idof<Array<u16>>()
    case TypeId.ArrayU32:
      return idof<Array<u32>>()
    case TypeId.ArrayU64:
      return idof<Array<u64>>()
    case TypeId.ArrayI8:
      return idof<Array<i8>>()
    case TypeId.ArrayI16:
      return idof<Array<i16>>()
    case TypeId.ArrayI32:
      return idof<Array<i32>>()
    case TypeId.ArrayI64:
      return idof<Array<i64>>()
    case TypeId.ArrayF32:
      return idof<Array<f32>>()
    case TypeId.ArrayF64:
      return idof<Array<f64>>()
    case TypeId.ArrayBigDecimal:
      return idof<Array<BigDecimal>>()
    case TypeId.NearArrayDataReceiver:
      return idof<Array<near.DataReceiver>>()
    case TypeId.NearArrayCryptoHash:
      return idof<Array<near.CryptoHash>>()
    case TypeId.NearArrayActionValue:
      return idof<Array<near.ActionValue>>()
    case TypeId.NearMerklePath:
      return idof<near.MerklePath>()
    case TypeId.NearArrayValidatorStake:
      return idof<Array<near.ValidatorStake>>()
    case TypeId.NearArraySlashedValidator:
      return idof<Array<near.SlashedValidator>>()
    case TypeId.NearArraySignature:
      return idof<Array<near.Signature>>()
    case TypeId.NearArrayChunkHeader:
      return idof<Array<near.ChunkHeader>>()
    case TypeId.NearAccessKeyPermissionValue:
      return idof<near.AccessKeyPermissionValue>()
    case TypeId.NearActionValue:
      return idof<near.ActionValue>()
    // Commented out because it's an enum, there's no type_id
    // case TypeId.NearDirection:
    //   return idof<near.Direction>()
    case TypeId.NearPublicKey:
      return idof<near.PublicKey>()
    case TypeId.NearSignature:
      return idof<near.Signature>()
    case TypeId.NearFunctionCallPermission:
      return idof<near.FunctionCallPermission>()
    case TypeId.NearFullAccessPermission:
      return idof<near.FullAccessPermission>()
    case TypeId.NearAccessKey:
      return idof<near.AccessKeyPermissionValue>()
    case TypeId.NearDataReceiver:
      return idof<near.DataReceiver>()
    case TypeId.NearCreateAccountAction:
      return idof<near.CreateAccountAction>()
    case TypeId.NearDeployContractAction:
      return idof<near.DeployContractAction>()
    case TypeId.NearFunctionCallAction:
      return idof<near.FunctionCallAction>()
    case TypeId.NearTransferAction:
      return idof<near.TransferAction>()
    case TypeId.NearStakeAction:
      return idof<near.StakeAction>()
    case TypeId.NearAddKeyAction:
      return idof<near.AddKeyAction>()
    case TypeId.NearDeleteKeyAction:
      return idof<near.DeleteKeyAction>()
    case TypeId.NearDeleteAccountAction:
      return idof<near.DeleteAccountAction>()
    case TypeId.NearActionReceipt:
      return idof<near.ActionReceipt>()
    case TypeId.NearSuccessStatus:
      return idof<near.SuccessStatus>()
    case TypeId.NearMerklePathItem:
      return idof<near.MerklePathItem>()
    case TypeId.NearExecutionOutcome:
      return idof<near.ExecutionOutcome>()
    case TypeId.NearSlashedValidator:
      return idof<near.SlashedValidator>()
    case TypeId.NearBlockHeader:
      return idof<near.BlockHeader>()
    case TypeId.NearValidatorStake:
      return idof<near.ValidatorStake>()
    case TypeId.NearChunkHeader:
      return idof<near.ChunkHeader>()
    case TypeId.NearBlock:
      return idof<near.Block>()
    case TypeId.NearReceiptWithOutcome:
      return idof<near.ReceiptWithOutcome>()
    case TypeId.TendermintArrayEventTx:
      return idof<Array<tendermint.EventTx>>()
    case TypeId.TendermintArrayEvent:
      return idof<Array<tendermint.Event>>()
    case TypeId.TendermintArrayCommitSig:
      return idof<Array<tendermint.CommitSig>>()
    case TypeId.TendermintArrayBytes:
      return idof<Array<Bytes>>()
    case TypeId.TendermintArrayEvidence:
      return idof<Array<tendermint.Evidence>>()
    case TypeId.TendermintArrayEventAttribute:
      return idof<Array<tendermint.EventAttribute>>()
    case TypeId.TendermintBlockIDFlagEnum:
      return idof<Array<tendermint.BlockIDFlag>>()
    case TypeId.TendermintSignedMsgTypeEnum:
      return idof<Array<tendermint.SignedMsgType>>()
    case TypeId.TendermintEventList:
      return idof<tendermint.EventList>()
    case TypeId.TendermintEventBlock:
      return idof<tendermint.EventBlock>()
    case TypeId.TendermintResponseBeginBlock:
      return idof<tendermint.ResponseBeginBlock>()
    case TypeId.TendermintResponseEndBlock:
      return idof<tendermint.ResponseEndBlock>()
    case TypeId.TendermintValidatorUpdate:
      return idof<tendermint.ValidatorUpdate>()
    case TypeId.TendermintArrayValidatorUpdate:
      return idof<Array<tendermint.ValidatorUpdate>>()
    case TypeId.TendermintConsensusParams:
      return idof<tendermint.ConsensusParams>()
    case TypeId.TendermintBlockParams:
      return idof<tendermint.BlockParams>()
    case TypeId.TendermintEvidenceParams:
      return idof<tendermint.EvidenceParams>()
    case TypeId.TendermintValidatorParams:
      return idof<tendermint.ValidatorParams>()
    case TypeId.TendermintVersionParams:
      return idof<tendermint.VersionParams>()
    case TypeId.TendermintBlock:
      return idof<tendermint.Block>()
    case TypeId.TendermintCommit:
      return idof<tendermint.Commit>()
    case TypeId.TendermintCommitSig:
      return idof<tendermint.CommitSig>()
    case TypeId.TendermintHeader:
      return idof<tendermint.Header>()
    case TypeId.TendermintConsensus:
      return idof<tendermint.Consensus>()
    case TypeId.TendermintBlockID:
      return idof<tendermint.BlockID>()
    case TypeId.TendermintPartSetHeader:
      return idof<tendermint.PartSetHeader>()
    case TypeId.TendermintData:
      return idof<tendermint.Data>()
    case TypeId.TendermintEvidence:
      return idof<tendermint.Evidence>()
    case TypeId.TendermintDuplicateVoteEvidence:
      return idof<tendermint.DuplicateVoteEvidence>()
    case TypeId.TendermintEventTx:
      return idof<tendermint.EventTx>()
    case TypeId.TendermintEventVote:
      return idof<tendermint.EventVote>()
    case TypeId.TendermintLightClientAttackEvidence:
      return idof<tendermint.LightClientAttackEvidence>()
    case TypeId.TendermintLightBlock:
      return idof<tendermint.LightBlock>()
    case TypeId.TendermintValidatorSet:
      return idof<tendermint.ValidatorSet>()
    case TypeId.TendermintSignedHeader:
      return idof<tendermint.SignedHeader>()
    case TypeId.TendermintEvidenceList:
      return idof<tendermint.EvidenceList>()
    case TypeId.TendermintValidator:
      return idof<tendermint.Validator>()
    case TypeId.TendermintArrayValidator:
      return idof<Array<tendermint.Validator>>()
    case TypeId.TendermintPublicKey:
      return idof<tendermint.PublicKey>()
    case TypeId.TendermintTxResult:
      return idof<tendermint.TxResult>()
    case TypeId.TendermintResponseDeliverTx:
      return idof<tendermint.ResponseDeliverTx>()
    case TypeId.TendermintEvent:
      return idof<tendermint.Event>()
    case TypeId.TendermintEventAttribute:
      return idof<tendermint.EventAttribute>()
    case TypeId.TendermintEventValidatorSetUpdates:
      return idof<tendermint.EventValidatorSetUpdates>()
    case TypeId.TendermintDuration:
      return idof<tendermint.Duration>()
    case TypeId.TendermintTimestamp:
      return idof<tendermint.Timestamp>()
    case TypeId.TendermintEventData:
      return idof<tendermint.EventData>()
    case TypeId.TransactionReceipt:
      return idof<ethereum.TransactionReceipt>()
    case TypeId.Log:
      return idof<ethereum.Log>()
    case TypeId.ArrayH256:
      return idof<Array<Uint8Array>>()
    case TypeId.ArrayLog:
      return idof<Array<ethereum.Log>>()
    default:
      return 0
  }
}

export function allocate(size: usize): usize {
  // @ts-ignore We do not want to expose __alloc, hence why we just ignore the error
  return __alloc(size)
}
