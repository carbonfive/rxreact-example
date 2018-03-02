# RxReact Example

This is a sample demonstration of how to use RxReact in a real world context. It is a very simple Typescript app - it reads from a [well known JSON API](https://jsonplaceholder.typicode.com) and offers some simple user interactions.

### Defining Your Domain

Before we even begin building our app, it's useful to define the types of data encompassed by your application domain. In this case, you can find these types in [domain.ts](src/domain.ts).

### Building A Signal Graph

Typically we place most of our observables in a Signal Graph that represents data relationships in our application. A good place to start in a Typescript application like this one is to define type aliases for the types signals we'll produce. You'll find this in [signalTypes.ts](src/signalGraph/signalTypes.ts). Next we need to define how our signals are produced. While we can simply define them inline, if we create factory functions that return the signals based on the other signals they depend on, they'll be easier to test. You'll find these factories in [signalFactories.ts](src/signalGraph/signalFactories.ts). This is where the bulk of the logic of the signal graph lives. Finally, we instantiate all our signals with our signal factories for use with RxReact in [signalGraph.ts](src/signalGraph/signalGraph.ts).

### Speaking to an HTTP layer

Most frontend applications make AJAX calls to a backend server. In an Rx application, it's helpful to define a layer than translates HTTP calls to Obervable responses. You can see how we construct this layer in [api.ts](src/http/api.ts).

## Connecting to Components

The last step is to connect your signal graph to components. Fortunately, with RxReact, this is pretty easy! You can see two examples of connected components in Users.tsx and Posts.tsx. Moreover, look at how the signal graph drives the behavior of these components:

* Initially, we just see a user list, rendered by the Users component. This is loaded immediately from the server
* When you click on a user the selectUser$ signal emits
* This causes the selectedUser$ signal to become populated, so details about the selected user appear in the User component
* It also cause the app to fetch posts and their comments for that user through a series of HTTP calls
* This populates the activePostsWithComments$ signal

### Testing: Unit Test Your Signals & Components, Functional Test Your App
