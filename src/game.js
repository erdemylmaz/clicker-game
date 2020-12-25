class Game {
  demandRate = 0;

  money = 0;
  currentCigKofte = 0;
  makedCigKofte = 0;

  // auto buyer
  hasAutoBuyer = false;
  autoBuyerPrice = 15000; // 15000
  isAutoBuyerActive = false;
  unlockAutoBuyer = 2000;

  // manufacture rate
  lastManufacturedCount = 0;
  lastManufacturedRate = 0;
  lastManufacturedRateTs = Date.now();
  manufacturedCigKofte = 0;

  // price of the material
  materialPrice = 1000;
  materialPriceLastUpdated = Date.now();
  material = 10000;
  neededMaterial = 100;

  // price
  cigKofteFee = 20;

  // helpers

  helpers = {
    // arrand boy
    errandBoy: 0,
    errandBoyCost: 250,
    errandBoyRate: 1,

    // foreman
    foreman: 0,
    foremanCost: 1000,
    foremanRate: 3,

    // master
    master: 0,
    masterCost: 5000,
    masterRate: 6,
  };
  lastHelpersMadeCigKofteTs = Date.now();
  // buy helpers
  buyErrandBoy = () => {
    this.money -= this.helpers.errandBoyCost;
    this.helpers.errandBoy += 1;
    this.helpers.errandBoyCost += Math.floor(
      (this.helpers.errandBoyCost * 75) / 100
    );
  };

  buyForeman = () => {
    this.money -= this.helpers.foremanCost;
    this.helpers.foreman += 1;
    this.helpers.foremanCost += Math.floor(
      (this.helpers.foremanCost * 75) / 100
    );
  };

  buyMaster = () => {
    this.money -= this.helpers.masterCost;
    this.helpers.master += 1;
    this.helpers.masterCost += Math.floor((this.helpers.masterCost * 75) / 100);
  };

  // can buy helpers

  canBuyErrandBoy = () => {
    return this.money >= this.helpers.errandBoyCost;
  };

  canBuyForeman = () => {
    return this.money >= this.helpers.foremanCost;
  };

  canBuyMaster = () => {
    return this.money >= this.helpers.masterCost;
  };

  // make cig kofte
  makeCigKofte = (amount = 1) => {
    if (this.canMakeCigKofte(amount)) {
      this.material -= amount * this.neededMaterial;
      this.makedCigKofte += amount;
      this.manufacturedCigKofte += amount;
      this.currentCigKofte += amount;
    }
  };

  // buy material
  buyMaterial = () => {
    this.money -= this.materialPrice;
    this.material += 10000;
  };

  // calculate materials new price
  materialsPrice = () => {
    this.materialPrice =
      1000 + Math.floor(Math.random() * 300 - Math.random() * 300);
  };

  // demand buys cig kofte
  purchaseCigKofte = () => {
    this.currentCigKofte -= 1;
    this.money += this.cigKofteFee;
  };

  decreasePrice = () => {
    this.cigKofteFee--;
  };

  increasePrice = () => {
    this.cigKofteFee++;
  };

  // can ...
  canMakeCigKofte = (count = 1) => {
    return this.material >= this.neededMaterial * count;
  };

  canBuyMaterial = () => {
    return this.money >= this.materialPrice;
  };

  canBuyAutoBuyer = () => {
    return (
      this.money >= this.autoBuyerPrice &&
      this.makedCigKofte >= this.unlockAutoBuyer
    );
  };

  canDecrease = () => {
    return this.cigKofteFee > 1;
  };

  // update game
  update = () => {
    // helpers
    if (Date.now() - this.lastHelpersMadeCigKofteTs > 1000) {
      // errand boy
      this.makeCigKofte(this.helpers.errandBoy * this.helpers.errandBoyRate);

      // foreman
      this.makeCigKofte(this.helpers.foreman * this.helpers.foremanRate);

      // master
      this.makeCigKofte(this.helpers.master * this.helpers.masterRate);

      this.lastHelpersMadeCigKofteTs = Date.now();
    }

    // update demand
    this.updateDemand();

    if (this.currentCigKofte > 0 && Math.random() * 100 < this.demandRate) {
      this.purchaseCigKofte();
    }

    // update material cost
    if (Date.now() - this.materialPriceLastUpdated > 10000) {
      this.materialPrice =
        1000 + Math.floor(Math.random() * 300 + Math.random() * -300);
      this.materialPriceLastUpdated = Date.now();
    }

    // update cig kofte / sec
    if (Date.now() - this.lastManufacturedRateTs > 2000) {
      this.lastManufacturedRateTs = Date.now();
      this.lastManufacturedRate = Math.floor(
        (this.manufacturedCigKofte - this.lastManufacturedCount) / 2
      );
      this.lastManufacturedCount = this.manufacturedCigKofte;
    }

    // auto buyers job
    if (
      this.isAutoBuyerActive &&
      this.canBuyMaterial() &&
      this.material <=
        (this.helpers.errandBoy +
          this.helpers.foreman +
          this.helpers.master +
          1) *
          this.neededMaterial
    ) {
      this.buyMaterial();
    }
  };

  // update demand
  updateDemand = () => {
    let rate;
    if (this.cigKofteFee <= 40) {
      rate = (2 / Math.sqrt(this.cigKofteFee)) * 100;
    } else {
      const maxRate = (2 / Math.sqrt(40)) * 100;
      rate = (maxRate * (60 - this.cigKofteFee)) / 20;
    }
    this.demandRate = Math.floor(Math.max(0, rate));
  };

  // auto buyer
  buyAutoBuyer = () => {
    this.money -= this.autoBuyerPrice;
    this.hasAutoBuyer = true;
    this.isAutoBuyerActive = true;
  };

  activateAutoBuyer = () => {
    this.isAutoBuyerActive = true;
  };

  stopAutoBuyer = () => {
    this.isAutoBuyerActive = false;
  };
}
export default Game;
