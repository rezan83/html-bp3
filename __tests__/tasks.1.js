const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Style Tag", () => {
  it("A style tag should be present in the head of the HTML", async () => {
    //const style = await page.$("style");
    //expect(style).toBeTruthy();
    // above will pass no matter where style tag is placed, since it gets injected in the head tag once browser is spun up.
    const indexContent = fs.readFileSync("./index.html", "utf8");
    expect(indexContent).toMatch(/<\/style>\s*<\/head>/);
  });
});

describe('Paragraph styling', () => {
  it("the color of the paragraphs should be set within the style element", async () => {
    const style = await page.$eval("style", (el) => el.innerHTML);
    expect(style.replace(/ /g, "").includes("p{")).toBeTruthy();
    expect(style.replace(/ /g, "").includes("color:")).toBeTruthy();
  });
});
