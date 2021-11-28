import Model from "./model";
import { Mitigation, Scenario } from "./types";

import cityBlockData from './data.json';

// Setting up the scenario
// --------------------------------------------------
const soggyStadtScenario: Scenario = {
  name: "Soggystadt - Extreme rainfall",
  floodType: {
    precipitation: 300,
  },
  conditions: [
    /* could add more conditions here that affect the desired solution (e.g. hurricane, freezing weather) */
    {
      name: "Hurricane (light)",
      priorityInfluence: {
        life: 1.1,
        property: 1.4,
        infrastructure: 1.1,
        power: 1.3,
        communication: 1.2,
      },
    },
  ],
  cityBlocks: cityBlockData,
};

const availableMitigations: Mitigation[] = [
  {
    name: 'Blue  roofs',
    maintananceCost: 5000 * 0.1 * 100, // avg of 500 residents per block, 10% needs maintance per year, with 100$ per unit
    steps: [
      { name: 'Set up subsidy', timeCost: 1, financialCost: 100, stakeholders: ['Municipality'] },
      { name: 'Install blue roofs', timeCost: 1, financialCost: 100, stakeholders: ['city'] },
  },
  {
    name: 'Pump upgrade',
    maintananceCost: 5000, // avg of 500 residents per block, 10% needs maintance per year, with 100$ per unit
    // TODO: include more properties
  }
];


// Setting up the model
// --------------------------------------------------
const model = new Model(soggyStadtScenario);
const recommendedMitigation =  model.recommendMitigations(
  availableMitigations,
  1_000_000, // budget
  {
    // Priorities
    life: 0.8,
    property: 0.3,
    infrastructure: 0.5,
    power: 0.5,
    communication: 0.5,
  }
);

// Running the model
console.log(recommendedMitigation);
