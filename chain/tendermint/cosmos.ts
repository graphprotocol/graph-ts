import { Writer, Reader, Protobuf } from 'as-proto'
import { t } from './t'

export namespace cosmos {
  export namespace v1 {
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
          writer.uint32(26)
          writer.fork()
          for (let i = 0; i < signatures.length; ++i) {
            writer.bytes(signatures[i])
          }
          writer.ldelim()
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
              if ((tag & 7) === 2 && tag !== 26) {
                const repeatedEnd: usize = reader.ptr + reader.uint32()
                while (reader.ptr < repeatedEnd) {
                  message.signatures.push(reader.bytes())
                }
              } else {
                message.signatures.push(reader.bytes())
              }
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

        const memo = message.memo
        if (memo !== null) {
          writer.uint32(18)
          writer.string(memo)
        }

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
      memo: string | null
      timeout_height: u64
      extension_options: Array<cosmos.v1.Any>
      non_critical_extension_options: Array<cosmos.v1.Any>

      constructor(
        messages: Array<cosmos.v1.Any> = [],
        memo: string | null = null,
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

        const elems = message.elems
        if (elems !== null) {
          writer.uint32(18)
          writer.bytes(elems)
        }
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
      elems: Uint8Array | null

      constructor(extra_bits_stored: u32 = 0, elems: Uint8Array | null = null) {
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

        const payer = message.payer
        if (payer !== null) {
          writer.uint32(26)
          writer.string(payer)
        }

        const granter = message.granter
        if (granter !== null) {
          writer.uint32(34)
          writer.string(granter)
        }
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
      payer: string | null
      granter: string | null

      constructor(
        amount: Array<cosmos.v1.Coin> = [],
        gas_limit: u64 = 0,
        payer: string | null = null,
        granter: string | null = null,
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

        const tipper = message.tipper
        if (tipper !== null) {
          writer.uint32(18)
          writer.string(tipper)
        }
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
      tipper: string | null

      constructor(amount: Array<cosmos.v1.Coin> = [], tipper: string | null = null) {
        this.amount = amount
        this.tipper = tipper
      }
    }

    export class Coin {
      static encode(message: Coin, writer: Writer): void {
        const denom = message.denom
        if (denom !== null) {
          writer.uint32(10)
          writer.string(denom)
        }

        const amount = message.amount
        if (amount !== null) {
          writer.uint32(18)
          writer.string(amount)
        }
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

      denom: string | null
      amount: string | null

      constructor(denom: string | null = null, amount: string | null = null) {
        this.denom = denom
        this.amount = amount
      }
    }

    export class Any {
      static encode(message: Any, writer: Writer): void {
        const type_url = message.type_url
        if (type_url !== null) {
          writer.uint32(10)
          writer.string(type_url)
        }

        const value = message.value
        if (value !== null) {
          writer.uint32(18)
          writer.bytes(value)
        }
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

      type_url: string | null
      value: Uint8Array | null

      constructor(type_url: string | null = null, value: Uint8Array | null = null) {
        this.type_url = type_url
        this.value = value
      }
    }

    export class PubKey {
      static encode(message: PubKey, writer: Writer): void {
        const key = message.key
        if (key !== null) {
          writer.uint32(10)
          writer.bytes(key)
        }
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

      key: Uint8Array | null

      constructor(key: Uint8Array | null = null) {
        this.key = key
      }
    }

    export class MsgSend {
      static encode(message: MsgSend, writer: Writer): void {
        const from_address = message.from_address
        if (from_address !== null) {
          writer.uint32(10)
          writer.string(from_address)
        }

        const to_address = message.to_address
        if (to_address !== null) {
          writer.uint32(18)
          writer.string(to_address)
        }

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

      from_address: string | null
      to_address: string | null
      amount: Array<cosmos.v1.Coin>

      constructor(
        from_address: string | null = null,
        to_address: string | null = null,
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
        const sender = message.sender
        if (sender !== null) {
          writer.uint32(10)
          writer.string(sender)
        }

        const invariant_module_name = message.invariant_module_name
        if (invariant_module_name !== null) {
          writer.uint32(18)
          writer.string(invariant_module_name)
        }

        const invariant_route = message.invariant_route
        if (invariant_route !== null) {
          writer.uint32(26)
          writer.string(invariant_route)
        }
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

      sender: string | null
      invariant_module_name: string | null
      invariant_route: string | null

      constructor(
        sender: string | null = null,
        invariant_module_name: string | null = null,
        invariant_route: string | null = null,
      ) {
        this.sender = sender
        this.invariant_module_name = invariant_module_name
        this.invariant_route = invariant_route
      }
    }

    export class MsgSetWithdrawAddress {
      static encode(message: MsgSetWithdrawAddress, writer: Writer): void {
        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(10)
          writer.string(delegator_address)
        }

        const withdraw_address = message.withdraw_address
        if (withdraw_address !== null) {
          writer.uint32(18)
          writer.string(withdraw_address)
        }
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

      delegator_address: string | null
      withdraw_address: string | null

      constructor(
        delegator_address: string | null = null,
        withdraw_address: string | null = null,
      ) {
        this.delegator_address = delegator_address
        this.withdraw_address = withdraw_address
      }
    }

    export class MsgWithdrawDelegatorReward {
      static encode(message: MsgWithdrawDelegatorReward, writer: Writer): void {
        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(10)
          writer.string(delegator_address)
        }

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(18)
          writer.string(validator_address)
        }
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

      delegator_address: string | null
      validator_address: string | null

      constructor(
        delegator_address: string | null = null,
        validator_address: string | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
      }
    }

    export class MsgWithdrawValidatorCommission {
      static encode(message: MsgWithdrawValidatorCommission, writer: Writer): void {
        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(10)
          writer.string(validator_address)
        }
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

      validator_address: string | null

      constructor(validator_address: string | null = null) {
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

        const depositor = message.depositor
        if (depositor !== null) {
          writer.uint32(18)
          writer.string(depositor)
        }
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
      depositor: string | null

      constructor(amount: Array<cosmos.v1.Coin> = [], depositor: string | null = null) {
        this.amount = amount
        this.depositor = depositor
      }
    }

    export class MsgSubmitEvidence {
      static encode(message: MsgSubmitEvidence, writer: Writer): void {
        const submitter = message.submitter
        if (submitter !== null) {
          writer.uint32(10)
          writer.string(submitter)
        }

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

      submitter: string | null
      evidence: cosmos.v1.Any | null

      constructor(
        submitter: string | null = null,
        evidence: cosmos.v1.Any | null = null,
      ) {
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

        const proposer = message.proposer
        if (proposer !== null) {
          writer.uint32(26)
          writer.string(proposer)
        }
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
      proposer: string | null

      constructor(
        content: cosmos.v1.Any | null = null,
        initial_deposit: Array<cosmos.v1.Coin> = [],
        proposer: string | null = null,
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

        const voter = message.voter
        if (voter !== null) {
          writer.uint32(18)
          writer.string(voter)
        }

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
      voter: string | null
      option: cosmos.v1.VoteOption

      constructor(
        proposal_id: u64 = 0,
        voter: string | null = null,
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

        const depositor = message.depositor
        if (depositor !== null) {
          writer.uint32(18)
          writer.string(depositor)
        }

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
      depositor: string | null
      amount: Array<cosmos.v1.Coin>

      constructor(
        proposal_id: u64 = 0,
        depositor: string | null = null,
        amount: Array<cosmos.v1.Coin> = [],
      ) {
        this.proposal_id = proposal_id
        this.depositor = depositor
        this.amount = amount
      }
    }

    export class MsgUnjail {
      static encode(message: MsgUnjail, writer: Writer): void {
        const validator_addr = message.validator_addr
        if (validator_addr !== null) {
          writer.uint32(10)
          writer.string(validator_addr)
        }
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

      validator_addr: string | null

      constructor(validator_addr: string | null = null) {
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

        const min_self_delegation = message.min_self_delegation
        if (min_self_delegation !== null) {
          writer.uint32(26)
          writer.string(min_self_delegation)
        }

        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(34)
          writer.string(delegator_address)
        }

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(42)
          writer.string(validator_address)
        }

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
      min_self_delegation: string | null
      delegator_address: string | null
      validator_address: string | null
      pubkey: cosmos.v1.Any | null
      value: cosmos.v1.Coin | null

      constructor(
        description: cosmos.v1.Description | null = null,
        commission: cosmos.v1.CommissionRates | null = null,
        min_self_delegation: string | null = null,
        delegator_address: string | null = null,
        validator_address: string | null = null,
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

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(18)
          writer.string(validator_address)
        }

        const commission_rate = message.commission_rate
        if (commission_rate !== null) {
          writer.uint32(26)
          writer.string(commission_rate)
        }

        const min_self_delegation = message.min_self_delegation
        if (min_self_delegation !== null) {
          writer.uint32(34)
          writer.string(min_self_delegation)
        }
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
      validator_address: string | null
      commission_rate: string | null
      min_self_delegation: string | null

      constructor(
        description: cosmos.v1.Description | null = null,
        validator_address: string | null = null,
        commission_rate: string | null = null,
        min_self_delegation: string | null = null,
      ) {
        this.description = description
        this.validator_address = validator_address
        this.commission_rate = commission_rate
        this.min_self_delegation = min_self_delegation
      }
    }

    export class MsgDelegate {
      static encode(message: MsgDelegate, writer: Writer): void {
        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(10)
          writer.string(delegator_address)
        }

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(18)
          writer.string(validator_address)
        }

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

      delegator_address: string | null
      validator_address: string | null
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string | null = null,
        validator_address: string | null = null,
        amount: cosmos.v1.Coin | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
        this.amount = amount
      }
    }

    export class MsgBeginRedelegate {
      static encode(message: MsgBeginRedelegate, writer: Writer): void {
        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(10)
          writer.string(delegator_address)
        }

        const validator_src_address = message.validator_src_address
        if (validator_src_address !== null) {
          writer.uint32(18)
          writer.string(validator_src_address)
        }

        const validator_dst_address = message.validator_dst_address
        if (validator_dst_address !== null) {
          writer.uint32(26)
          writer.string(validator_dst_address)
        }

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

      delegator_address: string | null
      validator_src_address: string | null
      validator_dst_address: string | null
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string | null = null,
        validator_src_address: string | null = null,
        validator_dst_address: string | null = null,
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
        const delegator_address = message.delegator_address
        if (delegator_address !== null) {
          writer.uint32(10)
          writer.string(delegator_address)
        }

        const validator_address = message.validator_address
        if (validator_address !== null) {
          writer.uint32(18)
          writer.string(validator_address)
        }

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

      delegator_address: string | null
      validator_address: string | null
      amount: cosmos.v1.Coin | null

      constructor(
        delegator_address: string | null = null,
        validator_address: string | null = null,
        amount: cosmos.v1.Coin | null = null,
      ) {
        this.delegator_address = delegator_address
        this.validator_address = validator_address
        this.amount = amount
      }
    }

    export class MsgCreateVestingAccount {
      static encode(message: MsgCreateVestingAccount, writer: Writer): void {
        const from_address = message.from_address
        if (from_address !== null) {
          writer.uint32(10)
          writer.string(from_address)
        }

        const to_address = message.to_address
        if (to_address !== null) {
          writer.uint32(18)
          writer.string(to_address)
        }

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

      from_address: string | null
      to_address: string | null
      amount: cosmos.v1.Coin | null
      end_time: i64
      delayed: bool

      constructor(
        from_address: string | null = null,
        to_address: string | null = null,
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
        const source_port = message.source_port
        if (source_port !== null) {
          writer.uint32(10)
          writer.string(source_port)
        }

        const source_channel = message.source_channel
        if (source_channel !== null) {
          writer.uint32(18)
          writer.string(source_channel)
        }

        const token = message.token
        if (token !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Coin.encode(token, writer)
          writer.ldelim()
        }

        const sender = message.sender
        if (sender !== null) {
          writer.uint32(34)
          writer.string(sender)
        }

        const receiver = message.receiver
        if (receiver !== null) {
          writer.uint32(42)
          writer.string(receiver)
        }

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

      source_port: string | null
      source_channel: string | null
      token: cosmos.v1.Coin | null
      sender: string | null
      receiver: string | null
      timeout_height: cosmos.v1.Height | null
      timeout_timestamp: u64

      constructor(
        source_port: string | null = null,
        source_channel: string | null = null,
        token: cosmos.v1.Coin | null = null,
        sender: string | null = null,
        receiver: string | null = null,
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
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel = message.channel
        if (channel !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Channel.encode(channel, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(26)
          writer.string(signer)
        }
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

      port_id: string | null
      channel: cosmos.v1.Channel | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        channel: cosmos.v1.Channel | null = null,
        signer: string | null = null,
      ) {
        this.port_id = port_id
        this.channel = channel
        this.signer = signer
      }
    }

    export class MsgChannelOpenTry {
      static encode(message: MsgChannelOpenTry, writer: Writer): void {
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const previous_channel_id = message.previous_channel_id
        if (previous_channel_id !== null) {
          writer.uint32(18)
          writer.string(previous_channel_id)
        }

        const channel = message.channel
        if (channel !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Channel.encode(channel, writer)
          writer.ldelim()
        }

        const counterparty_version = message.counterparty_version
        if (counterparty_version !== null) {
          writer.uint32(34)
          writer.string(counterparty_version)
        }

        const proof_init = message.proof_init
        if (proof_init !== null) {
          writer.uint32(42)
          writer.bytes(proof_init)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(58)
          writer.string(signer)
        }
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

      port_id: string | null
      previous_channel_id: string | null
      channel: cosmos.v1.Channel | null
      counterparty_version: string | null
      proof_init: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        previous_channel_id: string | null = null,
        channel: cosmos.v1.Channel | null = null,
        counterparty_version: string | null = null,
        proof_init: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel_id = message.channel_id
        if (channel_id !== null) {
          writer.uint32(18)
          writer.string(channel_id)
        }

        const counterparty_channel_id = message.counterparty_channel_id
        if (counterparty_channel_id !== null) {
          writer.uint32(26)
          writer.string(counterparty_channel_id)
        }

        const counterparty_version = message.counterparty_version
        if (counterparty_version !== null) {
          writer.uint32(34)
          writer.string(counterparty_version)
        }

        const proof_try = message.proof_try
        if (proof_try !== null) {
          writer.uint32(42)
          writer.bytes(proof_try)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(50)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(58)
          writer.string(signer)
        }
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

      port_id: string | null
      channel_id: string | null
      counterparty_channel_id: string | null
      counterparty_version: string | null
      proof_try: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        channel_id: string | null = null,
        counterparty_channel_id: string | null = null,
        counterparty_version: string | null = null,
        proof_try: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel_id = message.channel_id
        if (channel_id !== null) {
          writer.uint32(18)
          writer.string(channel_id)
        }

        const proof_ack = message.proof_ack
        if (proof_ack !== null) {
          writer.uint32(26)
          writer.bytes(proof_ack)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(42)
          writer.string(signer)
        }
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

      port_id: string | null
      channel_id: string | null
      proof_ack: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        channel_id: string | null = null,
        proof_ack: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel_id = message.channel_id
        if (channel_id !== null) {
          writer.uint32(18)
          writer.string(channel_id)
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(26)
          writer.string(signer)
        }
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

      port_id: string | null
      channel_id: string | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        channel_id: string | null = null,
        signer: string | null = null,
      ) {
        this.port_id = port_id
        this.channel_id = channel_id
        this.signer = signer
      }
    }

    export class MsgChannelCloseConfirm {
      static encode(message: MsgChannelCloseConfirm, writer: Writer): void {
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel_id = message.channel_id
        if (channel_id !== null) {
          writer.uint32(18)
          writer.string(channel_id)
        }

        const proof_init = message.proof_init
        if (proof_init !== null) {
          writer.uint32(26)
          writer.bytes(proof_init)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(42)
          writer.string(signer)
        }
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

      port_id: string | null
      channel_id: string | null
      proof_init: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        port_id: string | null = null,
        channel_id: string | null = null,
        proof_init: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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

        const proof_commitment = message.proof_commitment
        if (proof_commitment !== null) {
          writer.uint32(18)
          writer.bytes(proof_commitment)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(34)
          writer.string(signer)
        }
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
      proof_commitment: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_commitment: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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

        const proof_unreceived = message.proof_unreceived
        if (proof_unreceived !== null) {
          writer.uint32(18)
          writer.bytes(proof_unreceived)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(32)
        writer.uint64(message.next_sequence_recv)

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(42)
          writer.string(signer)
        }
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
      proof_unreceived: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      next_sequence_recv: u64
      signer: string | null

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_unreceived: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        next_sequence_recv: u64 = 0,
        signer: string | null = null,
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

        const proof_unreceived = message.proof_unreceived
        if (proof_unreceived !== null) {
          writer.uint32(18)
          writer.bytes(proof_unreceived)
        }

        const proof_close = message.proof_close
        if (proof_close !== null) {
          writer.uint32(26)
          writer.bytes(proof_close)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        writer.uint32(40)
        writer.uint64(message.next_sequence_recv)

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(50)
          writer.string(signer)
        }
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
      proof_unreceived: Uint8Array | null
      proof_close: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      next_sequence_recv: u64
      signer: string | null

      constructor(
        packet: cosmos.v1.Packet | null = null,
        proof_unreceived: Uint8Array | null = null,
        proof_close: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        next_sequence_recv: u64 = 0,
        signer: string | null = null,
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

        const acknowledgement = message.acknowledgement
        if (acknowledgement !== null) {
          writer.uint32(18)
          writer.bytes(acknowledgement)
        }

        const proof_acked = message.proof_acked
        if (proof_acked !== null) {
          writer.uint32(26)
          writer.bytes(proof_acked)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(34)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(42)
          writer.string(signer)
        }
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
      acknowledgement: Uint8Array | null
      proof_acked: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        packet: cosmos.v1.Packet | null = null,
        acknowledgement: Uint8Array | null = null,
        proof_acked: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(26)
          writer.string(signer)
        }
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
      signer: string | null

      constructor(
        client_state: cosmos.v1.Any | null = null,
        consensus_state: cosmos.v1.Any | null = null,
        signer: string | null = null,
      ) {
        this.client_state = client_state
        this.consensus_state = consensus_state
        this.signer = signer
      }
    }

    export class MsgUpdateClient {
      static encode(message: MsgUpdateClient, writer: Writer): void {
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

        const header = message.header
        if (header !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(header, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(26)
          writer.string(signer)
        }
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

      client_id: string | null
      header: cosmos.v1.Any | null
      signer: string | null

      constructor(
        client_id: string | null = null,
        header: cosmos.v1.Any | null = null,
        signer: string | null = null,
      ) {
        this.client_id = client_id
        this.header = header
        this.signer = signer
      }
    }

    export class MsgUpgradeClient {
      static encode(message: MsgUpgradeClient, writer: Writer): void {
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

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

        const proof_upgrade_client = message.proof_upgrade_client
        if (proof_upgrade_client !== null) {
          writer.uint32(34)
          writer.bytes(proof_upgrade_client)
        }

        const proof_upgrade_consensus_state = message.proof_upgrade_consensus_state
        if (proof_upgrade_consensus_state !== null) {
          writer.uint32(42)
          writer.bytes(proof_upgrade_consensus_state)
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(50)
          writer.string(signer)
        }
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

      client_id: string | null
      client_state: cosmos.v1.Any | null
      consensus_state: cosmos.v1.Any | null
      proof_upgrade_client: Uint8Array | null
      proof_upgrade_consensus_state: Uint8Array | null
      signer: string | null

      constructor(
        client_id: string | null = null,
        client_state: cosmos.v1.Any | null = null,
        consensus_state: cosmos.v1.Any | null = null,
        proof_upgrade_client: Uint8Array | null = null,
        proof_upgrade_consensus_state: Uint8Array | null = null,
        signer: string | null = null,
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
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

        const misbehaviour = message.misbehaviour
        if (misbehaviour !== null) {
          writer.uint32(18)
          writer.fork()
          cosmos.v1.Any.encode(misbehaviour, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(26)
          writer.string(signer)
        }
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

      client_id: string | null
      misbehaviour: cosmos.v1.Any | null
      signer: string | null

      constructor(
        client_id: string | null = null,
        misbehaviour: cosmos.v1.Any | null = null,
        signer: string | null = null,
      ) {
        this.client_id = client_id
        this.misbehaviour = misbehaviour
        this.signer = signer
      }
    }

    export class MsgConnectionOpenInit {
      static encode(message: MsgConnectionOpenInit, writer: Writer): void {
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

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

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(42)
          writer.string(signer)
        }
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

      client_id: string | null
      counterparty: cosmos.v1.ConnectionCounterparty | null
      version: cosmos.v1.ConnectionVersion | null
      delay_period: u64
      signer: string | null

      constructor(
        client_id: string | null = null,
        counterparty: cosmos.v1.ConnectionCounterparty | null = null,
        version: cosmos.v1.ConnectionVersion | null = null,
        delay_period: u64 = 0,
        signer: string | null = null,
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
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

        const previous_connection_id = message.previous_connection_id
        if (previous_connection_id !== null) {
          writer.uint32(18)
          writer.string(previous_connection_id)
        }

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

        const proof_init = message.proof_init
        if (proof_init !== null) {
          writer.uint32(66)
          writer.bytes(proof_init)
        }

        const proof_client = message.proof_client
        if (proof_client !== null) {
          writer.uint32(74)
          writer.bytes(proof_client)
        }

        const proof_consensus = message.proof_consensus
        if (proof_consensus !== null) {
          writer.uint32(82)
          writer.bytes(proof_consensus)
        }

        const consensus_height = message.consensus_height
        if (consensus_height !== null) {
          writer.uint32(90)
          writer.fork()
          cosmos.v1.Height.encode(consensus_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(98)
          writer.string(signer)
        }
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

      client_id: string | null
      previous_connection_id: string | null
      client_state: cosmos.v1.Any | null
      counterparty: cosmos.v1.ConnectionCounterparty | null
      delay_period: u64
      counterparty_versions: Array<cosmos.v1.ConnectionVersion>
      proof_height: cosmos.v1.Height | null
      proof_init: Uint8Array | null
      proof_client: Uint8Array | null
      proof_consensus: Uint8Array | null
      consensus_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        client_id: string | null = null,
        previous_connection_id: string | null = null,
        client_state: cosmos.v1.Any | null = null,
        counterparty: cosmos.v1.ConnectionCounterparty | null = null,
        delay_period: u64 = 0,
        counterparty_versions: Array<cosmos.v1.ConnectionVersion> = [],
        proof_height: cosmos.v1.Height | null = null,
        proof_init: Uint8Array | null = null,
        proof_client: Uint8Array | null = null,
        proof_consensus: Uint8Array | null = null,
        consensus_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
        const connection_id = message.connection_id
        if (connection_id !== null) {
          writer.uint32(10)
          writer.string(connection_id)
        }

        const counterparty_connection_id = message.counterparty_connection_id
        if (counterparty_connection_id !== null) {
          writer.uint32(18)
          writer.string(counterparty_connection_id)
        }

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

        const proof_try = message.proof_try
        if (proof_try !== null) {
          writer.uint32(50)
          writer.bytes(proof_try)
        }

        const proof_client = message.proof_client
        if (proof_client !== null) {
          writer.uint32(58)
          writer.bytes(proof_client)
        }

        const proof_consensus = message.proof_consensus
        if (proof_consensus !== null) {
          writer.uint32(66)
          writer.bytes(proof_consensus)
        }

        const consensus_height = message.consensus_height
        if (consensus_height !== null) {
          writer.uint32(74)
          writer.fork()
          cosmos.v1.Height.encode(consensus_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(82)
          writer.string(signer)
        }
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

      connection_id: string | null
      counterparty_connection_id: string | null
      version: cosmos.v1.ConnectionVersion | null
      client_state: cosmos.v1.Any | null
      proof_height: cosmos.v1.Height | null
      proof_try: Uint8Array | null
      proof_client: Uint8Array | null
      proof_consensus: Uint8Array | null
      consensus_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        connection_id: string | null = null,
        counterparty_connection_id: string | null = null,
        version: cosmos.v1.ConnectionVersion | null = null,
        client_state: cosmos.v1.Any | null = null,
        proof_height: cosmos.v1.Height | null = null,
        proof_try: Uint8Array | null = null,
        proof_client: Uint8Array | null = null,
        proof_consensus: Uint8Array | null = null,
        consensus_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
        const connection_id = message.connection_id
        if (connection_id !== null) {
          writer.uint32(10)
          writer.string(connection_id)
        }

        const proof_ack = message.proof_ack
        if (proof_ack !== null) {
          writer.uint32(18)
          writer.bytes(proof_ack)
        }

        const proof_height = message.proof_height
        if (proof_height !== null) {
          writer.uint32(26)
          writer.fork()
          cosmos.v1.Height.encode(proof_height, writer)
          writer.ldelim()
        }

        const signer = message.signer
        if (signer !== null) {
          writer.uint32(34)
          writer.string(signer)
        }
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

      connection_id: string | null
      proof_ack: Uint8Array | null
      proof_height: cosmos.v1.Height | null
      signer: string | null

      constructor(
        connection_id: string | null = null,
        proof_ack: Uint8Array | null = null,
        proof_height: cosmos.v1.Height | null = null,
        signer: string | null = null,
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
          writer.uint32(34)
          writer.fork()
          for (let i = 0; i < connection_hops.length; ++i) {
            writer.string(connection_hops[i])
          }
          writer.ldelim()
        }

        const version = message.version
        if (version !== null) {
          writer.uint32(42)
          writer.string(version)
        }
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
              if ((tag & 7) === 2 && tag !== 26) {
                const repeatedEnd: usize = reader.ptr + reader.uint32()
                while (reader.ptr < repeatedEnd) {
                  message.connection_hops.push(reader.string())
                }
              } else {
                message.connection_hops.push(reader.string())
              }
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
      version: string | null

      constructor(
        state: cosmos.v1.State = 0,
        ordering: cosmos.v1.Order = 0,
        counterparty: cosmos.v1.ChannelCounterparty | null = null,
        connection_hops: Array<string> = [],
        version: string | null = null,
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
        const port_id = message.port_id
        if (port_id !== null) {
          writer.uint32(10)
          writer.string(port_id)
        }

        const channel_id = message.channel_id
        if (channel_id !== null) {
          writer.uint32(18)
          writer.string(channel_id)
        }
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

      port_id: string | null
      channel_id: string | null

      constructor(port_id: string | null = null, channel_id: string | null = null) {
        this.port_id = port_id
        this.channel_id = channel_id
      }
    }

    export class CommissionRates {
      static encode(message: CommissionRates, writer: Writer): void {
        const rate = message.rate
        if (rate !== null) {
          writer.uint32(10)
          writer.string(rate)
        }

        const max_rate = message.max_rate
        if (max_rate !== null) {
          writer.uint32(18)
          writer.string(max_rate)
        }

        const max_change_rate = message.max_change_rate
        if (max_change_rate !== null) {
          writer.uint32(26)
          writer.string(max_change_rate)
        }
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

      rate: string | null
      max_rate: string | null
      max_change_rate: string | null

      constructor(
        rate: string | null = null,
        max_rate: string | null = null,
        max_change_rate: string | null = null,
      ) {
        this.rate = rate
        this.max_rate = max_rate
        this.max_change_rate = max_change_rate
      }
    }

    export class ConnectionCounterparty {
      static encode(message: ConnectionCounterparty, writer: Writer): void {
        const client_id = message.client_id
        if (client_id !== null) {
          writer.uint32(10)
          writer.string(client_id)
        }

        const connection_id = message.connection_id
        if (connection_id !== null) {
          writer.uint32(18)
          writer.string(connection_id)
        }

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

      client_id: string | null
      connection_id: string | null
      prefix: cosmos.v1.MerklePrefix | null

      constructor(
        client_id: string | null = null,
        connection_id: string | null = null,
        prefix: cosmos.v1.MerklePrefix | null = null,
      ) {
        this.client_id = client_id
        this.connection_id = connection_id
        this.prefix = prefix
      }
    }

    export class ConnectionVersion {
      static encode(message: ConnectionVersion, writer: Writer): void {
        const identifier = message.identifier
        if (identifier !== null) {
          writer.uint32(10)
          writer.string(identifier)
        }

        const features = message.features
        if (features.length !== 0) {
          writer.uint32(18)
          writer.fork()
          for (let i = 0; i < features.length; ++i) {
            writer.string(features[i])
          }
          writer.ldelim()
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
              if ((tag & 7) === 2 && tag !== 26) {
                const repeatedEnd: usize = reader.ptr + reader.uint32()
                while (reader.ptr < repeatedEnd) {
                  message.features.push(reader.string())
                }
              } else {
                message.features.push(reader.string())
              }
              break

            default:
              reader.skipType(tag & 7)
              break
          }
        }

        return message
      }

      identifier: string | null
      features: Array<string>

      constructor(identifier: string | null = null, features: Array<string> = []) {
        this.identifier = identifier
        this.features = features
      }
    }

    export class Description {
      static encode(message: Description, writer: Writer): void {
        const moniker = message.moniker
        if (moniker !== null) {
          writer.uint32(10)
          writer.string(moniker)
        }

        const identity = message.identity
        if (identity !== null) {
          writer.uint32(18)
          writer.string(identity)
        }

        const website = message.website
        if (website !== null) {
          writer.uint32(26)
          writer.string(website)
        }

        const security_contact = message.security_contact
        if (security_contact !== null) {
          writer.uint32(34)
          writer.string(security_contact)
        }

        const details = message.details
        if (details !== null) {
          writer.uint32(42)
          writer.string(details)
        }
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

      moniker: string | null
      identity: string | null
      website: string | null
      security_contact: string | null
      details: string | null

      constructor(
        moniker: string | null = null,
        identity: string | null = null,
        website: string | null = null,
        security_contact: string | null = null,
        details: string | null = null,
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
        const address = message.address
        if (address !== null) {
          writer.uint32(10)
          writer.string(address)
        }

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

      address: string | null
      coins: Array<cosmos.v1.Coin>

      constructor(address: string | null = null, coins: Array<cosmos.v1.Coin> = []) {
        this.address = address
        this.coins = coins
      }
    }

    export class Output {
      static encode(message: Output, writer: Writer): void {
        const address = message.address
        if (address !== null) {
          writer.uint32(10)
          writer.string(address)
        }

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

      address: string | null
      coins: Array<cosmos.v1.Coin>

      constructor(address: string | null = null, coins: Array<cosmos.v1.Coin> = []) {
        this.address = address
        this.coins = coins
      }
    }

    export class MerklePrefix {
      static encode(message: MerklePrefix, writer: Writer): void {
        const key_prefix = message.key_prefix
        if (key_prefix !== null) {
          writer.uint32(10)
          writer.bytes(key_prefix)
        }
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

      key_prefix: Uint8Array | null

      constructor(key_prefix: Uint8Array | null = null) {
        this.key_prefix = key_prefix
      }
    }

    export class Packet {
      static encode(message: Packet, writer: Writer): void {
        writer.uint32(8)
        writer.uint64(message.sequence)

        const source_port = message.source_port
        if (source_port !== null) {
          writer.uint32(18)
          writer.string(source_port)
        }

        const source_channel = message.source_channel
        if (source_channel !== null) {
          writer.uint32(26)
          writer.string(source_channel)
        }

        const destination_port = message.destination_port
        if (destination_port !== null) {
          writer.uint32(34)
          writer.string(destination_port)
        }

        const destination_channel = message.destination_channel
        if (destination_channel !== null) {
          writer.uint32(42)
          writer.string(destination_channel)
        }

        const data = message.data
        if (data !== null) {
          writer.uint32(50)
          writer.bytes(data)
        }

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
      source_port: string | null
      source_channel: string | null
      destination_port: string | null
      destination_channel: string | null
      data: Uint8Array | null
      timeout_height: cosmos.v1.Height | null
      timeout_timestamp: u64

      constructor(
        sequence: u64 = 0,
        source_port: string | null = null,
        source_channel: string | null = null,
        destination_port: string | null = null,
        destination_channel: string | null = null,
        data: Uint8Array | null = null,
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
          t.v1.SignedHeader.encode(signed_header, writer)
          writer.ldelim()
        }

        const validator_set = message.validator_set
        if (validator_set !== null) {
          writer.uint32(18)
          writer.fork()
          t.v1.ValidatorSet.encode(validator_set, writer)
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
          t.v1.ValidatorSet.encode(trusted_validators, writer)
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
              message.signed_header = t.v1.SignedHeader.decode(reader, reader.uint32())
              break

            case 2:
              message.validator_set = t.v1.ValidatorSet.decode(reader, reader.uint32())
              break

            case 3:
              message.trusted_height = cosmos.v1.Height.decode(reader, reader.uint32())
              break

            case 4:
              message.trusted_validators = t.v1.ValidatorSet.decode(
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

      signed_header: t.v1.SignedHeader | null
      validator_set: t.v1.ValidatorSet | null
      trusted_height: cosmos.v1.Height | null
      trusted_validators: t.v1.ValidatorSet | null

      constructor(
        signed_header: t.v1.SignedHeader | null = null,
        validator_set: t.v1.ValidatorSet | null = null,
        trusted_height: cosmos.v1.Height | null = null,
        trusted_validators: t.v1.ValidatorSet | null = null,
      ) {
        this.signed_header = signed_header
        this.validator_set = validator_set
        this.trusted_height = trusted_height
        this.trusted_validators = trusted_validators
      }
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
  }
}
