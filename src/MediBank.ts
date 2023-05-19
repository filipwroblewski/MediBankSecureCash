import { Card } from "./Card.js";
import {
  Zone,
  OutdoorZone,
  TransactionZone,
  OperationZone,
  SafeZone,
  Door,
} from "./Zone.js";

export class SecureCash {
  private static instance: SecureCash;
  private cards: Card[];
  private doors: Door[];
  private zones: Zone[];

  private constructor(cards: Card[], zones: Zone[], doors: Door[]) {
    this.cards = cards;
    this.zones = zones;
    this.doors = doors;
  }

  public static getInstance(
    cards: Card[],
    zones: Zone[],
    doors: Door[]
  ): SecureCash {
    if (!SecureCash.instance) {
      SecureCash.instance = new SecureCash(cards, zones, doors);
    }
    return SecureCash.instance;
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getDoors(): Door[] {
    return this.doors;
  }

  public getZones(): Zone[] {
    return this.zones;
  }

  public showCards(): void {
    this.cards.forEach((card) => {
      console.log(card.toString());
    });
  }

  public showDoors(): void {
    this.doors.forEach((door) => {
      console.log(door);
    });
  }

  public showZones(): void {
    this.zones.forEach((zone) => {
      console.log(zone.toString());
    });
  }

  public startWorkDay(): void {
    // add people to main zone (outdoor)
    this.zones.forEach((zone) => {
      if (zone instanceof OutdoorZone) {
        this.cards.forEach((card) => {
          zone.addCard(card);
        });
      }
    });
  }

  public changeZone(card: Card, doorId: number): void {
    const door = this.doors[doorId];
    door.transferCard(card, door.getZoneTo());
    console.log(
      `${card.toString()} has changed zones from ${door
        .getZoneFrom()
        .getName()} to ${door.getZoneTo().getName()}`
    );
  }

  public buildZones() {
    const buildingDiv = document.getElementById("building");
    if (buildingDiv) {
      buildingDiv.classList.add(
        "row",
        "justify-content-center",
        "align-items-center"
      );
    }

    let buildingContent = `
                <div class="col-8 border border-2 rounded-3">
                    <div class="row">
                        <div class="col-5 text-center border-end border-0">
                            <h3 class="zoneName fw-bold">${SafeZone.name}</h3>
                            <div class="text-end">
                                <button id="door4" class="btn btn-secondary door-button"><i class="bi bi-arrow-right"></i></button>
                            </div>
                            <div class="employees" id="Safe"></div>
                        </div>
                        <div class="col-7 text-center">
                            <div class="row">
                                <div class="col-12 border-bottom border-0">
                                    <h3 class="zoneName fw-bold">${OperationZone.name}</h3>
                                    <div class="employees" id="Operation"></div>
                                    <div class="text-start">
                                        <button id="door5" class="btn btn-secondary door-button"><i class="bi bi-arrow-left"></i></button>
                                    </div>
                                    <div class="text-start">
                                        <button id="door2" class="btn btn-secondary door-button"><i class="bi bi-arrow-down"></i></button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="text-end">
                                        <button id="door3" class="btn btn-secondary door-button"><i class="bi bi-arrow-up"></i></button>
                                    </div>
                                    <h3 class="zoneName fw-bold">${TransactionZone.name}</h3>
                                    <div class="employees" id="Transaction"></div>
                                    <div class="text-end">
                                        <button id="door1" class="btn btn-secondary door-button"><i class="bi bi-arrow-down"></i></button>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-center border-top">
                            <div class="text-middle">
                                <button id="door0" class="btn btn-secondary door-button"><i class="bi bi-arrow-up"></i></button>
                            </div>
                            <h3 class="zoneName fw-bold">${OutdoorZone.name}</h3>
                            <div class="employees" id="Outdoor"></div>
                        </div>
                    </div>
                </div>
    `;

    const buildingElement = document.querySelector("#building") as HTMLElement;
    buildingElement && (buildingElement.innerHTML = buildingContent);
  }

  public doorHandler() {
    const doorButtons = document.querySelectorAll(".door-button");

    doorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const btnId = Number(button.id.replace("door", ""));
        const door = this.doors.find((door) => door.getId() === btnId);

        if (door?.getId() === Number(btnId)) {
          const zoneName = door.getZoneFrom().getName();
          const selectElement = document.querySelector(
            `select[name="${zoneName}"]`
          ) as HTMLSelectElement;
          const selectedCardId = Number(
            selectElement.options[selectElement.selectedIndex].id
          );

          const card = this.cards.find(
            (card) => card.getId() === selectedCardId
          );
          if (card) {
            this.changeZone(card, door.getId());
            this.displayCards();
          }
        }
      });
    });
  }

  public displayCards() {
    this.zones.forEach((zone) => {
      const employeesDiv = document.getElementById(
        zone.getName()
      ) as HTMLDivElement;
      employeesDiv.innerHTML = "";

      const select = document.createElement("select");
      select.name = zone.getName();
      select.classList.add("form-select");
      zone.getCards().forEach((card) => {
        const option = document.createElement("option");
        option.textContent = card.toString();
        option.id = card.getId().toString();
        select.appendChild(option);
      });
      employeesDiv.appendChild(select);
    });
  }
}
