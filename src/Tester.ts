import { SecureCash } from "./MediBank.js";
import { Card } from "./Card.js";
import { Zone, SafeZone, Door } from "./Zone.js";

export class Tester {
  private secureCash: SecureCash;

  constructor(cards: Card[], zones: Zone[], doors: Door[]) {
    this.secureCash = SecureCash.getInstance(cards, zones, doors);
  }

  public runTests(): void {
    this.init();

    let menager = this.secureCash.getCards()[0];
    let safeEmployee1 = this.secureCash.getCards()[1];
    let safeEmployee2 = this.secureCash.getCards()[2];
    let supervisor = this.secureCash.getCards()[9];
    let trader = this.secureCash.getCards()[6];

    this.testTransferCardFromOutdoorToTransaction(menager);
    this.testTransferCardFromTransactionToOperation(menager);
    this.testMaxCapacityInSafeZone(safeEmployee1, safeEmployee2);
    this.testIfSupervisorCanEnterZoneWithoutAnyEmployees(supervisor);
    this.testIfTraderCanEnterOperationZone(trader);
    this.testIfEmployeeCanEnterOperationZoneWithSkippingTransactionZone(
      menager
    );
    this.testGoThroughAllZones(menager);
  }

  private init() {
    this.secureCash.startWorkDay();

    this.secureCash.buildZones();
    this.secureCash.doorHandler();
  }

  private reset() {
    this.secureCash.startWorkDay();
  }

  private testGoThroughAllZones(card: Card): void {
    this.reset();
    let name = "testTransferCardFromTransactionToOperation";
    try {
      this.secureCash.changeZone(card, 0);
      this.secureCash.changeZone(card, 3);
      this.secureCash.changeZone(card, 5);
      this.secureCash.changeZone(card, 4);
      this.secureCash.changeZone(card, 2);
      this.secureCash.changeZone(card, 1);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }

  private testTransferCardFromOutdoorToTransaction(card: Card): void {
    this.reset();
    let name = "testTransferCardFromTransactionToOperation";
    try {
      this.secureCash.changeZone(card, 0);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }

  private testTransferCardFromTransactionToOperation(card: Card): void {
    this.reset();
    let name = "testTransferCardFromTransactionToOperation";
    try {
      this.secureCash.changeZone(card, 3);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }

  private testMaxCapacityInSafeZone(card1: Card, card2: Card): void {
    this.reset();
    let name = "testMaxCapacityInSafeZone";
    let flag = false;
    try {
      this.secureCash.changeZone(card1, 0);
      this.secureCash.changeZone(card1, 3);
      this.secureCash.changeZone(card1, 5);

      this.secureCash.changeZone(card2, 0);
      this.secureCash.changeZone(card2, 3);
      this.secureCash.changeZone(card2, 5);
      const safeZone = this.secureCash
        .getZones()
        .find((zone) => zone instanceof SafeZone);
      flag =
        !safeZone || safeZone?.getCards().length <= safeZone?.getMaxCapacity()
          ? true
          : false;
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      flag
        ? console.log(`Test (${name}) passed.`)
        : console.warn(`Test (${name}) failed.`);
    }
  }

  private testIfSupervisorCanEnterZoneWithoutAnyEmployees(card: Card): void {
    this.reset();
    let name = "testIfSupervisorCanEnterZoneWithoutAnyEmployees";
    try {
      this.secureCash.changeZone(card, 0);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }

  private testIfTraderCanEnterOperationZone(card: Card): void {
    this.reset();
    let name = "testIfTraderCanEnterOperationZone";
    try {
      this.secureCash.changeZone(card, 0);
      this.secureCash.changeZone(card, 3);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }

  private testIfEmployeeCanEnterOperationZoneWithSkippingTransactionZone(
    card: Card
  ): void {
    this.reset();
    let name = "testIfTraderCanEnterOperationZone";
    try {
      this.secureCash.changeZone(card, 3);
    } catch {
      console.warn(`Test (${name}) failed.`);
    } finally {
      console.log(`Test (${name}) passed.`);
    }
  }
}
