import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  formVisible = true;

  units: any;

  barWeightLB = 45;
  barWeightKG = 20;
  barWeight = this.barWeightLB;

  maxWeightLB = 225;
  maxWeightKG = 100;
  maxWeight = this.maxWeightLB;

  incrementLB = 5;
  incrementKG = 1;
  increment = this.incrementLB;

  numColumns = 4;

  weights: any;

  plateColors: any;

  plateColorsLB: any = {
    1.25: {
      fg: '#000000',
      bg: '#ffffff'
    },
    2.5: {
      fg: '#ffffff',
      bg: '#009900'
    },
    5: {
      fg: '#ffffff',
      bg: '#003399'
    },
    10: {
      fg: '#000000',
      bg: '#ffffff'
    },
    15: {
      fg: '#ffffff',
      bg: '#000000'
    },
    25: {
      fg: '#ffffff',
      bg: '#009900'
    },
    35: {
      fg: '#ffffff',
      bg: '#ffcc00'
    },
    45: {
      fg: '#ffffff',
      bg: '#003399'
    },
    55: {
      fg: '#ffffff',
      bg: '#993333'
    },
  };

  plateColorsKG: any = {
    0.5: {
      fg: '#000000',
      bg: '#ffffff'
    },
    1: {
      fg: '#ffffff',
      bg: '#009900'
    },
    1.5: {
      fg: '#ffffff',
      bg: '#ffcc00'
    },
    2: {
      fg: '#ffffff',
      bg: '#003399'
    },
    2.5: {
      fg: '#ffffff',
      bg: '#993333'
    },
    5: {
      fg: '#000000',
      bg: '#ffffff'
    },
    10: {
      fg: '#ffffff',
      bg: '#009900'
    },
    15: {
      fg: '#ffffff',
      bg: '#ffcc00'
    },
    20: {
      fg: '#ffffff',
      bg: '#003399'
    },
    25: {
      fg: '#ffffff',
      bg: '#993333'
    },
  };

  plates: any;

  platesLB: any = {
    1.25: 1,
    2.5: 1,
    5: 1,
    10: 2,
    25: 1,
    45: 10
  };

  platesKG: any = {
    0.5: 1,
    1: 1,
    1.5: 1,
    2: 1,
    2.5: 1,
    5: 1,
    10: 1,
    15: 0,
    20: 10,
    25: 0,
  };

  combinations: any;

  Object = Object;

  constructor() {
    this.units = 'lb';
    this.applyLBConfig();
  }

  ngOnInit(): void {
    this.updatePlateCombinations();
  }

  updatePlateCombinations() {
    this.combinations = {};
    this.weights = _.range(this.barWeight, this.maxWeight + this.increment, this.increment);

    this.weights.forEach((weight: any) => {
      let remainingPlates = this.getInitialPlates();
      let remainingWeight = weight;
      let combo = [];
      while (remainingWeight > this.barWeight) {
        let plate = this.getBiggestFitPlate(remainingPlates, remainingWeight);
        if (plate === -1) {
          combo = [];
          break;
        }
        remainingPlates.splice(remainingPlates.indexOf(plate), 1);
        combo.push(plate);
        remainingWeight -= plate * 2;
      }

      this.combinations[weight] = combo;
      // console.log(weight, combo);
    });
  }

  getSortedKeys(obj: any) {
    return Object.keys(obj).map(parseFloat).sort((a, b) => a - b);
  }

  getInitialPlates(): number[] {
    let res: number[] = [];
    _.forIn(this.plates, (qty: number, weight: any) => {
      weight = parseFloat(weight);
      res.push(...new Array(qty).fill(weight));
    });
    res.sort((a, b) => a - b);
    return res;
  }

  getBiggestFitPlate(sortedPlates: any, weight: number) {
    let biggest = 0;
    sortedPlates.forEach((plate: number) => {
      if (plate > biggest && this.barWeight + plate * 2 <= weight) {
        biggest = plate;
      }
    });
    if (biggest === 0) {
      return -1;
    }
    return biggest;
  }

  applyLBConfig() {
    this.plateColors = this.plateColorsLB;
    this.plates = this.platesLB;
    this.barWeight = this.barWeightLB;
    this.maxWeight = this.maxWeightLB;
    this.increment = this.incrementLB;
  }

  applyKGConfig() {
    this.plateColors = this.plateColorsKG;
    this.plates = this.platesKG;
    this.barWeight = this.barWeightKG;
    this.maxWeight = this.maxWeightKG;
    this.increment = this.incrementKG;
  }

  dataChangedUnits() {
    if (this.units === 'lb') {
      this.applyLBConfig();
    } else if (this.units === 'kg') {
      this.applyKGConfig();
    }
    this.updatePlateCombinations();
  }

  dataChangedPlates(weight: any, event: any) {
    this.plates[weight] = event.target.valueAsNumber;
    this.updatePlateCombinations();
  }

  dataChangedBarWeight(event: any) {
    this.barWeight = event.target.valueAsNumber;
    if (this.units === 'lb') {
      this.barWeightLB = this.barWeight;
    } else if (this.units === 'kg') {
      this.barWeightKG = this.barWeight;
    }
    this.updatePlateCombinations();
  }

  dataChangedMaxWeight(event: any) {
    this.maxWeight = event.target.valueAsNumber;
    if (this.units === 'lb') {
      this.maxWeightLB = this.maxWeight;
    } else if (this.units === 'kg') {
      this.maxWeightKG = this.maxWeight;
    }
    this.updatePlateCombinations();
  }

  dataChangedIncrement(event: any) {
    this.increment = event.target.valueAsNumber;
    if (this.units === 'lb') {
      this.incrementLB = this.increment;
    } else if (this.units === 'kg') {
      this.incrementKG = this.increment;
    }
    this.updatePlateCombinations();
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

}
