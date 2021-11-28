// cityBlock	height	notes	topologicalFloodRisk	spongacity	criticalInfrastructure	historicFloodProbability	drainageIn	drainageOut	publicTransportPresence	electricityInfrastructureResiliency

type Scenario = {
  /** E.g.: "Soggystadt - Heavy rainfall" */
  name: string;

  /** Could leave out for now: Only dealing with extreme rainfall  */
  floodType: Flood;

  /** list of properties that affect the difficulty of the scenario */
  properties: ScenarioCondition[];

  cityBlocks: CityBlock[][];
}

type Flood = {
  /** kl/m */
  precipitation: number;
  /** Days */
  duration: number;
}

type ScenarioCondition = {
  /** E.g. hurricane, freezing weather */
  name: string;
  
  /** Impact on reaching targets for each priority */
  priorityInfluence: Priorities;
}

type Priorities = {
  life: number;
  injury: number;
  property: number;
  power: number;
  infrastructure: number;
  communication: number;
}

type CityBlock = {
  name: string;
  height: number;
  population: number;

  floodRisk: number; 
  // floodRisks: Record<0.2 | 0.5 | 1 | 2, number>;

  /** Influences the drainageStorageCapacity */
  spongicity: number;

  /** What to optimize in this city block */
  priorities: Priorities;

  /** Liters per hour in each direction */
  drainageFlowCapacity: number[][];
  /** Max. capacity until a flood occurs */
  drainageStorageCapacity: number;

  // TODO: Add more
}

// The result of the simulation is a list of mitigations that are the best fit to the city
// given the current scenario and desired parameters to optimize for (loss of life, property damage, etc.)
type Result = {
  /** A list of mitigations per city block **/
  mitigations: Array<Mitigation>[][];

  // estimates: 
  /** Prevented flood impacts */
  effectiveness: Priorities;
}


type Mitigation = {
  name: string;
  steps: MitigationStep[];
  
  /** Cost in $ per year */
  maintananceCost: number;

  // TODO: should be a computed property based on steps
  // Sum of timeCost
  timeToInstallation(): number;
  // Sum of costs of steps
  totalFinancialCost(): number;
};

type MitigationStep = {
  name: string;
  financialCost: number;
  timeCost: number;
  stakeholders: Stakeholder[];
}

type Stakeholder = {
  budget: number;
  mitigationPreferences: string[];
  priorityPreferences: Priorities;
}

class Simulation {
  cityBlocks: CityBlock[][];

  constructor(scenario: Scenario) {
    this.cityBlocks = scenario.cityBlocks;
  }

  recommendMitigations() {
    // Highest effectiveness compared to cost
    // Fastest to install, cheapest to maintain
    // Aligns the best with the desired priorities

    // Return for each city block which mitigations suit the best
    
  }

  step() {
    for (let i = 0; i < this.cityBlocks.length; i++) {
      for (let j = 0; j < this.cityBlocks[i].length; j++) {

        // Keep track of state:
        // - rain falling down, being absorbed/captured 
        // - if over capacity, flows into neighbouring cityblocks
        // - water in capacity slowly drains out as well (say 1/3 of remaining stored water)


        // Simulate damage


      }
    }
  }
}
