

#[starknet::contract]
pub mod SimpleStorage {
    use starknet::ContractAddress;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
 
    #[storage]
    struct Storage {
        map: Map::<ContractAddress, felt252>,
    }
 
    #[abi(embed_v0)]
    impl MapContractImpl of super::IMapContract<ContractState> {
        fn set(ref self: ContractState, key: ContractAddress, value: felt252) {
            self.map.write(key, value);
        }
 
        fn get(self: @ContractState, key: ContractAddress) -> felt252 {
            self.map.read(key)
        }
    }
}