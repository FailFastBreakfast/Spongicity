// cityBlock	height	notes	topologicalFloodRisk	spongacity	criticalInfrastructure	historicFloodProbability	drainageIn	drainageOut	publicTransportPresence	electricityInfrastructureResiliency

export type Scenario = {
  /** E.g.: "Soggystadt - Heavy rainfall" */
  name: string;

  /** Could leave out for now: Only dealing with extreme rainfall  */
  floodType: Flood;

  /** list of properties that affect the difficulty of the scenario */
  conditions: ScenarioCondition[];

  cityBlocks: CityBlock[];
}

export type Flood = {
  /** kl/m, similar to drainage flow between city blocks */
  precipitation: number;
}

export type ScenarioCondition = {
  /** E.g. hurricane, freezing weather */
  name: string;
  
  /** Impact on reaching targets for each priority */
  priorityInfluence: Priorities;
}

export type Priorities = {
  life: number;
  /* damage to property (buildings, cars, etc.) */
  property: number;
  /* damage to infrastructure (roads, bridges, tunnels, etc.) */
  infrastructure: number;
  /* damage to power infrastructure (power plants, power lines, etc.) */
  power: number;
  /* damage to communication infrastructure (fibre optic cables, cell towers, etc.) */
  communication: number;
}

export type CityBlock = {
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
  drainageFlowCapacity: number[];
  /** Max. capacity until a flood occurs */
  drainageStorageCapacity: number;

  // TODO: Add more
}

// The result of the simulation is a list of mitigations that are the best fit to the city
// given the current scenario and desired parameters to optimize for (loss of life, property damage, etc.)
export type Result = {
  /** A list of mitigations per city block **/
  mitigations: Array<Mitigation>[];

  // estimates: 
  /** Prevented flood impacts */
  effectiveness: Priorities;
}


export type Mitigation = {
  name: string;
  steps: MitigationStep[];
  
  /** Cost in $ per year for an average city block */
  maintananceCost: number;

  // TODO: should be a computed property based on steps
  // Sum of timeCost
  timeToInstallation(): number;
  // Sum of costs of steps
  totalFinancialCost(): number;
};

export type MitigationStep = {
  name: string;
  financialCost: number;
  timeCost: number;
  stakeholders: string[];
}

export type Stakeholder = {
  budget: number;
  mitigationPreferences: string[];
  priorityPreferences: Priorities;
}
