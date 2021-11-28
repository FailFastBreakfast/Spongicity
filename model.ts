
import { Scenario, CityBlock, Priorities, Mitigation, Result } from './types';

class Model {
  cityBlocks: CityBlock[];

  constructor(scenario: Scenario) {
    this.cityBlocks = scenario.cityBlocks;
  }

  recommendMitigations(availableMitigations: Mitigation[], budget: number, priorities:  Priorities): Result {
    type BlockState = CityBlock & { }
    
    // Goal: Return for each city block which mitigations suit the best

    // Option 1:
    // For every city block
    //   Compute a flood-risk score given topological risk, net drainage flow, spongicity
    //   Given priorities, recommend which mitigation to put into place

    const result: Result = {
      mitigations: [],
    };

    for (let i = 0; i < this.cityBlocks.length; i++) {
      for (const mitigation of availableMitigations) {
        const block = this.cityBlocks[i];

        // Highest effectiveness compared to cost
        const costEffectiveness = mitigation.cost() / mitigation.timeToInstallation();
        // Fastest to install, cheapest to maintain
        // Aligns the best with the desired priorities

        // The score of this mitigation in this city block
        const score = block.floodRisk * block.dainageFactor * block.spongicity * costEffectiveness;
        result.mitigations[i].push(mitigation);
        result.effectiveness[i] += score;
      }
    }


    // Option 2 (MVP):
    // loop over all mitigations, compute effectiveness etc.
  }

  /** Alternative model: Simulating effectiveness over time by modelling water flow and storage */
  step() {
    for (let i = 0; i < this.cityBlocks.length; i++) {

        // Keep track of state:
        // - rain falling down, being absorbed/captured 
        // - if over capacity, flows into neighbouring cityblocks
        // - water in capacity slowly drains out as well (say 1/3 of remaining stored water)


        // Simulate damage

    }
  }
}

export default Model;
