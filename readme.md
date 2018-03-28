# Rosmaro-cli - WIP

Remove the tedious boilerplating of rosmaro handlers, use `Rosmaro-cli` to cut down on boilerplating managing and naming your handler from the [graph.json](https://rosmaro.js.org/doc/#graphs-graphs) you generated using [rosmaro visual editor](https://rosmaro.js.org/doc/#graphs-the-rosmaro-editor)

## start rosmaro project 

### install
```
    npm i -g rosmaro-cli
```
### init
```javascript
    rosmaro init <project-name>
```
Get rosmaro project started with `rosmaro-cli` init command.
### Start with specific framwork/library
```javascript
    rosmaro init <project-name> --framwork <framwork>
```
Supported frameworks - `not supported yet workin' on it`
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
### Update - Name TBD

Harness `rosmaro-cli` Update command for when you have a 

```javascript
    rosmaro update
```