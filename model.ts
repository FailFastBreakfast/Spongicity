
import cityBlockData from './data.json';

const cityBlocks: CityBlock[][] = [[]];
for (let i = 0; i < 4; i++){
  for (let j = 0; j < 4; j++) {
    cityBlocks[i].push(cityBlockData[i + j] as CityBlock);
  }
  cityBlocks.push([]);
}


