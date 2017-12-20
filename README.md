I love Node.js! It’s very fast, lightweight and lets you spin up applications with just a few lines of code.
I remember reading about the Node.js callback hell and how there’s no escape from it
There’s even a website called the callbackhell.com, lol.
What’s funny is that most times I don’t even realize how messy my code is until I try to test it.
Because I have no life, I once tried to retrieve some of my gists from the Github API, reduce them to their descriptions and URLs and sort them alphabetically by their description field.
No problemo!
Here’s the mini express app



An app with 33 lines of code, amazing!Here’s the hellish route which handles the gists algorithm (jabbering)



Hell oMmmm, I’m not even going to try testing it! I may add tests if you guys like this article and decide to punish me by insisting.
But wait, there must be light at the end of the tunnel. I can’t leave my code untested! 
Could there be a way to simplify it?
What luck, it turns out functional programming and good, opinionated programming practices can help us in this endeavor!
Extractions
I don’t like the fact that our code instantiates the express route, pulls in dependencies and handles the business logic. Let’s fix this!
Voila!



Already it’s getting simplerExpress is expressing itself, while we handle our business logic in the handleGistsRoute function.



HandleGistsRoute encapsulating it’s dependenciesHandleGistsRoute results from the curried handleGistsRouteFactory which accepts a set of dependencies and returns another function, ready to receive the gistsUrl from its invoker, the Express route.
The last function returned by the factory will get called by Express with the req, res, next arguments.



Wow, this will take a while to sip in. Maybe watch this video about currying and this video about closures and higher order functions.
Notice that handleGistsRouteFactory is now a pure function, receiving all its data through parameters (easy to mock in our tests).
Unit tests use the handleGistsRouteFactory while the rest of the app uses the actual handleGists method, precompiled with its dependencies (saving us the trouble of passing them around).
Some more extractions
My critical eye tells me that we can extract the getDescription, sortByName, getNextUrlFactory, and getNextUrl functions from our handleGistsRouteFactory.



Stripped out factoryWe took quite a lot of the handleGistsRouteFactory shoulders. The function does not worry about processing and sorting gists or about knowing which URLs to access anymore. All this behavior is composed of small, pure functions.
Async await
Already our function looks great. But we can do much better. Async, await is syntactic sugar for promises, allowing us to put more emphasis on what the code does instead of how.



HandleGistsRouteFactory is now 20 lines of code, sweet! The engineer in me sees lines 34 and 35 as possible candidates for recursion. What if we could get as many gists pages as we wanted?
Over engineered recursion
If it comes natural, recursion can be a great way to do declarative programming, which IMO, is a broader paradigm which includes FP as well.



We’ve extracted the get gists logic into the async, recursive, over-engineered getGistsFactory, just because we can!
Browse the code for a minute. I think it’s easier to read and I know it’s easier to test.
Testing the beast
Without further ado, let’s test with Jest! Ooo, it rhymes!



That’s it! Every method is tested and ready for production. I used a quick and fancy method of mocking which you can read about here.
