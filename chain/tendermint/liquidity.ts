import { Writer, Reader, Protobuf } from "as-proto";
import { cosmos } from "./cosmos";

export namespace liquidity {
  export namespace v1 {
    export class MsgSwapWithinBatch {
      static encode(message: MsgSwapWithinBatch, writer: Writer): void {
        const swap_requester_address = message.swap_requester_address;
        if (swap_requester_address !== null) {
          writer.uint32(10);
          writer.string(swap_requester_address);
        }

        writer.uint32(16);
        writer.uint64(message.pool_id);

        writer.uint32(24);
        writer.uint32(message.swap_type_id);

        const offer_coin = message.offer_coin;
        if (offer_coin !== null) {
          writer.uint32(34);
          writer.fork();
          cosmos.v1.Coin.encode(offer_coin, writer);
          writer.ldelim();
        }

        const demand_coin_denom = message.demand_coin_denom;
        if (demand_coin_denom !== null) {
          writer.uint32(42);
          writer.string(demand_coin_denom);
        }

        const offer_coin_fee = message.offer_coin_fee;
        if (offer_coin_fee !== null) {
          writer.uint32(50);
          writer.fork();
          cosmos.v1.Coin.encode(offer_coin_fee, writer);
          writer.ldelim();
        }

        const order_price = message.order_price;
        if (order_price !== null) {
          writer.uint32(58);
          writer.string(order_price);
        }
      }

      static decode(reader: Reader, length: i32): MsgSwapWithinBatch {
        const end: usize = length < 0 ? reader.end : reader.ptr + length;
        const message = new MsgSwapWithinBatch();

        while (reader.ptr < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.swap_requester_address = reader.string();
              break;

            case 2:
              message.pool_id = reader.uint64();
              break;

            case 3:
              message.swap_type_id = reader.uint32();
              break;

            case 4:
              message.offer_coin = cosmos.v1.Coin.decode(
                reader,
                reader.uint32()
              );
              break;

            case 5:
              message.demand_coin_denom = reader.string();
              break;

            case 6:
              message.offer_coin_fee = cosmos.v1.Coin.decode(
                reader,
                reader.uint32()
              );
              break;

            case 7:
              message.order_price = reader.string();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      }

      swap_requester_address: string | null;
      pool_id: u64;
      swap_type_id: u32;
      offer_coin: cosmos.v1.Coin | null;
      demand_coin_denom: string | null;
      offer_coin_fee: cosmos.v1.Coin | null;
      order_price: string | null;

      constructor(
        swap_requester_address: string | null = null,
        pool_id: u64 = 0,
        swap_type_id: u32 = 0,
        offer_coin: cosmos.v1.Coin | null = null,
        demand_coin_denom: string | null = null,
        offer_coin_fee: cosmos.v1.Coin | null = null,
        order_price: string | null = null
      ) {
        this.swap_requester_address = swap_requester_address;
        this.pool_id = pool_id;
        this.swap_type_id = swap_type_id;
        this.offer_coin = offer_coin;
        this.demand_coin_denom = demand_coin_denom;
        this.offer_coin_fee = offer_coin_fee;
        this.order_price = order_price;
      }
    }
  
    export function decodeMsgSwapWithinBatch(a: Uint8Array): MsgSwapWithinBatch {
      return Protobuf.decode<MsgSwapWithinBatch>(a, MsgSwapWithinBatch.decode);
    }
  }
}