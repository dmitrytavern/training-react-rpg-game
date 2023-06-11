# React RPG Game

This project from 2021 is a test project. I wanted to implement an rgp system that had all the standard features and mechanics. Perhaps some of the developments can be used in the future.

At the moment, the mechanics of the game removed, since the project was rewritten 3 times if not more. Instead of mechanics of the game, written code of the core program, with tests. These are the classes that were used as a foundation on which further functionality will be developed. For example:

- **di** - this is the layer above the inversify library that implements dependency injection. This was taken from Angular
- **Factory** - is an abstract class that has functionality for saving game objects. Previously, it was a good idea, but now I would split it up into an additional Store class.
- **Model** - as I recall, this is an abstract class that defines what values will be available to controllers, and it also implements reactivity. That is, if one value from one model depends on the value of the second model, then when you change the first, the second will also change.
- **Service** - as far as I remember, this is the class where API calls are implemented.

All hidden registrations are stuffed into TypeScript decorators.

## Previously

Earlier in the history of git, there were other versions of the application that even worked. That is, inventory, buffs, effects, equipment, crafting, health, and energy worked there. There was also quest logic.

See: 7e0d7abddc9da2d201d02d6aa98dda3aa4b12daa

## Player

Main class. Contains player's parameters and mechanics.

### Parameters:

- Level
- Health
- Energy
- Damage
- Defense

### Mechanics:

- Balance
- Favorites
- Inventory
- Equipment
- Characteristic
