import { Card } from "./Card.js";

export abstract class Zone {
  protected readonly name: string;
  protected readonly maxCapacity: number;
  protected cards: Card[];

  constructor(name: string, capacity: number) {
    this.name = name;
    this.maxCapacity = capacity;
    this.cards = [];
  }

  public getName(): string {
    return this.name;
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public addCard(card: Card): void {
    if (card.getName() === "Manager" || this.cards.length < this.maxCapacity) {
      this.cards.push(card);
    } else {
      throw new Error(
        `Failed to add card ${card.getEmployee()?.getFullName()} to ${
          this.name
        }. The zone is already at maximum capacity.`
      );
    }
  }

  public removeCard(card: Card): void {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
    } else {
      throw new Error(
        `Card ${card.getEmployee()?.getFullName()} not found in ${this.name}`
      );
    }
  }

  public getMaxCapacity(): number {
    return this.maxCapacity;
  }

  public toString(): void {
    const maxCapacity =
      this.maxCapacity === Number.MAX_SAFE_INTEGER
        ? "unlimited"
        : this.maxCapacity;
    console.log(`${this.name} (${this.getCards().length}/${maxCapacity})`);
    this.cards.forEach((card) => {
      console.log(card.toString());
    });
  }

  protected supervisorCheck(card: Card) {
    if (card.getName() === "Supervisor" && this.getCards().length < 1) {
      console.log(
        `${card
          .getEmployee()
          ?.getCard()} can access only zones with someone already inside. ${
          this.name
        } zone has ${this.getCards().length} employees inside.`
      );
      return false;
    }
    return true;
  }

  public abstract hasAccess(card: Card): boolean;
}

export class OutdoorZone extends Zone {
  constructor() {
    super("Outdoor", Number.MAX_SAFE_INTEGER);
  }

  public hasAccess(card: Card): boolean {
    return true;
  }
}

export class TransactionZone extends Zone {
  constructor() {
    super("Transaction", 7);
  }

  public hasAccess(card: Card): boolean {
    const validCardNames = new Set([
      "Manager",
      "SafeEmployee",
      "Operator",
      "Trader",
      "Supervisor",
    ]);
    return this.supervisorCheck(card)
      ? validCardNames.has(card.getName())
      : false;
  }
}

export class OperationZone extends Zone {
  constructor() {
    super("Operation", 5);
  }

  public hasAccess(card: Card): boolean {
    const validCardNames = new Set([
      "Manager",
      "SafeEmployee",
      "Operator",
      "Supervisor",
    ]);
    return this.supervisorCheck(card)
      ? validCardNames.has(card.getName())
      : false;
  }
}

export class SafeZone extends Zone {
  constructor() {
    super("Safe", 2);
  }

  public hasAccess(card: Card): boolean {
    const validCardNames = new Set(["Manager", "SafeEmployee", "Supervisor"]);
    return this.supervisorCheck(card)
      ? validCardNames.has(card.getName())
      : false;
  }
}

export class Door {
  private readonly id: number;
  private readonly from: Zone;
  private readonly to: Zone;

  constructor(id: number, from: Zone, to: Zone) {
    this.id = id;
    this.from = from;
    this.to = to;
  }

  public getZoneTo(): Zone {
    return this.to;
  }

  public getZoneFrom(): Zone {
    return this.from;
  }

  public getId(): number {
    return this.id;
  }

  public transferCard(card: Card, zone: Zone): void {
    if (
      this.to.getName() === zone.getName() &&
      this.to.hasAccess(card) &&
      this.from.getCards().indexOf(card) != -1
    ) {
      this.transferCardBetweenZones(card, this.from, this.to);
    } else {
      console.warn(
        `${card.getName()} doesn't have access to ${zone.getName()} through doors ${this.getId()}.`
      );
      throw new Error(`Can't process this transfer.`);
    }
  }

  private transferCardBetweenZones(
    card: Card,
    fromZone: Zone,
    toZone: Zone
  ): void {
    fromZone.removeCard(card);
    toZone.addCard(card);
  }
}
