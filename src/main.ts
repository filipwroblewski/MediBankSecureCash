import { SecureCash } from "./MediBank.js";
import {
  Employee,
  Card,
  ManagerCardType,
  SafeEmployeeCardType,
  OperatorCardType,
  TraderCardType,
  SupervisorCardType,
} from "./Card.js";
import {
  Zone,
  OutdoorZone,
  TransactionZone,
  OperationZone,
  SafeZone,
  Door,
} from "./Zone.js";
import { Tester } from "./Tester.js";

const cardType = {
  MANAGER: new ManagerCardType(),
  SAFE_EMPLOYEE: new SafeEmployeeCardType(),
  OPERATOR: new OperatorCardType(),
  TRADER: new TraderCardType(),
  SUPERVISOR: new SupervisorCardType(),
};

const cards = [
  new Card(22, cardType.MANAGER, new Employee("Daniel", "Wieczorek")),
  new Card(123, cardType.SAFE_EMPLOYEE, new Employee("Eryk", "Wysocki")),
  new Card(107, cardType.SAFE_EMPLOYEE, new Employee("Maja", "Wojciechowska")),
  new Card(230, cardType.OPERATOR, new Employee("Julian", "Rutkowski")),
  new Card(412, cardType.OPERATOR, new Employee("Patryk", "Adamski")),
  new Card(351, cardType.OPERATOR, new Employee("Oliwia", "Kamińska")),
  new Card(665, cardType.TRADER, new Employee("Oliwia", "Zawadzka")),
  new Card(725, cardType.TRADER, new Employee("Szymon", "Zając")),
  new Card(1128, cardType.SUPERVISOR, new Employee("Bartek", "Olszewski")),
  new Card(1032, cardType.SUPERVISOR, new Employee("Eryk", "Świątek")),
];

const outdoorZone = new OutdoorZone();
const transactionZone = new TransactionZone();
const operationZone = new OperationZone();
const safeZone = new SafeZone();

const zones: Zone[] = [outdoorZone, transactionZone, operationZone, safeZone];

const doors: Door[] = [
  new Door(0, outdoorZone, transactionZone),
  new Door(1, transactionZone, outdoorZone),
  new Door(2, operationZone, transactionZone),
  new Door(3, transactionZone, operationZone),
  new Door(4, safeZone, operationZone),
  new Door(5, operationZone, safeZone),
];

const secureCash = SecureCash.getInstance(cards, zones, doors);

secureCash.startWorkDay();

secureCash.buildZones();
secureCash.doorHandler();
secureCash.displayCards();

// const tester = new Tester(cards, zones, doors);
// tester.runTests();
