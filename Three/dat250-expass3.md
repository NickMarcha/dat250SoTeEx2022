## Lab Report: Software Technology Experiment 3: MongoDB, DAT250:

Written by `Nicolas M Mjøs | h578011`

## Technical Problems

None so far.

## Validation of installation package:

![Validation](./images/HashValidation.png)

## Experiment 1

### insert

![InsertOne.png](./images/InsertOne.png)
![InsertTwo.png](./images/InsertTwo.png)

### query

![InsertOne.png](./images/InsertOne.png)
![InsertTwo.png](./images/InsertTwo.png)
![QueryFind.png](./images/QueryFind.png)
![QueryFindLessThanOr.png](./images/QueryFindLessThanOr.png)
![QueryFindStatusD.png](./images/QueryFindStatusD.png)
![QueryFindStatusDandA.png](./images/QueryFindStatusDandA.png)
![QueryFindStatusOrAnd.png](./images/QueryFindStatusOrAnd.png)

### update

![UpdateItem.png](./images/UpdateItem.png)
![UpdateManyAndReplace.png](./images/UpdateManyAndReplace.png)

### remove

![Delete.png](./images/Delete.png)

### bulk write operations

![Bulk.png](./images/Bulk.png)

## Experiment 2

#### Initial Database:

![InitialDB.png](./images/Experiment2InitialDB.png)

### Total Price Per Customer

#### Map Reduce Example:

![Experiment2MapReduceExample.png](./images/Experiment2MapReduceExample.png)

#### Aggregation Alternative:

![Experiment2AggAlternativeExample.png](./images/Experiment2AggAlternativeExample.png)

### Calculate Order and Total Quantity with Average Quantity Per Item

#### Map Reduce Example 2:

![Experiment2MapReduceExample2.png](./images/Experiment2MapReduceExample2.png)

#### Aggregation Alternative 2:

![Experiment2AggAlternativeExample2.png](./images/Experiment2AggAlternativeExample2.png)

### Custom: calculate average order total per customer

Aim:\
return customers with total amount of orders, customerPriceTotal and mean average order totals.\
Use:\
This function can be useful to analyse customer behavour to for example create rewards programs that encourage customers to spend a little bit more.

Alle mongosh queries are in this [file](./customquery.js).

Result of query:
![](./images/CustomMapReduce.png)
