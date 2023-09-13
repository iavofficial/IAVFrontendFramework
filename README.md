# License
This project is published using the **Apache-2.0** license. It's included in this project's root.

# Requirements
- **You should install at least npm version 7.7.5 when using or enhancing the framework.**

# Purpose of the framework
Imagine developing three seperate IAV frontend applications from scratch. You will encounter several problems:
- A lack of maintainability: IAV decided to introduce a new style guide in 2022. As a consequence of this all three applications would have to be adapted. Kind of laborious and expensive, isn't it? There are many other examples for a lack of maintanability. Another example is the adaptation of imprints. Does the CEO of IAV change? You would have to adapt the imprints of all three frontend applications seperately.
- A lack of extendability: You want to add a new feature which is potentially of intrerest for all IAV frontend applications? Without a mechanism to distribute this feature centrally you will have to implement / copy and paste it several times. Futhermore, if there are necessay changes to the feature you will have to implement them in every application seperately.
- A higher risk for faults: What is the disadvantage of implementing the same functionality more than once? Every implementation process has the chance to introduce new faults. Hence, you minimze the risk for faults by implementing the feature only once and distributing it centrally.
- A lower developer experience: Does it make fun to implement the same functionality in many projects and to maintain it consequently? The answer is pretty obvious: NO!

The IAV frontend framework was created to solve these issues. To get more information take a look at the documentation which can be found [here]().