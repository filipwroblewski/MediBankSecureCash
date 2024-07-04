# MediBankSecureCash

## SecureCash Access Control

### General Description

The company SecureCash manages several banks in Poland and is mainly responsible for handling large amounts of cash.

Each SecureCash center contains several Zones. All centers require a system that controls access to their zones and tracks individuals in each zone for security reasons. Access to a zone is through a door, and to pass through the door, an Access Card is required.

Each door connects a source zone to a target zone and operates in one direction only (like a turnstile). An employee inserts the card into the card reader at the Door, and the system reads the card information. The system then checks whether the card can pass through the door to the target zone.

A card can only pass through the Door if it meets the entry conditions. If these conditions are met, the system opens the Door and grants access to the target zone. It also updates its records to show that the Card (and the employee using it) has left the source zone and entered the target zone.

### Zones

Each Zone has a name and a maximum number of employees who can be present in the Zone simultaneously. Each Zone must maintain a list of all cards/employees currently in the Zone. These lists are updated every time employees enter or leave the zone, and it should always be possible to determine how many employees are in the zone and who they are.

In general, all SecureCash centers have the following zones:

1. Secured Zone

   - accessible only to `Safe` employees
   - maximum capacity: `2` employees

2. Operational Zone

   - accessible to `Safe` and `Operator` employees
   - maximum capacity: `5` employees

3. Transaction Zone

   - accessible to `all SecureCash` employees
   - maximum capacity: `7` employees

4. External Zone
   - default zone for `all employees` who are not currently at work
   - maximum capacity: `unlimited`

### Cards

A center employee can have only one card. All cards contain a card number, first and last name. Employees cannot use the cards of one center in another center. Below are the different types of cards for SecureCash employees.

1. Managers
   - Have access to `all zones` without any restrictions.
   - Card numbers `less than 100`
2. Safe Employees
   - Have access to the `Secured Zone`, `Operational Zone`, and `Transaction Zone`.
   - Card numbers `from 100 to 200`
3. Operator Employees
   - Have access to the `Operational Zone` and `Transaction Zone`.
   - Card numbers `from 201 to 500`
4. Trader Employees
   - Have access to the `Transaction Zone`
   - Card numbers `501 to 999`
5. Custodians
   - Have `access to all Zones`, provided that **at least one other employee** who is not a custodian **is present** in the Zone.
   - Card numbers `from 1000 upwards`

### Instructions

1. Create a new MediBank SecureCash center that contains classes/objects representing the following Zones and Doors in the following way:

<table border="1" style="border-collapse: collapse; text-align: center;" width="100%">
  <tr>
    <td rowspan="2">
        <br>
        <table border="1" align="right">
            <tr>
                <td>Door 4 &rarr;</td>
            </tr>
             <tr>
                <td>Door 5 &larr;</td>
            </tr>
        </table>
        <b style="font-size: 24px">Secured Zone</b><br>max. capacity: 2<br>
    </td>
    <td colspan="2"  style="height: 150px;">
        <br><br><br><br>
        <b style="font-size: 24px">Operational Zone</b><br>max. capacity: 5<br>
        <br><br>
        <table border="1" align="left">
            <tr>
                <td>&rarr; Door 4</td>
            </tr>
             <tr>
                <td>&larr; Door 5</td>
            </tr>
        </table>
        <table border="1" align="right" >
            <tr style="border: 1px solid transparent;">
                <td style="border-top: 1px solid transparent; border-right: 1px solid transparent; color: transparent;">.</td>
            </tr>
            <tr>
                <td>Door 2 &darr;</td>
                <td>Door 3 &uarr;</td>
            </tr>
        </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" >
        <table border="1" align="right">
            <tr>
                <td>Door 2 &darr;</td>
                <td>Door 3 &uarr;</td>
            </tr>
        </table>
        <br>
        <br>
        <b style="font-size: 24px">Transaction Zone</b><br>max. capacity: 7<br>
        <br>
        <table border="1" align="right">
            <tr>
                <td>Door 0 &uarr;</td>
                <td>Door 1 &darr;</td>
            </tr>
        </table>
    </td>
  </tr>
  <tr>
    <td colspan="3">
        <table border="1" align="right">
            <tr>
                <td>Door 0 &uarr;</td>
                <td>Door 1 &darr;</td>
            </tr>
        </table>
        <br><br><br>
        <b style="font-size: 24px">External Zone</b><br>max. capacity: unlimited<br>
        <br><br><br>
    </td>
  </tr>
</table>

2. Also create some of the following employee cards for the MediBank SecureCash center:

| Number | First & Last Name  | Card Type     |
| ------ | ------------------ | ------------- |
| 22     | Daniel Wieczorek   | Manager       |
| 123    | Eryk Wysocki       | Safe Employee |
| 107    | Maja Wojciechowska | Safe Employee |
| 230    | Julian Rutkowski   | Operator      |
| 412    | Patryk Adamski     | Operator      |
| 351    | Oliwia Kamińska    | Operator      |
| 665    | Oliwia Zawadzka    | Trader        |
| 725    | Szymon Zając       | Trader        |
| 1128   | Bartek Olszewski   | Custodian     |
| 1032   | Eryk Świątek       | Custodian     |

_For testing purposes, it may be necessary to invent a few other employees._

3. Create a Tester class that creates a MediBank SecureCash object. Use various methods to check if the entire system works according to the specification, e.g.

   - Move an employee card from the External zone to the Transaction zone.
   - Move a card from the Transaction zone to the Operational zone.
   - No more than 2 employees are present in the Secured zone.
   - The doors will not allow a Custodian to enter if there is no other employee in the Zone.
   - Transaction employees cannot be in the Operational zone. Etc.
   - **Important**: All test results should be displayed in the console.

4. Interaction with the system through GUI: The implementation should not only allow running tests through the terminal but also enable the user to interact with the system using a basic graphical user interface available through a browser.
   - A simple GUI can be achieved using standard HTML elements combined with some basic CSS styles and console usage. If you want to improve the appearance of your GUI, you can also include and use other external libraries/frameworks that you find helpful (Bootstrap, React, etc.)

## Project Evaluation

### Table Of Evaluation

| Requirements                                                                                       | File Names                       | Line Numbers      |
| -------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------- |
| Implementation of Cards (Managers, Safe Employees, Operators, Traders, Guards)                     | Card.ts                          | 77-127            |
| Implementation (Secured, Operational, Transactions, External)                                      | Zone.ts                          | 3-135             |
| Implementation of Doors (0 - 5)                                                                    | Zone.ts                          | 137-183           |
| Code adding a card to the zone.                                                                    | Zone.ts                          | 160-173           |
| Code checking if there are no more than 2 Safe employees in the Secure Zone.                       | Zone.ts                          | 23-25             |
| Code checking if a Manager can enter the Secure Zone even if there are already 2 employees inside. | Zone.ts                          | 23-25             |
| Code checking if a Trader can enter the Operational Zone.                                          | Zone.ts                          | 111-121           |
| Code checking if an Operational employee can enter the Secure Zone.                                | Zone.ts                          | 129-134           |
| Code checking if a Guard can enter the Zone without the presence of another employee.              | Zone.ts                          | 60-72             |
| Tester class that conducts at least 5 different tests (see Project Details, question 3)            | Tester.ts                        | 5-150             |
| Code building and controlling the system interface in the browser.                                 | index.html, main.ts, MediBank.ts | 52, 58-64, 85-194 |
| Code showing the implementation and use of at least one design pattern.                            | Main.ts, MediBank.ts             | 58, (12, 17-32)   |
