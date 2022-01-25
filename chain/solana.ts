import '../common/eager_offset'
import {Bytes} from '../common/collections'

// Most types from this namespace are direct mappings or adaptations from:
// https://github.com/streamingfast/proto-near/blob/develop/sf/near/codec/v1/codec.proto
export namespace solana {
    export type CryptoHash = Bytes

    export class Block {
        constructor(
            public number: u64,
            public previous_block: u64,
            public genesis_unix_timestamp: u64,
            public clock_unix_timestamp: u64,
            public root_num: u64,
            public transaction_count: u32,
            public version: u32,
            public id: CryptoHash,
            public previous_id: CryptoHash,
            public last_entry_hash: CryptoHash,
            public transactions: Transaction[],
            public account_changes_file_ref: String[],
            public has_split_account_changes: bool,
        ) {
        }
    }

    export class Transaction {
        constructor(
            public index: u64,
            public id: CryptoHash,
            public additional_signatures: CryptoHash[],
            public header: MessageHeader,
            public account_keys: CryptoHash[],
            public recent_blockhash: CryptoHash,
            public log_messages: String[],
            public instructions: Instruction[],
            public error: TransactionError,
            public failed: bool,
        ) {
        }
    }

    export class MessageHeader {
        constructor(
            public num_required_signatures: u32,
            public num_readonly_signed_accounts: u32,
            public num_readonly_unsigned_accounts: u32,
        ) {
        }
    }

    export class TransactionError {
        constructor(
            public error: String
        ) {
        }
    }

    export class Instruction {
        constructor(
            public ordinal: u32,
            public parent_ordinal: u32,
            public depth: u32,
            public programId: CryptoHash,
            public account_keys: CryptoHash[],
            public data: CryptoHash,
            public balance_changes: BalanceChange[],
            public account_changes: AccountChange[],
            public error: InstructionError,
            public failed: bool,
        ) {
            //todo: convert programId from base58 to string
        }
    }

    export class BalanceChange {
        constructor(
            public public_key: CryptoHash,
            public prev_lamports: u64,
            public new_laports: u64,
        ) {

        }
    }

    export class AccountChange {
        constructor(
            public pub_key: CryptoHash,
            public prev_data: CryptoHash,
            public new_data: CryptoHash,
            public new_data_length: u64,
        ) {
        }
    }

    export class InstructionError {
        constructor(
            public error: String
        ) {
        }
    }

    export class InstructionWithBlock {
        constructor(
            public block_num: u64,
            public instruction: Instruction,
            public block_id: CryptoHash,
            public transaction_id: CryptoHash,
        ) {
        }
    }
}