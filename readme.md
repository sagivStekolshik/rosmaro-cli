# Rosmaro-cli (WIP)

Remove the tedious boilerplating of rosmaro handlers, use `Rosmaro-cli` to cut down on boilerplating managing and naming your handler from the [graph.json](https://rosmaro.js.org/doc/#graphs-graphs) you generated using [rosmaro visual editor](https://rosmaro.js.org/doc/#graphs-the-rosmaro-editor) 

### install localy
```
    npm i -save-dev rosmaro-cli
```

### install
```
    npm i -g rosmaro-cli
```

In case you download it localy to run rosmaro-cli you need to call `node_modules/.bin/rosmaro` instead of just `rosmaro`


## Update - Name TBD

Harness `rosmaro-cli` Update command for when you have a new `graph` ready and need to make all that boilerplating of handlers

```javascript
    rosmaro update
```
Update command will generate handlers template with the node name as the file name in handlers folder, add all arrows as a camelCased field to the handler json and include the handler in all.js file

### example of handler
```javascript
export default ({ ctx,thisModel,thisModelNode }) => ({
  atePizza: () => ({
    arrow: "ate pizza"
  }),
  render: () => {}
})
```
## start rosmaro project

### init
```javascript
    rosmaro init <project-name>
```
Get rosmaro project started with `rosmaro-cli` init command.
### Start with specific framwork/library
```javascript
    rosmaro init <project-name> -f <framwork>
```
Supported frameworks

* React - _Soon_
* AngularJS - _Soon_
* Angular - _Soon_
* VueJS - _Soon_
* Lit-HTML - _Soon_
 
utilize `--url` command and add a custom graph from the web auto generate relevent handlers template with the choosen framework/library.
no code is written tho

example
```javascript
    rosmaro init <project-name> -f [framwork] -u "http://github.com/somethigsomethingdarkside"
```
