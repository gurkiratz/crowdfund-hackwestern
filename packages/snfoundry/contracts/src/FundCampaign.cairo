#[starknet::contract]
mod FundCampaign {
    use starknet::storage::Map;
    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};

    #[storage]
    struct Storage {
        total_contributions: u256,
        contributions: Map<ContractAddress, u256>,
    }

    #[abi(embed_v0)]
    impl FundCampaign {
        #[constructor]
        fn constructor(ref self: ContractState) {
            self.total_contributions.write(0_u256);
        }

        #[external]
        fn contribute(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            let current_contribution = self.contributions.get(caller).unwrap_or(0_u256);
            let new_contribution = current_contribution + amount;

            self.contributions.insert(caller, new_contribution);
            let total_contributions = self.total_contributions.read();
            self.total_contributions.write(total_contributions + amount);
        }

        #[view]
        fn get_total_contributions(self: @ContractState) -> u256 {
            self.total_contributions.read()
        }

        #[view]
        fn get_contribution(self: @ContractState, contributor: ContractAddress) -> u256 {
            self.contributions.get(contributor).unwrap_or(0_u256)
        }
    }
}