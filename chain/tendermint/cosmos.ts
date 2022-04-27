import { Writer, Reader, Protobuf } from 'as-proto'

export namespace cosmos {
  export namespace v1 {
    export class BlockID {
      static encode(message: BlockID, writer: Writer): void {
        writer.uint32(10)
        writer.bytes(message.hash)

        const part_set_header = message.part_set_header
        if (part_set_header !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.PartSetHeader.encode(part_set_header, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): BlockID {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new BlockID()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.hash = reader.bytes()
              break

            case 2:
              message.part_set_header = cosmos.v1.PartSetHeader.decode(
                reader,
                reader.uint32(),
              )
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      hash: Uint8Array
      part_set_header: cosmos.v1.PartSetHeader | null

      constructor(
        hash: Uint8Array = new Uint8Array(0),
        part_set_header: cosmos.v1.PartSetHeader | null = null,
      ) {
        this.hash = hash
        this.part_set_header = part_set_header
      }
    }

    export class Commit {
      static encode(message: Commit, writer: Writer): void {
        writer.uint32(8)
        writer.int64(message.height)

        writer.uint32(16)
        writer.int32(message.round)

        const block_id = message.block_id
        if (block_id !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.BlockID.encode(block_id, writer)
          writer.ldelim()
        }

        const signatures = message.signatures
        for (let i = 0; i < signatures.length; ++i) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.CommitSig.encode(signatures[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): Commit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Commit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.height = reader.int64()
              break

            case 2:
              message.round = reader.int32()
              break

            case 3:
              message.block_id = cosmos.v1.BlockID.decode(reader, reader.uint32())
              break

            case 4:
              message.signatures.push(cosmos.v1.CommitSig.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      height: i64
      round: i32
      block_id: cosmos.v1.BlockID | null
      signatures: Array<cosmos.v1.CommitSig>

      constructor(
        height: i64 = 0,
        round: i32 = 0,
        block_id: cosmos.v1.BlockID | null = null,
        signatures: Array<cosmos.v1.CommitSig> = [],
      ) {
        this.height = height
        this.round = round
        this.block_id = block_id
        this.signatures = signatures
      }
    }

    export class CommitSig {
      static encode(message: CommitSig, writer: Writer): void {
        writer.uint32(8)
        writer.int32(message.block_id_flag)

        writer.uint32(18)
        writer.bytes(message.validator_address)

        const timestamp = message.timestamp
        if (timestamp !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Timestamp.encode(timestamp, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.bytes(message.signature)
      }

      static decode(reader: Reader, length: i32): CommitSig {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new CommitSig()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.block_id_flag = reader.int32()
              break

            case 2:
              message.validator_address = reader.bytes()
              break

            case 3:
              message.timestamp = cosmos.v1.Timestamp.decode(reader, reader.uint32())
              break

            case 4:
              message.signature = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      block_id_flag: cosmos.v1.BlockIDFlag
      validator_address: Uint8Array
      timestamp: cosmos.v1.Timestamp | null
      signature: Uint8Array

      constructor(
        block_id_flag: cosmos.v1.BlockIDFlag = 0,
        validator_address: Uint8Array = new Uint8Array(0),
        timestamp: cosmos.v1.Timestamp | null = null,
        signature: Uint8Array = new Uint8Array(0),
      ) {
        this.block_id_flag = block_id_flag
        this.validator_address = validator_address
        this.timestamp = timestamp
        this.signature = signature
      }
    }

    @unmanaged
    export class Consensus {
      static encode(message: Consensus, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.block)

        writer.uint32(16)
        writer.uint64(message.app)
      }

      static decode(reader: Reader, length: i32): Consensus {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Consensus()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.block = reader.uint64()
              break

            case 2:
              message.app = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      block: u64
      app: u64

      constructor(block: u64 = 0, app: u64 = 0) {
        this.block = block
        this.app = app
      }
    }

    export class Header {
      static encode(message: Header, writer: Writer): void {
        const version = message.version
        if (version !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Consensus.encode(version, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.string(message.chain_id)

        writer.uint32(24)
        writer.uint64(message.height)

        const time = message.time
        if (time !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Timestamp.encode(time, writer)
          writer.ldelim()
        }

        const last_block_id = message.last_block_id
        if (last_block_id !== null) {
          writer.uint32(42)
          writer.fork()
          cosmos.v1.BlockID.encode(last_block_id, writer)
          writer.ldelim()
        }

        writer.uint32(50)
        writer.bytes(message.last_commit_hash)

        writer.uint32(58)
        writer.bytes(message.data_hash)

        writer.uint32(66)
        writer.bytes(message.validators_hash)

        writer.uint32(74)
        writer.bytes(message.next_validators_hash)

        writer.uint32(82)
        writer.bytes(message.consensus_hash)

        writer.uint32(90)
        writer.bytes(message.app_hash)

        writer.uint32(98)
        writer.bytes(message.last_results_hash)

        writer.uint32(106)
        writer.bytes(message.evidence_hash)

        writer.uint32(114)
        writer.bytes(message.proposer_address)
      }

      static decode(reader: Reader, length: i32): Header {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Header()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.version = cosmos.v1.Consensus.decode(reader, reader.uint32())
              break

            case 2:
              message.chain_id = reader.string()
              break

            case 3:
              message.height = reader.uint64()
              break

            case 4:
              message.time = cosmos.v1.Timestamp.decode(reader, reader.uint32())
              break

            case 5:
              message.last_block_id = cosmos.v1.BlockID.decode(reader, reader.uint32())
              break

            case 6:
              message.last_commit_hash = reader.bytes()
              break

            case 7:
              message.data_hash = reader.bytes()
              break

            case 8:
              message.validators_hash = reader.bytes()
              break

            case 9:
              message.next_validators_hash = reader.bytes()
              break

            case 10:
              message.consensus_hash = reader.bytes()
              break

            case 11:
              message.app_hash = reader.bytes()
              break

            case 12:
              message.last_results_hash = reader.bytes()
              break

            case 13:
              message.evidence_hash = reader.bytes()
              break

            case 14:
              message.proposer_address = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      version: cosmos.v1.Consensus | null
      chain_id: string
      height: u64
      time: cosmos.v1.Timestamp | null
      last_block_id: cosmos.v1.BlockID | null
      last_commit_hash: Uint8Array
      data_hash: Uint8Array
      validators_hash: Uint8Array
      next_validators_hash: Uint8Array
      consensus_hash: Uint8Array
      app_hash: Uint8Array
      last_results_hash: Uint8Array
      evidence_hash: Uint8Array
      proposer_address: Uint8Array

      constructor(
        version: cosmos.v1.Consensus | null = null,
        chain_id: string = '',
        height: u64 = 0,
        time: cosmos.v1.Timestamp | null = null,
        last_block_id: cosmos.v1.BlockID | null = null,
        last_commit_hash: Uint8Array = new Uint8Array(0),
        data_hash: Uint8Array = new Uint8Array(0),
        validators_hash: Uint8Array = new Uint8Array(0),
        next_validators_hash: Uint8Array = new Uint8Array(0),
        consensus_hash: Uint8Array = new Uint8Array(0),
        app_hash: Uint8Array = new Uint8Array(0),
        last_results_hash: Uint8Array = new Uint8Array(0),
        evidence_hash: Uint8Array = new Uint8Array(0),
        proposer_address: Uint8Array = new Uint8Array(0),
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

    export class PublicKey {
      static encode(message: PublicKey, writer: Writer): void {
        writer.uint32(10)
        writer.bytes(message.ed25519)

        writer.uint32(18)
        writer.bytes(message.secp256k1)
      }

      static decode(reader: Reader, length: i32): PublicKey {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new PublicKey()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.ed25519 = reader.bytes()
              break

            case 2:
              message.secp256k1 = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      ed25519: Uint8Array
      secp256k1: Uint8Array

      constructor(
        ed25519: Uint8Array = new Uint8Array(0),
        secp256k1: Uint8Array = new Uint8Array(0),
      ) {
        this.ed25519 = ed25519
        this.secp256k1 = secp256k1
      }
    }

    export class PartSetHeader {
      static encode(message: PartSetHeader, writer: Writer): void {
        writer.uint32(8)
        writer.uint32(message.total)

        writer.uint32(18)
        writer.bytes(message.hash)
      }

      static decode(reader: Reader, length: i32): PartSetHeader {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new PartSetHeader()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.total = reader.uint32()
              break

            case 2:
              message.hash = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      total: u32
      hash: Uint8Array

      constructor(total: u32 = 0, hash: Uint8Array = new Uint8Array(0)) {
        this.total = total
        this.hash = hash
      }
    }

    export class SignedHeader {
      static encode(message: SignedHeader, writer: Writer): void {
        const header = message.header
        if (header !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Header.encode(header, writer)
          writer.ldelim()
        }

        const commit = message.commit
        if (commit !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Commit.encode(commit, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): SignedHeader {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new SignedHeader()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.header = cosmos.v1.Header.decode(reader, reader.uint32())
              break

            case 2:
              message.commit = cosmos.v1.Commit.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      header: cosmos.v1.Header | null
      commit: cosmos.v1.Commit | null

      constructor(
        header: cosmos.v1.Header | null = null,
        commit: cosmos.v1.Commit | null = null,
      ) {
        this.header = header
        this.commit = commit
      }
    }

    @unmanaged
    export class Timestamp {
      static encode(message: Timestamp, writer: Writer): void {
        writer.uint32(8)
        writer.int64(message.seconds)

        writer.uint32(16)
        writer.int32(message.nanos)
      }

      static decode(reader: Reader, length: i32): Timestamp {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Timestamp()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.seconds = reader.int64()
              break

            case 2:
              message.nanos = reader.int32()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      seconds: i64
      nanos: i32

      constructor(seconds: i64 = 0, nanos: i32 = 0) {
        this.seconds = seconds
        this.nanos = nanos
      }
    }

    export class Validator {
      static encode(message: Validator, writer: Writer): void {
        writer.uint32(10)
        writer.bytes(message.address)

        const pub_key = message.pub_key
        if (pub_key !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.PublicKey.encode(pub_key, writer)
          writer.ldelim()
        }

        writer.uint32(24)
        writer.int64(message.voting_power)

        writer.uint32(32)
        writer.int64(message.proposer_priority)
      }

      static decode(reader: Reader, length: i32): Validator {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Validator()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.address = reader.bytes()
              break

            case 2:
              message.pub_key = cosmos.v1.PublicKey.decode(reader, reader.uint32())
              break

            case 3:
              message.voting_power = reader.int64()
              break

            case 4:
              message.proposer_priority = reader.int64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      address: Uint8Array
      pub_key: cosmos.v1.PublicKey | null
      voting_power: i64
      proposer_priority: i64

      constructor(
        address: Uint8Array = new Uint8Array(0),
        pub_key: cosmos.v1.PublicKey | null = null,
        voting_power: i64 = 0,
        proposer_priority: i64 = 0,
      ) {
        this.address = address
        this.pub_key = pub_key
        this.voting_power = voting_power
        this.proposer_priority = proposer_priority
      }
    }

    export class ValidatorSet {
      static encode(message: ValidatorSet, writer: Writer): void {
        const validators = message.validators
        for (let i = 0; i < validators.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Validator.encode(validators[i], writer)
          writer.ldelim()
        }

        const proposer = message.proposer
        if (proposer !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Validator.encode(proposer, writer)
          writer.ldelim()
        }

        writer.uint32(24)
        writer.int64(message.total_voting_power)
      }

      static decode(reader: Reader, length: i32): ValidatorSet {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ValidatorSet()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.validators.push(cosmos.v1.Validator.decode(reader, reader.uint32()))
              break

            case 2:
              message.proposer = cosmos.v1.Validator.decode(reader, reader.uint32())
              break

            case 3:
              message.total_voting_power = reader.int64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      validators: Array<cosmos.v1.Validator>
      proposer: cosmos.v1.Validator | null
      total_voting_power: i64

      constructor(
        validators: Array<cosmos.v1.Validator> = [],
        proposer: cosmos.v1.Validator | null = null,
        total_voting_power: i64 = 0,
      ) {
        this.validators = validators
        this.proposer = proposer
        this.total_voting_power = total_voting_power
      }
    }

    export class Tx {
      static encode(message: Tx, writer: Writer): void {
        const body = message.body
        if (body !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.TxBody.encode(body, writer)
          writer.ldelim()
        }

        const auth_info = message.auth_info
        if (auth_info !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.AuthInfo.encode(auth_info, writer)
          writer.ldelim()
        }

        const signatures = message.signatures
        if (signatures.length !== 0) {
          for (let i = 0; i < signatures.length; ++i) {
            writer.uint32(26)
            writer.bytes(signatures[i])
          }
        }
      }

      static decode(reader: Reader, length: i32): Tx {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Tx()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.body = cosmos.v1.TxBody.decode(reader, reader.uint32())
              break

            case 2:
              message.auth_info = cosmos.v1.AuthInfo.decode(reader, reader.uint32())
              break

            case 3:
              message.signatures.push(reader.bytes())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      body: cosmos.v1.TxBody | null
      auth_info: cosmos.v1.AuthInfo | null
      signatures: Array<Uint8Array>

      constructor(
        body: cosmos.v1.TxBody | null = null,
        auth_info: cosmos.v1.AuthInfo | null = null,
        signatures: Array<Uint8Array> = [],
      ) {
        this.body = body
        this.auth_info = auth_info
        this.signatures = signatures
      }
    }

    export class TxBody {
      static encode(message: TxBody, writer: Writer): void {
        const messages = message.messages
        for (let i = 0; i < messages.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Any.encode(messages[i], writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.string(message.memo)

        writer.uint32(24)
        writer.uint64(message.timeout_height)

        const extension_options = message.extension_options
        for (let i = 0; i < extension_options.length; ++i) {
          writer.uint32(8186)
          writer.fork()
          cosmos.v1.Any.encode(extension_options[i], writer)
          writer.ldelim()
        }

        const non_critical_extension_options = message.non_critical_extension_options
        for (let i = 0; i < non_critical_extension_options.length; ++i) {
          writer.uint32(16378)
          writer.fork()
          cosmos.v1.Any.encode(non_critical_extension_options[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): TxBody {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new TxBody()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.messages.push(cosmos.v1.Any.decode(reader, reader.uint32()))
              break

            case 2:
              message.memo = reader.string()
              break

            case 3:
              message.timeout_height = reader.uint64()
              break

            case 1023:
              message.extension_options.push(
                cosmos.v1.Any.decode(reader, reader.uint32()),
              )
              break

            case 2047:
              message.non_critical_extension_options.push(
                cosmos.v1.Any.decode(reader, reader.uint32()),
              )
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      messages: Array<cosmos.v1.Any>
      memo: string
      timeout_height: u64
      extension_options: Array<cosmos.v1.Any>
      non_critical_extension_options: Array<cosmos.v1.Any>

      constructor(
        messages: Array<cosmos.v1.Any> = [],
        memo: string = '',
        timeout_height: u64 = 0,
        extension_options: Array<cosmos.v1.Any> = [],
        non_critical_extension_options: Array<cosmos.v1.Any> = [],
      ) {
        this.messages = messages
        this.memo = memo
        this.timeout_height = timeout_height
        this.extension_options = extension_options
        this.non_critical_extension_options = non_critical_extension_options
      }
    }

    export class AuthInfo {
      static encode(message: AuthInfo, writer: Writer): void {
        const signer_infos = message.signer_infos
        for (let i = 0; i < signer_infos.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.SignerInfo.encode(signer_infos[i], writer)
          writer.ldelim()
        }

        const fee = message.fee
        if (fee !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Fee.encode(fee, writer)
          writer.ldelim()
        }

        const tip = message.tip
        if (tip !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Tip.encode(tip, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): AuthInfo {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new AuthInfo()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.signer_infos.push(
                cosmos.v1.SignerInfo.decode(reader, reader.uint32()),
              )
              break

            case 2:
              message.fee = cosmos.v1.Fee.decode(reader, reader.uint32())
              break

            case 3:
              message.tip = cosmos.v1.Tip.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      signer_infos: Array<cosmos.v1.SignerInfo>
      fee: cosmos.v1.Fee | null
      tip: cosmos.v1.Tip | null

      constructor(
        signer_infos: Array<cosmos.v1.SignerInfo> = [],
        fee: cosmos.v1.Fee | null = null,
        tip: cosmos.v1.Tip | null = null,
      ) {
        this.signer_infos = signer_infos
        this.fee = fee
        this.tip = tip
      }
    }

    export class SignerInfo {
      static encode(message: SignerInfo, writer: Writer): void {
        const public_key = message.public_key
        if (public_key !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Any.encode(public_key, writer)
          writer.ldelim()
        }

        const mode_info = message.mode_info
        if (mode_info !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.ModeInfo.encode(mode_info, writer)
          writer.ldelim()
        }

        writer.uint32(24)
        writer.uint64(message.sequence)
      }

      static decode(reader: Reader, length: i32): SignerInfo {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new SignerInfo()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.public_key = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 2:
              message.mode_info = cosmos.v1.ModeInfo.decode(reader, reader.uint32())
              break

            case 3:
              message.sequence = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      public_key: cosmos.v1.Any | null
      mode_info: cosmos.v1.ModeInfo | null
      sequence: u64

      constructor(
        public_key: cosmos.v1.Any | null = null,
        mode_info: cosmos.v1.ModeInfo | null = null,
        sequence: u64 = 0,
      ) {
        this.public_key = public_key
        this.mode_info = mode_info
        this.sequence = sequence
      }
    }

    export class ModeInfo {
      static encode(message: ModeInfo, writer: Writer): void {
        const single = message.single
        if (single !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Single.encode(single, writer)
          writer.ldelim()
        }

        const multi = message.multi
        if (multi !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Multi.encode(multi, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): ModeInfo {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ModeInfo()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.single = cosmos.v1.Single.decode(reader, reader.uint32())
              break

            case 2:
              message.multi = cosmos.v1.Multi.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      single: cosmos.v1.Single | null
      multi: cosmos.v1.Multi | null

      constructor(
        single: cosmos.v1.Single | null = null,
        multi: cosmos.v1.Multi | null = null,
      ) {
        this.single = single
        this.multi = multi
      }
    }

    @unmanaged
    export class Single {
      static encode(message: Single, writer: Writer): void {
        writer.uint32(8)
        writer.int32(message.mode)
      }

      static decode(reader: Reader, length: i32): Single {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Single()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.mode = reader.int32()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      mode: cosmos.v1.SignMode

      constructor(mode: cosmos.v1.SignMode = 0) {
        this.mode = mode
      }
    }

    export class Multi {
      static encode(message: Multi, writer: Writer): void {
        const bitarray = message.bitarray
        if (bitarray !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.CompactBitArray.encode(bitarray, writer)
          writer.ldelim()
        }

        const mode_infos = message.mode_infos
        for (let i = 0; i < mode_infos.length; ++i) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.ModeInfo.encode(mode_infos[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): Multi {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Multi()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.bitarray = cosmos.v1.CompactBitArray.decode(reader, reader.uint32())
              break

            case 2:
              message.mode_infos.push(cosmos.v1.ModeInfo.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      bitarray: cosmos.v1.CompactBitArray | null
      mode_infos: Array<cosmos.v1.ModeInfo>

      constructor(
        bitarray: cosmos.v1.CompactBitArray | null = null,
        mode_infos: Array<cosmos.v1.ModeInfo> = [],
      ) {
        this.bitarray = bitarray
        this.mode_infos = mode_infos
      }
    }

    export class CompactBitArray {
      static encode(message: CompactBitArray, writer: Writer): void {
        writer.uint32(8)
        writer.uint32(message.extra_bits_stored)

        writer.uint32(18)
        writer.bytes(message.elems)
      }

      static decode(reader: Reader, length: i32): CompactBitArray {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new CompactBitArray()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.extra_bits_stored = reader.uint32()
              break

            case 2:
              message.elems = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      extra_bits_stored: u32
      elems: Uint8Array

      constructor(extra_bits_stored: u32 = 0, elems: Uint8Array = new Uint8Array(0)) {
        this.extra_bits_stored = extra_bits_stored
        this.elems = elems
      }
    }

    export class Fee {
      static encode(message: Fee, writer: Writer): void {
        const amount = message.amount
        for (let i = 0; i < amount.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Coin.encode(amount[i], writer)
          writer.ldelim()
        }

        writer.uint32(16)
        writer.uint64(message.gas_limit)

        writer.uint32(26)
        writer.string(message.payer)

        writer.uint32(34)
        writer.string(message.granter)
      }

      static decode(reader: Reader, length: i32): Fee {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Fee()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.amount.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            case 2:
              message.gas_limit = reader.uint64()
              break

            case 3:
              message.payer = reader.string()
              break

            case 4:
              message.granter = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      amount: Array<cosmos.v1.Coin>
      gas_limit: u64
      payer: string
      granter: string

      constructor(
        amount: Array<cosmos.v1.Coin> = [],
        gas_limit: u64 = 0,
        payer: string = '',
        granter: string = '',
      ) {
        this.amount = amount
        this.gas_limit = gas_limit
        this.payer = payer
        this.granter = granter
      }
    }

    export class Tip {
      static encode(message: Tip, writer: Writer): void {
        const amount = message.amount
        for (let i = 0; i < amount.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Coin.encode(amount[i], writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.string(message.tipper)
      }

      static decode(reader: Reader, length: i32): Tip {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Tip()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.amount.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            case 2:
              message.tipper = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      amount: Array<cosmos.v1.Coin>
      tipper: string

      constructor(amount: Array<cosmos.v1.Coin> = [], tipper: string = '') {
        this.amount = amount
        this.tipper = tipper
      }
    }

    export class Coin {
      static encode(message: Coin, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.denom)

        writer.uint32(18)
        writer.string(message.amount)
      }

      static decode(reader: Reader, length: i32): Coin {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Coin()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.denom = reader.string()
              break

            case 2:
              message.amount = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      denom: string
      amount: string

      constructor(denom: string = '', amount: string = '') {
        this.denom = denom
        this.amount = amount
      }
    }

    export class Any {
      static encode(message: Any, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.type_url)

        writer.uint32(18)
        writer.bytes(message.value)
      }

      static decode(reader: Reader, length: i32): Any {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Any()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.type_url = reader.string()
              break

            case 2:
              message.value = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      type_url: string
      value: Uint8Array

      constructor(type_url: string = '', value: Uint8Array = new Uint8Array(0)) {
        this.type_url = type_url
        this.value = value
      }
    }

    export class PubKey {
      static encode(message: PubKey, writer: Writer): void {
        writer.uint32(10)
        writer.bytes(message.key)
      }

      static decode(reader: Reader, length: i32): PubKey {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new PubKey()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.key = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      key: Uint8Array

      constructor(key: Uint8Array = new Uint8Array(0)) {
        this.key = key
      }
    }

    export class MsgSend {
      static encode(message: MsgSend, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.from_address)

        writer.uint32(18)
        writer.string(message.to_address)

        const amount = message.amount
        for (let i = 0; i < amount.length; ++i) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(amount[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgSend {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSend()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.from_address = reader.string()
              break

            case 2:
              message.to_address = reader.string()
              break

            case 3:
              message.amount.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      from_address: string
      to_address: string
      amount: Array<cosmos.v1.Coin>

      constructor(
        from_address: string = '',
        to_address: string = '',
        amount: Array<cosmos.v1.Coin> = [],
      ) {
        this.from_address = from_address
        this.to_address = to_address
        this.amount = amount
      }
    }

    export class MsgMultiSend {
      static encode(message: MsgMultiSend, writer: Writer): void {
        const inputs = message.inputs
        for (let i = 0; i < inputs.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Input.encode(inputs[i], writer)
          writer.ldelim()
        }

        const outputs = message.outputs
        for (let i = 0; i < outputs.length; ++i) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Output.encode(outputs[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgMultiSend {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgMultiSend()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.inputs.push(cosmos.v1.Input.decode(reader, reader.uint32()))
              break

            case 2:
              message.outputs.push(cosmos.v1.Output.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      inputs: Array<cosmos.v1.Input>
      outputs: Array<cosmos.v1.Output>

      constructor(
        inputs: Array<cosmos.v1.Input> = [],
        outputs: Array<cosmos.v1.Output> = [],
      ) {
        this.inputs = inputs
        this.outputs = outputs
      }
    }

    export class MsgVerifyInvariant {
      static encode(message: MsgVerifyInvariant, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.sender)

        writer.uint32(18)
        writer.string(message.invariant_module_name)

        writer.uint32(26)
        writer.string(message.invariant_route)
      }

      static decode(reader: Reader, length: i32): MsgVerifyInvariant {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgVerifyInvariant()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.sender = reader.string()
              break

            case 2:
              message.invariant_module_name = reader.string()
              break

            case 3:
              message.invariant_route = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      sender: string
      invariant_module_name: string
      invariant_route: string

      constructor(
        sender: string = '',
        invariant_module_name: string = '',
        invariant_route: string = '',
      ) {
        this.sender = sender
        this.invariant_module_name = invariant_module_name
        this.invariant_route = invariant_route
      }
    }

    export class MsgSetWithdrawAddress {
      static encode(message: MsgSetWithdrawAddress, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.delegator_address)

        writer.uint32(18)
        writer.string(message.withdraw_address)
      }

      static decode(reader: Reader, length: i32): MsgSetWithdrawAddress {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSetWithdrawAddress()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.delegator_address = reader.string()
              break

            case 2:
              message.withdraw_address = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      delegator_address: string
      withdraw_address: string

      constructor(delegator_address: string = '', withdraw_address: string = '') {
        this.delegator_address = delegator_address
        this.withdraw_address = withdraw_address
      }
    }

    export class MsgWithdrawDelegatorReward {
      static encode(message: MsgWithdrawDelegatorReward, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.delegator_address)

        writer.uint32(18)
        writer.string(message.validator_address)
      }

      static decode(reader: Reader, length: i32): MsgWithdrawDelegatorReward {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgWithdrawDelegatorReward()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.delegator_address = reader.string()
              break

            case 2:
              message.validator_address = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      delegator_address: string
      validator_address: string

      constructor(delegator_address: string = '', validator_address: string = '') {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
      }
    }

    export class MsgWithdrawValidatorCommission {
      static encode(message: MsgWithdrawValidatorCommission, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.validator_address)
      }

      static decode(reader: Reader, length: i32): MsgWithdrawValidatorCommission {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgWithdrawValidatorCommission()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.validator_address = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      validator_address: string

      constructor(validator_address: string = '') {
        this.validator_address = validator_address
      }
    }

    export class MsgFundCommunityPool {
      static encode(message: MsgFundCommunityPool, writer: Writer): void {
        const amount = message.amount
        for (let i = 0; i < amount.length; ++i) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Coin.encode(amount[i], writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.string(message.depositor)
      }

      static decode(reader: Reader, length: i32): MsgFundCommunityPool {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgFundCommunityPool()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.amount.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            case 2:
              message.depositor = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      amount: Array<cosmos.v1.Coin>
      depositor: string

      constructor(amount: Array<cosmos.v1.Coin> = [], depositor: string = '') {
        this.amount = amount
        this.depositor = depositor
      }
    }

    export class MsgSubmitEvidence {
      static encode(message: MsgSubmitEvidence, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.submitter)

        const evidence = message.evidence
        if (evidence !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(evidence, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgSubmitEvidence {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSubmitEvidence()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.submitter = reader.string()
              break

            case 2:
              message.evidence = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      submitter: string
      evidence: cosmos.v1.Any | null

      constructor(submitter: string = '', evidence: cosmos.v1.Any | null = null) {
        this.submitter = submitter
        this.evidence = evidence
      }
    }

    export class MsgSubmitProposal {
      static encode(message: MsgSubmitProposal, writer: Writer): void {
        const content = message.content
        if (content !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Any.encode(content, writer)
          writer.ldelim()
        }

        const initial_deposit = message.initial_deposit
        for (let i = 0; i < initial_deposit.length; ++i) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Coin.encode(initial_deposit[i], writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.proposer)
      }

      static decode(reader: Reader, length: i32): MsgSubmitProposal {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSubmitProposal()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.content = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 2:
              message.initial_deposit.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            case 3:
              message.proposer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      content: cosmos.v1.Any | null
      initial_deposit: Array<cosmos.v1.Coin>
      proposer: string

      constructor(
        content: cosmos.v1.Any | null = null,
        initial_deposit: Array<cosmos.v1.Coin> = [],
        proposer: string = '',
      ) {
        this.content = content
        this.initial_deposit = initial_deposit
        this.proposer = proposer
      }
    }

    export class MsgVote {
      static encode(message: MsgVote, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.proposal_id)

        writer.uint32(18)
        writer.string(message.voter)

        writer.uint32(24)
        writer.int32(message.option)
      }

      static decode(reader: Reader, length: i32): MsgVote {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgVote()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.proposal_id = reader.uint64()
              break

            case 2:
              message.voter = reader.string()
              break

            case 3:
              message.option = reader.int32()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      proposal_id: u64
      voter: string
      option: cosmos.v1.VoteOption

      constructor(
        proposal_id: u64 = 0,
        voter: string = '',
        option: cosmos.v1.VoteOption = 0,
      ) {
        this.proposal_id = proposal_id
        this.voter = voter
        this.option = option
      }
    }

    export class MsgDeposit {
      static encode(message: MsgDeposit, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.proposal_id)

        writer.uint32(18)
        writer.string(message.depositor)

        const amount = message.amount
        for (let i = 0; i < amount.length; ++i) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(amount[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgDeposit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgDeposit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.proposal_id = reader.uint64()
              break

            case 2:
              message.depositor = reader.string()
              break

            case 3:
              message.amount.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      proposal_id: u64
      depositor: string
      amount: Array<cosmos.v1.Coin>

      constructor(
        proposal_id: u64 = 0,
        depositor: string = '',
        amount: Array<cosmos.v1.Coin> = [],
      ) {
        this.proposal_id = proposal_id
        this.depositor = depositor
        this.amount = amount
      }
    }

    export class MsgUnjail {
      static encode(message: MsgUnjail, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.validator_addr)
      }

      static decode(reader: Reader, length: i32): MsgUnjail {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgUnjail()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.validator_addr = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      validator_addr: string

      constructor(validator_addr: string = '') {
        this.validator_addr = validator_addr
      }
    }

    export class MsgCreateValidator {
      static encode(message: MsgCreateValidator, writer: Writer): void {
        const description = message.description
        if (description !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Description.encode(description, writer)
          writer.ldelim()
        }

        const commission = message.commission
        if (commission !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.CommissionRates.encode(commission, writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.min_self_delegation)

        writer.uint32(34)
        writer.string(message.delegator_address)

        writer.uint32(42)
        writer.string(message.validator_address)

        const pubkey = message.pubkey
        if (pubkey !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Any.encode(pubkey, writer)
          writer.ldelim()
        }

        const value = message.value
        if (value !== null) {
          writer.uint32(58)
          writer.fork()
          cosmos.v1.Coin.encode(value, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgCreateValidator {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgCreateValidator()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.description = cosmos.v1.Description.decode(reader, reader.uint32())
              break

            case 2:
              message.commission = cosmos.v1.CommissionRates.decode(
                reader,
                reader.uint32(),
              )
              break

            case 3:
              message.min_self_delegation = reader.string()
              break

            case 4:
              message.delegator_address = reader.string()
              break

            case 5:
              message.validator_address = reader.string()
              break

            case 6:
              message.pubkey = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 7:
              message.value = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      description: cosmos.v1.Description | null
      commission: cosmos.v1.CommissionRates | null
      min_self_delegation: string
      delegator_address: string
      validator_address: string
      pubkey: cosmos.v1.Any | null
      value: cosmos.v1.Coin | null

      constructor(
        description: cosmos.v1.Description | null = null,
        commission: cosmos.v1.CommissionRates | null = null,
        min_self_delegation: string = '',
        delegator_address: string = '',
        validator_address: string = '',
        pubkey: cosmos.v1.Any | null = null,
        value: cosmos.v1.Coin | null = null,
      ) {
        this.description = description
        this.commission = commission
        this.min_self_delegation = min_self_delegation
        this.delegator_address = delegator_address
        this.validator_address = validator_address
        this.pubkey = pubkey
        this.value = value
      }
    }

    export class MsgEditValidator {
      static encode(message: MsgEditValidator, writer: Writer): void {
        const description = message.description
        if (description !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Description.encode(description, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.string(message.validator_address)

        writer.uint32(26)
        writer.string(message.commission_rate)

        writer.uint32(34)
        writer.string(message.min_self_delegation)
      }

      static decode(reader: Reader, length: i32): MsgEditValidator {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgEditValidator()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.description = cosmos.v1.Description.decode(reader, reader.uint32())
              break

            case 2:
              message.validator_address = reader.string()
              break

            case 3:
              message.commission_rate = reader.string()
              break

            case 4:
              message.min_self_delegation = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      description: cosmos.v1.Description | null
      validator_address: string
      commission_rate: string
      min_self_delegation: string

      constructor(
        description: cosmos.v1.Description | null = null,
        validator_address: string = '',
        commission_rate: string = '',
        min_self_delegation: string = '',
      ) {
        this.description = description
        this.validator_address = validator_address
        this.commission_rate = commission_rate
        this.min_self_delegation = min_self_delegation
      }
    }

    export class MsgDelegate {
      static encode(message: MsgDelegate, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.delegator_address)

        writer.uint32(18)
        writer.string(message.validator_address)

        const amount = message.amount
        if (amount !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(amount, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgDelegate {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgDelegate()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.delegator_address = reader.string()
              break

            case 2:
              message.validator_address = reader.string()
              break

            case 3:
              message.amount = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      delegator_address: string
      validator_address: string
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string = '',
        validator_address: string = '',
        amount: cosmos.v1.Coin | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
        this.amount = amount
      }
    }

    export class MsgBeginRedelegate {
      static encode(message: MsgBeginRedelegate, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.delegator_address)

        writer.uint32(18)
        writer.string(message.validator_src_address)

        writer.uint32(26)
        writer.string(message.validator_dst_address)

        const amount = message.amount
        if (amount !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Coin.encode(amount, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgBeginRedelegate {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgBeginRedelegate()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.delegator_address = reader.string()
              break

            case 2:
              message.validator_src_address = reader.string()
              break

            case 3:
              message.validator_dst_address = reader.string()
              break

            case 4:
              message.amount = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      delegator_address: string
      validator_src_address: string
      validator_dst_address: string
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string = '',
        validator_src_address: string = '',
        validator_dst_address: string = '',
        amount: cosmos.v1.Coin | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_src_address = validator_src_address
        this.validator_dst_address = validator_dst_address
        this.amount = amount
      }
    }

    export class MsgUndelegate {
      static encode(message: MsgUndelegate, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.delegator_address)

        writer.uint32(18)
        writer.string(message.validator_address)

        const amount = message.amount
        if (amount !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(amount, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): MsgUndelegate {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgUndelegate()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.delegator_address = reader.string()
              break

            case 2:
              message.validator_address = reader.string()
              break

            case 3:
              message.amount = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      delegator_address: string
      validator_address: string
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string = '',
        validator_address: string = '',
        amount: cosmos.v1.Coin | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
        this.amount = amount
      }
    }

    export class MsgCreateVestingAccount {
      static encode(message: MsgCreateVestingAccount, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.from_address)

        writer.uint32(18)
        writer.string(message.to_address)

        const amount = message.amount
        if (amount !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(amount, writer)
          writer.ldelim()
        }

        writer.uint32(32)
        writer.int64(message.end_time)

        writer.uint32(40)
        writer.bool(message.delayed)
      }

      static decode(reader: Reader, length: i32): MsgCreateVestingAccount {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgCreateVestingAccount()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.from_address = reader.string()
              break

            case 2:
              message.to_address = reader.string()
              break

            case 3:
              message.amount = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            case 4:
              message.end_time = reader.int64()
              break

            case 5:
              message.delayed = reader.bool()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      from_address: string
      to_address: string
      amount: cosmos.v1.Coin | null
      end_time: i64
      delayed: bool

      constructor(
        from_address: string = '',
        to_address: string = '',
        amount: cosmos.v1.Coin | null = null,
        end_time: i64 = 0,
        delayed: bool = false,
      ) {
        this.from_address = from_address
        this.to_address = to_address
        this.amount = amount
        this.end_time = end_time
        this.delayed = delayed
      }
    }

    export class MsgTransfer {
      static encode(message: MsgTransfer, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.source_port)

        writer.uint32(18)
        writer.string(message.source_channel)

        const token = message.token
        if (token !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(token, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.string(message.sender)

        writer.uint32(42)
        writer.string(message.receiver)

        const timeout_height = message.timeout_height
        if (timeout_height !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Height.encode(timeout_height, writer)
          writer.ldelim()
        }

        writer.uint32(56)
        writer.uint64(message.timeout_timestamp)
      }

      static decode(reader: Reader, length: i32): MsgTransfer {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgTransfer()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.source_port = reader.string()
              break

            case 2:
              message.source_channel = reader.string()
              break

            case 3:
              message.token = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            case 4:
              message.sender = reader.string()
              break

            case 5:
              message.receiver = reader.string()
              break

            case 6:
              message.timeout_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 7:
              message.timeout_timestamp = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      source_port: string
      source_channel: string
      token: cosmos.v1.Coin | null
      sender: string
      receiver: string
      timeout_height: cosmos.v1.Height | null
      timeout_timestamp: u64

      constructor(
        source_port: string = '',
        source_channel: string = '',
        token: cosmos.v1.Coin | null = null,
        sender: string = '',
        receiver: string = '',
        timeout_height: cosmos.v1.Height | null = null,
        timeout_timestamp: u64 = 0,
      ) {
        this.source_port = source_port
        this.source_channel = source_channel
        this.token = token
        this.sender = sender
        this.receiver = receiver
        this.timeout_height = timeout_height
        this.timeout_timestamp = timeout_timestamp
      }
    }

    export class MsgChannelOpenInit {
      static encode(message: MsgChannelOpenInit, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        const channel = message.channel
        if (channel !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Channel.encode(channel, writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelOpenInit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelOpenInit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel = cosmos.v1.Channel.decode(reader, reader.uint32())
              break

            case 3:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel: cosmos.v1.Channel | null
      signer: string

      constructor(
        port_id: string = '',
        channel: cosmos.v1.Channel | null = null,
        signer: string = '',
      ) {
        this.port_id = port_id
        this.channel = channel
        this.signer = signer
      }
    }

    export class MsgChannelOpenTry {
      static encode(message: MsgChannelOpenTry, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.previous_channel_id)

        const channel = message.channel
        if (channel !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Channel.encode(channel, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.string(message.counterparty_version)

        writer.uint32(42)
        writer.bytes(message.proof_init)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(58)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelOpenTry {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelOpenTry()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.previous_channel_id = reader.string()
              break

            case 3:
              message.channel = cosmos.v1.Channel.decode(reader, reader.uint32())
              break

            case 4:
              message.counterparty_version = reader.string()
              break

            case 5:
              message.proof_init = reader.bytes()
              break

            case 6:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 7:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      previous_channel_id: string
      channel: cosmos.v1.Channel | null
      counterparty_version: string
      proof_init: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        port_id: string = '',
        previous_channel_id: string = '',
        channel: cosmos.v1.Channel | null = null,
        counterparty_version: string = '',
        proof_init: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.port_id = port_id
        this.previous_channel_id = previous_channel_id
        this.channel = channel
        this.counterparty_version = counterparty_version
        this.proof_init = proof_init
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgChannelOpenAck {
      static encode(message: MsgChannelOpenAck, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.channel_id)

        writer.uint32(26)
        writer.string(message.counterparty_channel_id)

        writer.uint32(34)
        writer.string(message.counterparty_version)

        writer.uint32(42)
        writer.bytes(message.proof_try)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(58)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelOpenAck {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelOpenAck()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel_id = reader.string()
              break

            case 3:
              message.counterparty_channel_id = reader.string()
              break

            case 4:
              message.counterparty_version = reader.string()
              break

            case 5:
              message.proof_try = reader.bytes()
              break

            case 6:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 7:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel_id: string
      counterparty_channel_id: string
      counterparty_version: string
      proof_try: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        port_id: string = '',
        channel_id: string = '',
        counterparty_channel_id: string = '',
        counterparty_version: string = '',
        proof_try: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.port_id = port_id
        this.channel_id = channel_id
        this.counterparty_channel_id = counterparty_channel_id
        this.counterparty_version = counterparty_version
        this.proof_try = proof_try
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgChannelOpenConfirm {
      static encode(message: MsgChannelOpenConfirm, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.channel_id)

        writer.uint32(26)
        writer.bytes(message.proof_ack)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(42)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelOpenConfirm {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelOpenConfirm()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel_id = reader.string()
              break

            case 3:
              message.proof_ack = reader.bytes()
              break

            case 4:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 5:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel_id: string
      proof_ack: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        port_id: string = '',
        channel_id: string = '',
        proof_ack: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.port_id = port_id
        this.channel_id = channel_id
        this.proof_ack = proof_ack
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgChannelCloseInit {
      static encode(message: MsgChannelCloseInit, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.channel_id)

        writer.uint32(26)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelCloseInit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelCloseInit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel_id = reader.string()
              break

            case 3:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel_id: string
      signer: string

      constructor(port_id: string = '', channel_id: string = '', signer: string = '') {
        this.port_id = port_id
        this.channel_id = channel_id
        this.signer = signer
      }
    }

    export class MsgChannelCloseConfirm {
      static encode(message: MsgChannelCloseConfirm, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.channel_id)

        writer.uint32(26)
        writer.bytes(message.proof_init)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(42)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgChannelCloseConfirm {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgChannelCloseConfirm()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel_id = reader.string()
              break

            case 3:
              message.proof_init = reader.bytes()
              break

            case 4:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 5:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel_id: string
      proof_init: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        port_id: string = '',
        channel_id: string = '',
        proof_init: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.port_id = port_id
        this.channel_id = channel_id
        this.proof_init = proof_init
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgRecvPacket {
      static encode(message: MsgRecvPacket, writer: Writer): void {
        const packet = message.packet
        if (packet !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Packet.encode(packet, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.bytes(message.proof_commitment)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgRecvPacket {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgRecvPacket()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.packet = cosmos.v1.Packet.decode(reader, reader.uint32())
              break

            case 2:
              message.proof_commitment = reader.bytes()
              break

            case 3:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 4:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      packet: cosmos.v1.Packet | null
      proof_commitment: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_commitment: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.packet = packet
        this.proof_commitment = proof_commitment
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgTimeout {
      static encode(message: MsgTimeout, writer: Writer): void {
        const packet = message.packet
        if (packet !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Packet.encode(packet, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.bytes(message.proof_unreceived)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(32)
        writer.uint64(message.next_sequence_recv)

        writer.uint32(42)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgTimeout {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgTimeout()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.packet = cosmos.v1.Packet.decode(reader, reader.uint32())
              break

            case 2:
              message.proof_unreceived = reader.bytes()
              break

            case 3:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 4:
              message.next_sequence_recv = reader.uint64()
              break

            case 5:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      packet: cosmos.v1.Packet | null
      proof_unreceived: Uint8Array
      proof_height: cosmos.v1.Height | null
      next_sequence_recv: u64
      signer: string

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_unreceived: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        next_sequence_recv: u64 = 0,
        signer: string = '',
      ) {
        this.packet = packet
        this.proof_unreceived = proof_unreceived
        this.proof_height = proof_height
        this.next_sequence_recv = next_sequence_recv
        this.signer = signer
      }
    }

    export class MsgTimeoutOnClose {
      static encode(message: MsgTimeoutOnClose, writer: Writer): void {
        const packet = message.packet
        if (packet !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Packet.encode(packet, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.bytes(message.proof_unreceived)

        writer.uint32(26)
        writer.bytes(message.proof_close)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(40)
        writer.uint64(message.next_sequence_recv)

        writer.uint32(50)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgTimeoutOnClose {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgTimeoutOnClose()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.packet = cosmos.v1.Packet.decode(reader, reader.uint32())
              break

            case 2:
              message.proof_unreceived = reader.bytes()
              break

            case 3:
              message.proof_close = reader.bytes()
              break

            case 4:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 5:
              message.next_sequence_recv = reader.uint64()
              break

            case 6:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      packet: cosmos.v1.Packet | null
      proof_unreceived: Uint8Array
      proof_close: Uint8Array
      proof_height: cosmos.v1.Height | null
      next_sequence_recv: u64
      signer: string

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_unreceived: Uint8Array = new Uint8Array(0),
        proof_close: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        next_sequence_recv: u64 = 0,
        signer: string = '',
      ) {
        this.packet = packet
        this.proof_unreceived = proof_unreceived
        this.proof_close = proof_close
        this.proof_height = proof_height
        this.next_sequence_recv = next_sequence_recv
        this.signer = signer
      }
    }

    export class MsgAcknowledgement {
      static encode(message: MsgAcknowledgement, writer: Writer): void {
        const packet = message.packet
        if (packet !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Packet.encode(packet, writer)
          writer.ldelim()
        }

        writer.uint32(18)
        writer.bytes(message.acknowledgement)

        writer.uint32(26)
        writer.bytes(message.proof_acked)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(42)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgAcknowledgement {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgAcknowledgement()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.packet = cosmos.v1.Packet.decode(reader, reader.uint32())
              break

            case 2:
              message.acknowledgement = reader.bytes()
              break

            case 3:
              message.proof_acked = reader.bytes()
              break

            case 4:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 5:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      packet: cosmos.v1.Packet | null
      acknowledgement: Uint8Array
      proof_acked: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        packet: cosmos.v1.Packet | null = null,
        acknowledgement: Uint8Array = new Uint8Array(0),
        proof_acked: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.packet = packet
        this.acknowledgement = acknowledgement
        this.proof_acked = proof_acked
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class MsgCreateClient {
      static encode(message: MsgCreateClient, writer: Writer): void {
        const client_state = message.client_state
        if (client_state !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.Any.encode(client_state, writer)
          writer.ldelim()
        }

        const consensus_state = message.consensus_state
        if (consensus_state !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(consensus_state, writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgCreateClient {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgCreateClient()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 2:
              message.consensus_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 3:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_state: cosmos.v1.Any | null
      consensus_state: cosmos.v1.Any | null
      signer: string

      constructor(
        client_state: cosmos.v1.Any | null = null,
        consensus_state: cosmos.v1.Any | null = null,
        signer: string = '',
      ) {
        this.client_state = client_state
        this.consensus_state = consensus_state
        this.signer = signer
      }
    }

    export class MsgUpdateClient {
      static encode(message: MsgUpdateClient, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        const header = message.header
        if (header !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(header, writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgUpdateClient {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgUpdateClient()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.header = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 3:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      header: cosmos.v1.Any | null
      signer: string

      constructor(
        client_id: string = '',
        header: cosmos.v1.Any | null = null,
        signer: string = '',
      ) {
        this.client_id = client_id
        this.header = header
        this.signer = signer
      }
    }

    export class MsgUpgradeClient {
      static encode(message: MsgUpgradeClient, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        const client_state = message.client_state
        if (client_state !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(client_state, writer)
          writer.ldelim()
        }

        const consensus_state = message.consensus_state
        if (consensus_state !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Any.encode(consensus_state, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.bytes(message.proof_upgrade_client)

        writer.uint32(42)
        writer.bytes(message.proof_upgrade_consensus_state)

        writer.uint32(50)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgUpgradeClient {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgUpgradeClient()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.client_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 3:
              message.consensus_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 4:
              message.proof_upgrade_client = reader.bytes()
              break

            case 5:
              message.proof_upgrade_consensus_state = reader.bytes()
              break

            case 6:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      client_state: cosmos.v1.Any | null
      consensus_state: cosmos.v1.Any | null
      proof_upgrade_client: Uint8Array
      proof_upgrade_consensus_state: Uint8Array
      signer: string

      constructor(
        client_id: string = '',
        client_state: cosmos.v1.Any | null = null,
        consensus_state: cosmos.v1.Any | null = null,
        proof_upgrade_client: Uint8Array = new Uint8Array(0),
        proof_upgrade_consensus_state: Uint8Array = new Uint8Array(0),
        signer: string = '',
      ) {
        this.client_id = client_id
        this.client_state = client_state
        this.consensus_state = consensus_state
        this.proof_upgrade_client = proof_upgrade_client
        this.proof_upgrade_consensus_state = proof_upgrade_consensus_state
        this.signer = signer
      }
    }

    export class MsgSubmitMisbehaviour {
      static encode(message: MsgSubmitMisbehaviour, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        const misbehaviour = message.misbehaviour
        if (misbehaviour !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(misbehaviour, writer)
          writer.ldelim()
        }

        writer.uint32(26)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgSubmitMisbehaviour {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSubmitMisbehaviour()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.misbehaviour = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 3:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      misbehaviour: cosmos.v1.Any | null
      signer: string

      constructor(
        client_id: string = '',
        misbehaviour: cosmos.v1.Any | null = null,
        signer: string = '',
      ) {
        this.client_id = client_id
        this.misbehaviour = misbehaviour
        this.signer = signer
      }
    }

    export class MsgConnectionOpenInit {
      static encode(message: MsgConnectionOpenInit, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        const counterparty = message.counterparty
        if (counterparty !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.ConnectionCounterparty.encode(counterparty, writer)
          writer.ldelim()
        }

        const version = message.version
        if (version !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.ConnectionVersion.encode(version, writer)
          writer.ldelim()
        }

        writer.uint32(32)
        writer.uint64(message.delay_period)

        writer.uint32(42)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgConnectionOpenInit {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgConnectionOpenInit()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.counterparty = cosmos.v1.ConnectionCounterparty.decode(
                reader,
                reader.uint32(),
              )
              break

            case 3:
              message.version = cosmos.v1.ConnectionVersion.decode(
                reader,
                reader.uint32(),
              )
              break

            case 4:
              message.delay_period = reader.uint64()
              break

            case 5:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      counterparty: cosmos.v1.ConnectionCounterparty | null
      version: cosmos.v1.ConnectionVersion | null
      delay_period: u64
      signer: string

      constructor(
        client_id: string = '',
        counterparty: cosmos.v1.ConnectionCounterparty | null = null,
        version: cosmos.v1.ConnectionVersion | null = null,
        delay_period: u64 = 0,
        signer: string = '',
      ) {
        this.client_id = client_id
        this.counterparty = counterparty
        this.version = version
        this.delay_period = delay_period
        this.signer = signer
      }
    }

    export class MsgConnectionOpenTry {
      static encode(message: MsgConnectionOpenTry, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        writer.uint32(18)
        writer.string(message.previous_connection_id)

        const client_state = message.client_state
        if (client_state !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Any.encode(client_state, writer)
          writer.ldelim()
        }

        const counterparty = message.counterparty
        if (counterparty !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.ConnectionCounterparty.encode(counterparty, writer)
          writer.ldelim()
        }

        writer.uint32(40)
        writer.uint64(message.delay_period)

        const counterparty_versions = message.counterparty_versions
        for (let i = 0; i < counterparty_versions.length; ++i) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.ConnectionVersion.encode(counterparty_versions[i], writer)
          writer.ldelim()
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(58)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(66)
        writer.bytes(message.proof_init)

        writer.uint32(74)
        writer.bytes(message.proof_client)

        writer.uint32(82)
        writer.bytes(message.proof_consensus)

        const consensus_height = message.consensus_height
        if (consensus_height !== null) {
          writer.uint32(90)
          writer.fork()
          cosmos.v1.Height.encode(consensus_height, writer)
          writer.ldelim()
        }

        writer.uint32(98)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgConnectionOpenTry {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgConnectionOpenTry()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.previous_connection_id = reader.string()
              break

            case 3:
              message.client_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 4:
              message.counterparty = cosmos.v1.ConnectionCounterparty.decode(
                reader,
                reader.uint32(),
              )
              break

            case 5:
              message.delay_period = reader.uint64()
              break

            case 6:
              message.counterparty_versions.push(
                cosmos.v1.ConnectionVersion.decode(reader, reader.uint32()),
              )
              break

            case 7:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 8:
              message.proof_init = reader.bytes()
              break

            case 9:
              message.proof_client = reader.bytes()
              break

            case 10:
              message.proof_consensus = reader.bytes()
              break

            case 11:
              message.consensus_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 12:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      previous_connection_id: string
      client_state: cosmos.v1.Any | null
      counterparty: cosmos.v1.ConnectionCounterparty | null
      delay_period: u64
      counterparty_versions: Array<cosmos.v1.ConnectionVersion>
      proof_height: cosmos.v1.Height | null
      proof_init: Uint8Array
      proof_client: Uint8Array
      proof_consensus: Uint8Array
      consensus_height: cosmos.v1.Height | null
      signer: string

      constructor(
        client_id: string = '',
        previous_connection_id: string = '',
        client_state: cosmos.v1.Any | null = null,
        counterparty: cosmos.v1.ConnectionCounterparty | null = null,
        delay_period: u64 = 0,
        counterparty_versions: Array<cosmos.v1.ConnectionVersion> = [],
        proof_height: cosmos.v1.Height | null = null,
        proof_init: Uint8Array = new Uint8Array(0),
        proof_client: Uint8Array = new Uint8Array(0),
        proof_consensus: Uint8Array = new Uint8Array(0),
        consensus_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.client_id = client_id
        this.previous_connection_id = previous_connection_id
        this.client_state = client_state
        this.counterparty = counterparty
        this.delay_period = delay_period
        this.counterparty_versions = counterparty_versions
        this.proof_height = proof_height
        this.proof_init = proof_init
        this.proof_client = proof_client
        this.proof_consensus = proof_consensus
        this.consensus_height = consensus_height
        this.signer = signer
      }
    }

    export class MsgConnectionOpenAck {
      static encode(message: MsgConnectionOpenAck, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.connection_id)

        writer.uint32(18)
        writer.string(message.counterparty_connection_id)

        const version = message.version
        if (version !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.ConnectionVersion.encode(version, writer)
          writer.ldelim()
        }

        const client_state = message.client_state
        if (client_state !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Any.encode(client_state, writer)
          writer.ldelim()
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(42)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(50)
        writer.bytes(message.proof_try)

        writer.uint32(58)
        writer.bytes(message.proof_client)

        writer.uint32(66)
        writer.bytes(message.proof_consensus)

        const consensus_height = message.consensus_height
        if (consensus_height !== null) {
          writer.uint32(74)
          writer.fork()
          cosmos.v1.Height.encode(consensus_height, writer)
          writer.ldelim()
        }

        writer.uint32(82)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgConnectionOpenAck {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgConnectionOpenAck()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.connection_id = reader.string()
              break

            case 2:
              message.counterparty_connection_id = reader.string()
              break

            case 3:
              message.version = cosmos.v1.ConnectionVersion.decode(
                reader,
                reader.uint32(),
              )
              break

            case 4:
              message.client_state = cosmos.v1.Any.decode(reader, reader.uint32())
              break

            case 5:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 6:
              message.proof_try = reader.bytes()
              break

            case 7:
              message.proof_client = reader.bytes()
              break

            case 8:
              message.proof_consensus = reader.bytes()
              break

            case 9:
              message.consensus_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 10:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      connection_id: string
      counterparty_connection_id: string
      version: cosmos.v1.ConnectionVersion | null
      client_state: cosmos.v1.Any | null
      proof_height: cosmos.v1.Height | null
      proof_try: Uint8Array
      proof_client: Uint8Array
      proof_consensus: Uint8Array
      consensus_height: cosmos.v1.Height | null
      signer: string

      constructor(
        connection_id: string = '',
        counterparty_connection_id: string = '',
        version: cosmos.v1.ConnectionVersion | null = null,
        client_state: cosmos.v1.Any | null = null,
        proof_height: cosmos.v1.Height | null = null,
        proof_try: Uint8Array = new Uint8Array(0),
        proof_client: Uint8Array = new Uint8Array(0),
        proof_consensus: Uint8Array = new Uint8Array(0),
        consensus_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.connection_id = connection_id
        this.counterparty_connection_id = counterparty_connection_id
        this.version = version
        this.client_state = client_state
        this.proof_height = proof_height
        this.proof_try = proof_try
        this.proof_client = proof_client
        this.proof_consensus = proof_consensus
        this.consensus_height = consensus_height
        this.signer = signer
      }
    }

    export class MsgConnectionOpenConfirm {
      static encode(message: MsgConnectionOpenConfirm, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.connection_id)

        writer.uint32(18)
        writer.bytes(message.proof_ack)

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(34)
        writer.string(message.signer)
      }

      static decode(reader: Reader, length: i32): MsgConnectionOpenConfirm {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgConnectionOpenConfirm()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.connection_id = reader.string()
              break

            case 2:
              message.proof_ack = reader.bytes()
              break

            case 3:
              message.proof_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 4:
              message.signer = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      connection_id: string
      proof_ack: Uint8Array
      proof_height: cosmos.v1.Height | null
      signer: string

      constructor(
        connection_id: string = '',
        proof_ack: Uint8Array = new Uint8Array(0),
        proof_height: cosmos.v1.Height | null = null,
        signer: string = '',
      ) {
        this.connection_id = connection_id
        this.proof_ack = proof_ack
        this.proof_height = proof_height
        this.signer = signer
      }
    }

    export class Channel {
      static encode(message: Channel, writer: Writer): void {
        writer.uint32(8)
        writer.int32(message.state)

        writer.uint32(16)
        writer.int32(message.ordering)

        const counterparty = message.counterparty
        if (counterparty !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.ChannelCounterparty.encode(counterparty, writer)
          writer.ldelim()
        }

        const connection_hops = message.connection_hops
        if (connection_hops.length !== 0) {
          for (let i = 0; i < connection_hops.length; ++i) {
            writer.uint32(34)
            writer.string(connection_hops[i])
          }
        }

        writer.uint32(42)
        writer.string(message.version)
      }

      static decode(reader: Reader, length: i32): Channel {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Channel()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.state = reader.int32()
              break

            case 2:
              message.ordering = reader.int32()
              break

            case 3:
              message.counterparty = cosmos.v1.ChannelCounterparty.decode(
                reader,
                reader.uint32(),
              )
              break

            case 4:
              message.connection_hops.push(reader.string())
              break

            case 5:
              message.version = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      state: cosmos.v1.State
      ordering: cosmos.v1.Order
      counterparty: cosmos.v1.ChannelCounterparty | null
      connection_hops: Array<string>
      version: string

      constructor(
        state: cosmos.v1.State = 0,
        ordering: cosmos.v1.Order = 0,
        counterparty: cosmos.v1.ChannelCounterparty | null = null,
        connection_hops: Array<string> = [],
        version: string = '',
      ) {
        this.state = state
        this.ordering = ordering
        this.counterparty = counterparty
        this.connection_hops = connection_hops
        this.version = version
      }
    }

    export class ChannelCounterparty {
      static encode(message: ChannelCounterparty, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.port_id)

        writer.uint32(18)
        writer.string(message.channel_id)
      }

      static decode(reader: Reader, length: i32): ChannelCounterparty {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ChannelCounterparty()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.port_id = reader.string()
              break

            case 2:
              message.channel_id = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      port_id: string
      channel_id: string

      constructor(port_id: string = '', channel_id: string = '') {
        this.port_id = port_id
        this.channel_id = channel_id
      }
    }

    export class CommissionRates {
      static encode(message: CommissionRates, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.rate)

        writer.uint32(18)
        writer.string(message.max_rate)

        writer.uint32(26)
        writer.string(message.max_change_rate)
      }

      static decode(reader: Reader, length: i32): CommissionRates {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new CommissionRates()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.rate = reader.string()
              break

            case 2:
              message.max_rate = reader.string()
              break

            case 3:
              message.max_change_rate = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      rate: string
      max_rate: string
      max_change_rate: string

      constructor(
        rate: string = '',
        max_rate: string = '',
        max_change_rate: string = '',
      ) {
        this.rate = rate
        this.max_rate = max_rate
        this.max_change_rate = max_change_rate
      }
    }

    export class ConnectionCounterparty {
      static encode(message: ConnectionCounterparty, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.client_id)

        writer.uint32(18)
        writer.string(message.connection_id)

        const prefix = message.prefix
        if (prefix !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.MerklePrefix.encode(prefix, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): ConnectionCounterparty {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ConnectionCounterparty()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.client_id = reader.string()
              break

            case 2:
              message.connection_id = reader.string()
              break

            case 3:
              message.prefix = cosmos.v1.MerklePrefix.decode(reader, reader.uint32())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      client_id: string
      connection_id: string
      prefix: cosmos.v1.MerklePrefix | null

      constructor(
        client_id: string = '',
        connection_id: string = '',
        prefix: cosmos.v1.MerklePrefix | null = null,
      ) {
        this.client_id = client_id
        this.connection_id = connection_id
        this.prefix = prefix
      }
    }

    export class ConnectionVersion {
      static encode(message: ConnectionVersion, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.identifier)

        const features = message.features
        if (features.length !== 0) {
          for (let i = 0; i < features.length; ++i) {
            writer.uint32(18)
            writer.string(features[i])
          }
        }
      }

      static decode(reader: Reader, length: i32): ConnectionVersion {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new ConnectionVersion()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.identifier = reader.string()
              break

            case 2:
              message.features.push(reader.string())
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      identifier: string
      features: Array<string>

      constructor(identifier: string = '', features: Array<string> = []) {
        this.identifier = identifier
        this.features = features
      }
    }

    export class Description {
      static encode(message: Description, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.moniker)

        writer.uint32(18)
        writer.string(message.identity)

        writer.uint32(26)
        writer.string(message.website)

        writer.uint32(34)
        writer.string(message.security_contact)

        writer.uint32(42)
        writer.string(message.details)
      }

      static decode(reader: Reader, length: i32): Description {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Description()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.moniker = reader.string()
              break

            case 2:
              message.identity = reader.string()
              break

            case 3:
              message.website = reader.string()
              break

            case 4:
              message.security_contact = reader.string()
              break

            case 5:
              message.details = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      moniker: string
      identity: string
      website: string
      security_contact: string
      details: string

      constructor(
        moniker: string = '',
        identity: string = '',
        website: string = '',
        security_contact: string = '',
        details: string = '',
      ) {
        this.moniker = moniker
        this.identity = identity
        this.website = website
        this.security_contact = security_contact
        this.details = details
      }
    }

    @unmanaged
    export class Height {
      static encode(message: Height, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.revision_number)

        writer.uint32(16)
        writer.uint64(message.revision_height)
      }

      static decode(reader: Reader, length: i32): Height {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Height()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.revision_number = reader.uint64()
              break

            case 2:
              message.revision_height = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      revision_number: u64
      revision_height: u64

      constructor(revision_number: u64 = 0, revision_height: u64 = 0) {
        this.revision_number = revision_number
        this.revision_height = revision_height
      }
    }

    export class Input {
      static encode(message: Input, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.address)

        const coins = message.coins
        for (let i = 0; i < coins.length; ++i) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Coin.encode(coins[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): Input {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Input()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.address = reader.string()
              break

            case 2:
              message.coins.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      address: string
      coins: Array<cosmos.v1.Coin>

      constructor(address: string = '', coins: Array<cosmos.v1.Coin> = []) {
        this.address = address
        this.coins = coins
      }
    }

    export class Output {
      static encode(message: Output, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.address)

        const coins = message.coins
        for (let i = 0; i < coins.length; ++i) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Coin.encode(coins[i], writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): Output {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Output()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.address = reader.string()
              break

            case 2:
              message.coins.push(cosmos.v1.Coin.decode(reader, reader.uint32()))
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      address: string
      coins: Array<cosmos.v1.Coin>

      constructor(address: string = '', coins: Array<cosmos.v1.Coin> = []) {
        this.address = address
        this.coins = coins
      }
    }

    export class MerklePrefix {
      static encode(message: MerklePrefix, writer: Writer): void {
        writer.uint32(10)
        writer.bytes(message.key_prefix)
      }

      static decode(reader: Reader, length: i32): MerklePrefix {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MerklePrefix()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.key_prefix = reader.bytes()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      key_prefix: Uint8Array

      constructor(key_prefix: Uint8Array = new Uint8Array(0)) {
        this.key_prefix = key_prefix
      }
    }

    export class Packet {
      static encode(message: Packet, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.sequence)

        writer.uint32(18)
        writer.string(message.source_port)

        writer.uint32(26)
        writer.string(message.source_channel)

        writer.uint32(34)
        writer.string(message.destination_port)

        writer.uint32(42)
        writer.string(message.destination_channel)

        writer.uint32(50)
        writer.bytes(message.data)

        const timeout_height = message.timeout_height
        if (timeout_height !== null) {
          writer.uint32(58)
          writer.fork()
          cosmos.v1.Height.encode(timeout_height, writer)
          writer.ldelim()
        }

        writer.uint32(64)
        writer.uint64(message.timeout_timestamp)
      }

      static decode(reader: Reader, length: i32): Packet {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new Packet()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.sequence = reader.uint64()
              break

            case 2:
              message.source_port = reader.string()
              break

            case 3:
              message.source_channel = reader.string()
              break

            case 4:
              message.destination_port = reader.string()
              break

            case 5:
              message.destination_channel = reader.string()
              break

            case 6:
              message.data = reader.bytes()
              break

            case 7:
              message.timeout_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 8:
              message.timeout_timestamp = reader.uint64()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      sequence: u64
      source_port: string
      source_channel: string
      destination_port: string
      destination_channel: string
      data: Uint8Array
      timeout_height: cosmos.v1.Height | null
      timeout_timestamp: u64

      constructor(
        sequence: u64 = 0,
        source_port: string = '',
        source_channel: string = '',
        destination_port: string = '',
        destination_channel: string = '',
        data: Uint8Array = new Uint8Array(0),
        timeout_height: cosmos.v1.Height | null = null,
        timeout_timestamp: u64 = 0,
      ) {
        this.sequence = sequence
        this.source_port = source_port
        this.source_channel = source_channel
        this.destination_port = destination_port
        this.destination_channel = destination_channel
        this.data = data
        this.timeout_height = timeout_height
        this.timeout_timestamp = timeout_timestamp
      }
    }

    export class CosmosHeader {
      static encode(message: CosmosHeader, writer: Writer): void {
        const signed_header = message.signed_header
        if (signed_header !== null) {
          writer.uint32(10)
          writer.fork()
          cosmos.v1.SignedHeader.encode(signed_header, writer)
          writer.ldelim()
        }

        const validator_set = message.validator_set
        if (validator_set !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.ValidatorSet.encode(validator_set, writer)
          writer.ldelim()
        }

        const trusted_height = message.trusted_height
        if (trusted_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(trusted_height, writer)
          writer.ldelim()
        }

        const trusted_validators = message.trusted_validators
        if (trusted_validators !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.ValidatorSet.encode(trusted_validators, writer)
          writer.ldelim()
        }
      }

      static decode(reader: Reader, length: i32): CosmosHeader {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new CosmosHeader()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.signed_header = cosmos.v1.SignedHeader.decode(
                reader,
                reader.uint32(),
              )
              break

            case 2:
              message.validator_set = cosmos.v1.ValidatorSet.decode(
                reader,
                reader.uint32(),
              )
              break

            case 3:
              message.trusted_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 4:
              message.trusted_validators = cosmos.v1.ValidatorSet.decode(
                reader,
                reader.uint32(),
              )
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      signed_header: cosmos.v1.SignedHeader | null
      validator_set: cosmos.v1.ValidatorSet | null
      trusted_height: cosmos.v1.Height | null
      trusted_validators: cosmos.v1.ValidatorSet | null

      constructor(
        signed_header: cosmos.v1.SignedHeader | null = null,
        validator_set: cosmos.v1.ValidatorSet | null = null,
        trusted_height: cosmos.v1.Height | null = null,
        trusted_validators: cosmos.v1.ValidatorSet | null = null,
      ) {
        this.signed_header = signed_header
        this.validator_set = validator_set
        this.trusted_height = trusted_height
        this.trusted_validators = trusted_validators
      }
    }

    export class MsgSwapWithinBatch {
      static encode(message: MsgSwapWithinBatch, writer: Writer): void {
        writer.uint32(10)
        writer.string(message.swap_requester_address)

        writer.uint32(16)
        writer.uint64(message.pool_id)

        writer.uint32(24)
        writer.uint32(message.swap_type_id)

        const offer_coin = message.offer_coin
        if (offer_coin !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Coin.encode(offer_coin, writer)
          writer.ldelim()
        }

        writer.uint32(42)
        writer.string(message.demand_coin_denom)

        const offer_coin_fee = message.offer_coin_fee
        if (offer_coin_fee !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Coin.encode(offer_coin_fee, writer)
          writer.ldelim()
        }

        writer.uint32(58)
        writer.string(message.order_price)
      }

      static decode(reader: Reader, length: i32): MsgSwapWithinBatch {
        const end: usize = length < 0 ? reader.end : reader.ptr + length
        const message = new MsgSwapWithinBatch()

        while (reader.ptr < end) {
          const tag = reader.uint32()
          switch (tag >>> 3) {
            case 1:
              message.swap_requester_address = reader.string()
              break

            case 2:
              message.pool_id = reader.uint64()
              break

            case 3:
              message.swap_type_id = reader.uint32()
              break

            case 4:
              message.offer_coin = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            case 5:
              message.demand_coin_denom = reader.string()
              break

            case 6:
              message.offer_coin_fee = cosmos.v1.Coin.decode(reader, reader.uint32())
              break

            case 7:
              message.order_price = reader.string()
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      swap_requester_address: string
      pool_id: u64
      swap_type_id: u32
      offer_coin: cosmos.v1.Coin | null
      demand_coin_denom: string
      offer_coin_fee: cosmos.v1.Coin | null
      order_price: string

      constructor(
        swap_requester_address: string = '',
        pool_id: u64 = 0,
        swap_type_id: u32 = 0,
        offer_coin: cosmos.v1.Coin | null = null,
        demand_coin_denom: string = '',
        offer_coin_fee: cosmos.v1.Coin | null = null,
        order_price: string = '',
      ) {
        this.swap_requester_address = swap_requester_address
        this.pool_id = pool_id
        this.swap_type_id = swap_type_id
        this.offer_coin = offer_coin
        this.demand_coin_denom = demand_coin_denom
        this.offer_coin_fee = offer_coin_fee
        this.order_price = order_price
      }
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
      SIGN_MODE_DIRECT_AUX = 3,
      SIGN_MODE_LEGACY_AMINO_JSON = 127,
    }

    export enum State {
      STATE_UNINITIALIZED_UNSPECIFIED = 0,
      STATE_INIT = 1,
      STATE_TRYOPEN = 2,
      STATE_OPEN = 3,
      STATE_CLOSED = 4,
    }

    export enum Order {
      ORDER_NONE_UNSPECIFIED = 0,
      ORDER_UNORDERED = 1,
      ORDER_ORDERED = 2,
    }

    export enum VoteOption {
      VOTE_OPTION_UNSPECIFIED = 0,
      VOTE_OPTION_YES = 1,
      VOTE_OPTION_ABSTAIN = 2,
      VOTE_OPTION_NO = 3,
      VOTE_OPTION_NO_WITH_VETO = 4,
    }

    export function decodeBlockID(a: Uint8Array): BlockID {
      return Protobuf.decode<BlockID>(a, BlockID.decode)
    }

    export function decodeCommit(a: Uint8Array): Commit {
      return Protobuf.decode<Commit>(a, Commit.decode)
    }

    export function decodeCommitSig(a: Uint8Array): CommitSig {
      return Protobuf.decode<CommitSig>(a, CommitSig.decode)
    }

    export function decodeConsensus(a: Uint8Array): Consensus {
      return Protobuf.decode<Consensus>(a, Consensus.decode)
    }

    export function decodeHeader(a: Uint8Array): Header {
      return Protobuf.decode<Header>(a, Header.decode)
    }

    export function decodePublicKey(a: Uint8Array): PublicKey {
      return Protobuf.decode<PublicKey>(a, PublicKey.decode)
    }

    export function decodePartSetHeader(a: Uint8Array): PartSetHeader {
      return Protobuf.decode<PartSetHeader>(a, PartSetHeader.decode)
    }

    export function decodeSignedHeader(a: Uint8Array): SignedHeader {
      return Protobuf.decode<SignedHeader>(a, SignedHeader.decode)
    }

    export function decodeTimestamp(a: Uint8Array): Timestamp {
      return Protobuf.decode<Timestamp>(a, Timestamp.decode)
    }

    export function decodeValidator(a: Uint8Array): Validator {
      return Protobuf.decode<Validator>(a, Validator.decode)
    }

    export function decodeValidatorSet(a: Uint8Array): ValidatorSet {
      return Protobuf.decode<ValidatorSet>(a, ValidatorSet.decode)
    }

    export function decodeTx(a: Uint8Array): Tx {
      return Protobuf.decode<Tx>(a, Tx.decode)
    }

    export function decodeTxBody(a: Uint8Array): TxBody {
      return Protobuf.decode<TxBody>(a, TxBody.decode)
    }

    export function decodeAuthInfo(a: Uint8Array): AuthInfo {
      return Protobuf.decode<AuthInfo>(a, AuthInfo.decode)
    }

    export function decodeSignerInfo(a: Uint8Array): SignerInfo {
      return Protobuf.decode<SignerInfo>(a, SignerInfo.decode)
    }

    export function decodeModeInfo(a: Uint8Array): ModeInfo {
      return Protobuf.decode<ModeInfo>(a, ModeInfo.decode)
    }

    export function decodeSingle(a: Uint8Array): Single {
      return Protobuf.decode<Single>(a, Single.decode)
    }

    export function decodeMulti(a: Uint8Array): Multi {
      return Protobuf.decode<Multi>(a, Multi.decode)
    }

    export function decodeCompactBitArray(a: Uint8Array): CompactBitArray {
      return Protobuf.decode<CompactBitArray>(a, CompactBitArray.decode)
    }

    export function decodeFee(a: Uint8Array): Fee {
      return Protobuf.decode<Fee>(a, Fee.decode)
    }

    export function decodeTip(a: Uint8Array): Tip {
      return Protobuf.decode<Tip>(a, Tip.decode)
    }

    export function decodeCoin(a: Uint8Array): Coin {
      return Protobuf.decode<Coin>(a, Coin.decode)
    }

    export function decodeAny(a: Uint8Array): Any {
      return Protobuf.decode<Any>(a, Any.decode)
    }

    export function decodePubKey(a: Uint8Array): PubKey {
      return Protobuf.decode<PubKey>(a, PubKey.decode)
    }

    export function decodeMsgSend(a: Uint8Array): MsgSend {
      return Protobuf.decode<MsgSend>(a, MsgSend.decode)
    }

    export function decodeMsgMultiSend(a: Uint8Array): MsgMultiSend {
      return Protobuf.decode<MsgMultiSend>(a, MsgMultiSend.decode)
    }

    export function decodeMsgVerifyInvariant(a: Uint8Array): MsgVerifyInvariant {
      return Protobuf.decode<MsgVerifyInvariant>(a, MsgVerifyInvariant.decode)
    }

    export function decodeMsgSetWithdrawAddress(a: Uint8Array): MsgSetWithdrawAddress {
      return Protobuf.decode<MsgSetWithdrawAddress>(a, MsgSetWithdrawAddress.decode)
    }

    export function decodeMsgWithdrawDelegatorReward(
      a: Uint8Array,
    ): MsgWithdrawDelegatorReward {
      return Protobuf.decode<MsgWithdrawDelegatorReward>(
        a,
        MsgWithdrawDelegatorReward.decode,
      )
    }

    export function decodeMsgWithdrawValidatorCommission(
      a: Uint8Array,
    ): MsgWithdrawValidatorCommission {
      return Protobuf.decode<MsgWithdrawValidatorCommission>(
        a,
        MsgWithdrawValidatorCommission.decode,
      )
    }

    export function decodeMsgFundCommunityPool(a: Uint8Array): MsgFundCommunityPool {
      return Protobuf.decode<MsgFundCommunityPool>(a, MsgFundCommunityPool.decode)
    }

    export function decodeMsgSubmitEvidence(a: Uint8Array): MsgSubmitEvidence {
      return Protobuf.decode<MsgSubmitEvidence>(a, MsgSubmitEvidence.decode)
    }

    export function decodeMsgSubmitProposal(a: Uint8Array): MsgSubmitProposal {
      return Protobuf.decode<MsgSubmitProposal>(a, MsgSubmitProposal.decode)
    }

    export function decodeMsgVote(a: Uint8Array): MsgVote {
      return Protobuf.decode<MsgVote>(a, MsgVote.decode)
    }

    export function decodeMsgDeposit(a: Uint8Array): MsgDeposit {
      return Protobuf.decode<MsgDeposit>(a, MsgDeposit.decode)
    }

    export function decodeMsgUnjail(a: Uint8Array): MsgUnjail {
      return Protobuf.decode<MsgUnjail>(a, MsgUnjail.decode)
    }

    export function decodeMsgCreateValidator(a: Uint8Array): MsgCreateValidator {
      return Protobuf.decode<MsgCreateValidator>(a, MsgCreateValidator.decode)
    }

    export function decodeMsgEditValidator(a: Uint8Array): MsgEditValidator {
      return Protobuf.decode<MsgEditValidator>(a, MsgEditValidator.decode)
    }

    export function decodeMsgDelegate(a: Uint8Array): MsgDelegate {
      return Protobuf.decode<MsgDelegate>(a, MsgDelegate.decode)
    }

    export function decodeMsgBeginRedelegate(a: Uint8Array): MsgBeginRedelegate {
      return Protobuf.decode<MsgBeginRedelegate>(a, MsgBeginRedelegate.decode)
    }

    export function decodeMsgUndelegate(a: Uint8Array): MsgUndelegate {
      return Protobuf.decode<MsgUndelegate>(a, MsgUndelegate.decode)
    }

    export function decodeMsgCreateVestingAccount(
      a: Uint8Array,
    ): MsgCreateVestingAccount {
      return Protobuf.decode<MsgCreateVestingAccount>(a, MsgCreateVestingAccount.decode)
    }

    export function decodeMsgTransfer(a: Uint8Array): MsgTransfer {
      return Protobuf.decode<MsgTransfer>(a, MsgTransfer.decode)
    }

    export function decodeMsgChannelOpenInit(a: Uint8Array): MsgChannelOpenInit {
      return Protobuf.decode<MsgChannelOpenInit>(a, MsgChannelOpenInit.decode)
    }

    export function decodeMsgChannelOpenTry(a: Uint8Array): MsgChannelOpenTry {
      return Protobuf.decode<MsgChannelOpenTry>(a, MsgChannelOpenTry.decode)
    }

    export function decodeMsgChannelOpenAck(a: Uint8Array): MsgChannelOpenAck {
      return Protobuf.decode<MsgChannelOpenAck>(a, MsgChannelOpenAck.decode)
    }

    export function decodeMsgChannelOpenConfirm(a: Uint8Array): MsgChannelOpenConfirm {
      return Protobuf.decode<MsgChannelOpenConfirm>(a, MsgChannelOpenConfirm.decode)
    }

    export function decodeMsgChannelCloseInit(a: Uint8Array): MsgChannelCloseInit {
      return Protobuf.decode<MsgChannelCloseInit>(a, MsgChannelCloseInit.decode)
    }

    export function decodeMsgChannelCloseConfirm(a: Uint8Array): MsgChannelCloseConfirm {
      return Protobuf.decode<MsgChannelCloseConfirm>(a, MsgChannelCloseConfirm.decode)
    }

    export function decodeMsgRecvPacket(a: Uint8Array): MsgRecvPacket {
      return Protobuf.decode<MsgRecvPacket>(a, MsgRecvPacket.decode)
    }

    export function decodeMsgTimeout(a: Uint8Array): MsgTimeout {
      return Protobuf.decode<MsgTimeout>(a, MsgTimeout.decode)
    }

    export function decodeMsgTimeoutOnClose(a: Uint8Array): MsgTimeoutOnClose {
      return Protobuf.decode<MsgTimeoutOnClose>(a, MsgTimeoutOnClose.decode)
    }

    export function decodeMsgAcknowledgement(a: Uint8Array): MsgAcknowledgement {
      return Protobuf.decode<MsgAcknowledgement>(a, MsgAcknowledgement.decode)
    }

    export function decodeMsgCreateClient(a: Uint8Array): MsgCreateClient {
      return Protobuf.decode<MsgCreateClient>(a, MsgCreateClient.decode)
    }

    export function decodeMsgUpdateClient(a: Uint8Array): MsgUpdateClient {
      return Protobuf.decode<MsgUpdateClient>(a, MsgUpdateClient.decode)
    }

    export function decodeMsgUpgradeClient(a: Uint8Array): MsgUpgradeClient {
      return Protobuf.decode<MsgUpgradeClient>(a, MsgUpgradeClient.decode)
    }

    export function decodeMsgSubmitMisbehaviour(a: Uint8Array): MsgSubmitMisbehaviour {
      return Protobuf.decode<MsgSubmitMisbehaviour>(a, MsgSubmitMisbehaviour.decode)
    }

    export function decodeMsgConnectionOpenInit(a: Uint8Array): MsgConnectionOpenInit {
      return Protobuf.decode<MsgConnectionOpenInit>(a, MsgConnectionOpenInit.decode)
    }

    export function decodeMsgConnectionOpenTry(a: Uint8Array): MsgConnectionOpenTry {
      return Protobuf.decode<MsgConnectionOpenTry>(a, MsgConnectionOpenTry.decode)
    }

    export function decodeMsgConnectionOpenAck(a: Uint8Array): MsgConnectionOpenAck {
      return Protobuf.decode<MsgConnectionOpenAck>(a, MsgConnectionOpenAck.decode)
    }

    export function decodeMsgConnectionOpenConfirm(
      a: Uint8Array,
    ): MsgConnectionOpenConfirm {
      return Protobuf.decode<MsgConnectionOpenConfirm>(a, MsgConnectionOpenConfirm.decode)
    }

    export function decodeChannel(a: Uint8Array): Channel {
      return Protobuf.decode<Channel>(a, Channel.decode)
    }

    export function decodeChannelCounterparty(a: Uint8Array): ChannelCounterparty {
      return Protobuf.decode<ChannelCounterparty>(a, ChannelCounterparty.decode)
    }

    export function decodeCommissionRates(a: Uint8Array): CommissionRates {
      return Protobuf.decode<CommissionRates>(a, CommissionRates.decode)
    }

    export function decodeConnectionCounterparty(a: Uint8Array): ConnectionCounterparty {
      return Protobuf.decode<ConnectionCounterparty>(a, ConnectionCounterparty.decode)
    }

    export function decodeConnectionVersion(a: Uint8Array): ConnectionVersion {
      return Protobuf.decode<ConnectionVersion>(a, ConnectionVersion.decode)
    }

    export function decodeDescription(a: Uint8Array): Description {
      return Protobuf.decode<Description>(a, Description.decode)
    }

    export function decodeHeight(a: Uint8Array): Height {
      return Protobuf.decode<Height>(a, Height.decode)
    }

    export function decodeInput(a: Uint8Array): Input {
      return Protobuf.decode<Input>(a, Input.decode)
    }

    export function decodeOutput(a: Uint8Array): Output {
      return Protobuf.decode<Output>(a, Output.decode)
    }

    export function decodeMerklePrefix(a: Uint8Array): MerklePrefix {
      return Protobuf.decode<MerklePrefix>(a, MerklePrefix.decode)
    }

    export function decodePacket(a: Uint8Array): Packet {
      return Protobuf.decode<Packet>(a, Packet.decode)
    }

    export function decodeCosmosHeader(a: Uint8Array): CosmosHeader {
      return Protobuf.decode<CosmosHeader>(a, CosmosHeader.decode)
    }

    export function decodeMsgSwapWithinBatch(a: Uint8Array): MsgSwapWithinBatch {
      return Protobuf.decode<MsgSwapWithinBatch>(a, MsgSwapWithinBatch.decode)
    }
  }
}
