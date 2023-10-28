import { JSDOM } from "jsdom";

const jsdom = new JSDOM(`<body></body>`, { url: "http://jsdom" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;

// const { JSDOM } = jsdom;

// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// console.log(dom.window.document.querySelector("p").textContent);

// import { JSDOM } from "jsdom";
// import { describe, it } from "mocha";

// // jsdom
// const jsdom = new JSDOM(`<body>
// <main id="app"></main>
// </body>`);

// global.window = jsdom.window;
// global.document = jsdom.window.document;

// // mocha
// global.describe = describe;
// global.it = it;
