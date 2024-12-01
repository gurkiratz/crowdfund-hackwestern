#[starknet::interface]
trait IFundCampaign<CampaignState> {
    fn contribute(ref self: CampaignState, user: ContractAddress, amount: u256);
    // fn get_user_contributions(self: @CampaignState, user: ContractAddress) -> u256;
    fn get_total_contributions(self: @CampaignState) -> u256;
    fn get_contributor_count(self: @CampaignState) -> u256;
}

#[starknet::contract]
mod FundCampaign {
    // use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    #[storage]
    struct Storage {
        pub total_contributions: u256,
        // pub contributions: Map<ContractAddress, u256>,
        pub contributor_count: u32,
    }

    #[constructor]
        fn constructor(ref self: ContractState) {
            self.total_contributions.write(0);
    }

    #[abi(embed_v0)]
    impl FundCampaign of super::IFundCampaign<ContractState> {
        fn contribute(ref self: ContractState, user: ContractAddress, amount: u256) {
            let old_amount: u256 = self.contributions.read(user);

            if old_amount == 0 {
                let index = self.contributor_count.read();
                self.contributor_count.write(index + 1);
            }
            // self.contributions.write(user, old_amount + amount);
            self.total_contributions.write(self.total_contributions.read() + amount);
      }

        // fn get_user_contributions(self: @ContractState<CampaignState>, user: ContractAddress) -> u256 {
        //     return self.contributions.read(user);
        // }

        fn get_total_contributions(self: @ContractState<CampaignState>) -> u256 {
            return self.total_contributions.read();
        }

        fn get_contributor_count(self: @ContractState<CampaignState>) -> u256 {
            return self.contributor_count.read();
        }
    }
}