export class Employee {
  private readonly name: string;
  private readonly surname: string;
  private card?: Card;

  constructor(name: string, surname: string, card?: Card) {
    this.name = name;
    this.surname = surname;
    this.card = card;
    this.card?.setEmployee(this);
  }

  getFullName(): string {
    return `${this.name} ${this.surname}`;
  }

  getCard(): Card | undefined {
    return this.card;
  }

  setCard(card: Card): void {
    if (!this.card) {
      this.card = card;
      this.card.setEmployee(this);
    } else {
      throw new Error(`${this.getFullName()} already has a card assigned`);
    }
  }
}

export class Card {
  private readonly id: number;
  private readonly cardType: CardType;
  private employee?: Employee;

  constructor(id: number, cardType: CardType, employee?: Employee) {
    if (!cardType.isIdValid(id)) throw new Error(`Invalid card ID ${id}`);

    this.id = id;
    this.cardType = cardType;
    this.employee = employee;

    if (employee) employee.setCard(this);
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.cardType.getName();
  }

  public getIdRange(): IdRange {
    return this.cardType.getIdRange();
  }

  public getEmployee(): Employee | undefined {
    return this.employee;
  }

  public setEmployee(employee: Employee): void {
    this.employee = employee;
  }

  public removeEmployee(): void {
    this.employee = undefined;
  }

  public toString() {
    return `${this.employee?.getFullName()}, ${this.cardType.getName()}(${
      this.id
    })`;
  }
}

export class CardType {
  private readonly positionName: string;
  private readonly idRange: IdRange;

  constructor(positionName: string, idRange: IdRange) {
    this.positionName = positionName;
    this.idRange = idRange;
  }

  public getName(): string {
    return this.positionName;
  }

  public getIdRange(): IdRange {
    return this.idRange;
  }

  public isIdValid(id: number): boolean {
    return id >= this.idRange.getFirst() && id <= this.idRange.getLast();
  }
}

export class ManagerCardType extends CardType {
  constructor() {
    super("Manager", new IdRange(1, 100));
  }
}

export class SafeEmployeeCardType extends CardType {
  constructor() {
    super("SafeEmployee", new IdRange(101, 200));
  }
}

export class OperatorCardType extends CardType {
  constructor() {
    super("Operator", new IdRange(201, 500));
  }
}

export class TraderCardType extends CardType {
  constructor() {
    super("Trader", new IdRange(501, 999));
  }
}

export class SupervisorCardType extends CardType {
  constructor() {
    super("Supervisor", new IdRange(1000, Number.MAX_SAFE_INTEGER));
  }
}

export class IdRange {
  private readonly first: number;
  private readonly last: number;

  constructor(first: number, last: number) {
    this.first = first;
    this.last = last;
  }

  public getFirst(): number {
    return this.first;
  }

  public getLast(): number {
    return this.last;
  }
}
