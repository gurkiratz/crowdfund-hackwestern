import {
  deployContract,
  executeDeployCalls,
  exportDeployments,
  deployer,
} from "./deploy-contract";
import { green } from "./helpers/colorize-log";

/**
 * Deploy a contract using the specified parameters.
 *
 * @example (deploy contract with contructorArgs)
 * const deployScript = async (): Promise<void> => {
 *   await deployContract(
 *     {
 *       contract: "YourContract",
 *       contractName: "YourContractExportName",
 *       constructorArgs: {
 *         owner: deployer.address,
 *       },
 *       options: {
 *         maxFee: BigInt(1000000000000)
 *       }
 *     }
 *   );
 * };
 *
 * @example (deploy contract without contructorArgs)
 * const deployScript = async (): Promise<void> => {
 *   await deployContract(
 *     {
 *       contract: "YourContract",
 *       contractName: "YourContractExportName",
 *       options: {
 *         maxFee: BigInt(1000000000000)
 *       }
 *     }
 *   );
 * };
 *
 *
 * @returns {Promise<void>}
 */
// const deployScript = async (): Promise<void> => {
//   await deployContract({
//     contract: "YourContract",
//     constructorArgs: {
//       owner: deployer.address,
//     },
//   });
// };

// const deployScript = async (): Promise<void> => {
//   //   await deployContract({
//   //   contract: "YourContract",
//   //   constructorArgs: {
//   //     owner: deployer.address,
//   //   },
//   // });

//   // await deployContract({
//   //   contract: "Counter",
//   //   contractName: "Counter",
//   //   constructorArgs: {
//   //     init_value: BigInt(0),
//   //   },
//   // });
  
//   await deployContract({
//     contract: 'Campaign',
//     contractName: 'Campaign',
//     constructorArgs: {
//       creator: null,
//       title: "Default Title",
//       description: "Default Description",
//       goal: BigInt(0),
//       start_time:  BigInt(0),
//       end_time: BigInt(0),
//       token_address: null,
//     }
//   })
// };

// const deployScript = async (): Promise<void> => {
//   await deployContract({
//     contract: "NameRegistry",
//     contractName: "NameRegistry",
//     constructorArgs: {
//       owner: {
//         address: deployer.address,
//         name: 'deployer',
//       } 
//     },
//   });
// };
// const deployScript = async (): Promise<void> => {
//   await deployContract({
//     contract: "Campaign",
//     contractName: "Campaign",
//     constructorArgs: {
//       owner: {
//         creator: deployer.address,
//         title: 'title',
//         description: 'description',
//         goal: BigInt(10),
//         start_time: BigInt(1),
//         end_time: BigInt(60),
//         token_address: deployer.address,
//       } 
//     },
//   });
// };

const deployScript = async (): Promise<void> => {
  await deployContract({
    contract: "FundCampaign",
    // constructorArgs: {
    //   owner: deployer.address,
    // },
  });
};

deployScript()
  .then(async () => {
    executeDeployCalls()
      .then(() => {
        exportDeployments();
        console.log(green("All Setup Done"));
      })
      .catch((e) => {
        console.error(e);
        process.exit(1); // exit with error so that non subsequent scripts are run
      });
  })
  .catch(console.error);
