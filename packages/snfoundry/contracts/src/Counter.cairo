#[starknet::interface]
trait ISimpleCounter<TContractState> {
    fn get_current_count(self: @TContractState) -> u128;
    fn increment(ref self: TContractState);
    fn decrement(ref self: TContractState);
}

#[starknet::contract]
mod Counter {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        pub counter : u128,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_value: u128) {
        self.counter.write(init_value);
    }

    #[abi(embed_v0)]
    impl SimpleCounter of super::ISimpleCounter<ContractState>{
        fn get_current_count(self: @ContractState ) -> u128 {
            return self.counter.read();
        }

        fn increment(ref self: ContractState) {
            let counter = self.counter.read() + 1;
            self.counter.write(counter)
        }

        fn decrement(ref self: ContractState) {
            let counter = self.counter.read() - 1;
            self.counter.write(counter)
        }
        
    }

}
