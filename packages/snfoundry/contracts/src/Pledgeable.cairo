use starknet::ContractAddress;
 
#[starknet::interface]
pub trait IPledgeable<TContractState> {
    fn add(ref self: TContractState, pledger: ContractAddress, amount: u256);
    fn get(self: @TContractState, pledger: ContractAddress) -> u256;
    fn get_pledger_count(self: @TContractState) -> u32;
    fn array(self: @TContractState) -> Array<ContractAddress>;
    fn get_total(self: @TContractState) -> u256;
    fn remove(ref self: TContractState, pledger: ContractAddress) -> u256;
}
 
#[starknet::component]
pub mod pledgeable_component {
    use core::array::ArrayTrait;
    use core::num::traits::Zero;
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess
    };
 
    #[storage]
    pub struct Storage {
        index_to_pledger: Map<u32, ContractAddress>,
        pledger_to_amount: Map<ContractAddress, u256>,
        pledger_count: u32,
        total_amount: u256,
    }
 
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {}
 
    mod Errors {
        pub const INCONSISTENT_STATE: felt252 = 'Non-indexed pledger found';
    }
 
    #[embeddable_as(Pledgeable)]
    pub impl PledgeableImpl<
        TContractState, +HasComponent<TContractState>
    > of super::IPledgeable<ComponentState<TContractState>> {
        fn add(ref self: ComponentState<TContractState>, pledger: ContractAddress, amount: u256) {
            let old_amount: u256 = self.pledger_to_amount.read(pledger);
 
            if old_amount == 0 {
                let index = self.pledger_count.read();
                self.index_to_pledger.write(index, pledger);
                self.pledger_count.write(index + 1);
            }
 
            self.pledger_to_amount.write(pledger, old_amount + amount);
            self.total_amount.write(self.total_amount.read() + amount);
        }
 
        fn get(self: @ComponentState<TContractState>, pledger: ContractAddress) -> u256 {
            self.pledger_to_amount.read(pledger)
        }
 
        fn get_pledger_count(self: @ComponentState<TContractState>) -> u32 {
            self.pledger_count.read()
        }
 
        fn array(self: @ComponentState<TContractState>) -> Array<ContractAddress> {
            let mut result = array![];
 
            let mut index = self.pledger_count.read();
            while index != 0 {
                index -= 1;
                let pledger = self.index_to_pledger.read(index);
                result.append(pledger);
            };
 
            result
        }
 
        fn get_total(self: @ComponentState<TContractState>) -> u256 {
            self.total_amount.read()
        }
 
        fn remove(ref self: ComponentState<TContractState>, pledger: ContractAddress) -> u256 {
            let amount: u256 = self.pledger_to_amount.read(pledger);
 
            // check if the pledge even exists
            if amount == 0 {
                return 0;
            }
 
            let last_index = self.pledger_count.read() - 1;
 
            // if there are other pledgers, we need to update our indices
            if last_index != 0 {
                let mut pledger_index = last_index;
                loop {
                    if self.index_to_pledger.read(pledger_index) == pledger {
                        break;
                    }
                    // if pledger_to_amount contains a pledger, then so does index_to_pledger
                    // thus this will never underflow
                    pledger_index -= 1;
                };
 
                self.index_to_pledger.write(pledger_index, self.index_to_pledger.read(last_index));
            }
 
            // last_index == new pledger count
            self.pledger_count.write(last_index);
            self.pledger_to_amount.write(pledger, 0);
            self.index_to_pledger.write(last_index, Zero::zero());
 
            self.total_amount.write(self.total_amount.read() - amount);
 
            amount
        }
    }
}