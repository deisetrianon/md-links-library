const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const getLinksFromMd = require("../index");

describe("getLinksFromMd", () => {
  context ("For empty markdowns", () => {
    it ("should throw a New Error", () => {
      expect(() => getLinksFromMd('')).to.throw('The markdown is empty.');
    })
  })

  describe("For non-empty markdowns", () => {
    context("When the markdown is a number", () => {
      it ("should throw a New Error", () => {
        expect(() => getLinksFromMd(5)).to.throw('The markdown is a number.');
      })
    })

    context("When the markdown is a string without links", () => {
      it ("should return an empty array", () => {
        expect(getLinksFromMd('Markdown without links')).to.be.an('array').that.is.empty;
      })
    })

    context("When the markdown is a string that contains one link", () => {
      it ("should return an array of object that contains the url and the link", () => {
        expect(getLinksFromMd('Oi você quer entrar no site [google](www.google.com) ?')).to.deep.equal([ { href: 'www.google.com', text: 'google' } ]);
        expect(getLinksFromMd('[foo](http://foo.com/foo)')).to.deep.equal([ { href: 'http://foo.com/foo', text: 'foo' } ]);
        expect(getLinksFromMd('[foo](http://foo.com/)')).to.deep.equal([ { href: 'http://foo.com/', text: 'foo' } ]);
        expect(getLinksFromMd('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut [labore](https://en.wiktionary.org/wiki/labore).')).to.deep.equal([ { href: 'https://en.wiktionary.org/wiki/labore', text: 'labore' } ]);
        expect(getLinksFromMd('et [dolore](https://en.wiktionary.org/wiki/dolore) magna aliqua.')).to.deep.equal([ { href: 'https://en.wiktionary.org/wiki/dolore', text: 'dolore' } ]);
      })
    })

    context("When the markdown is a string that contains at least two different links", () => {
      it ("should return an array of objects that contains the urls and the links", () => {
        expect(getLinksFromMd('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut [labore](https://en.wiktionary.org/wiki/labore) et [dolore](https://en.wiktionary.org/wiki/dolore) magna aliqua.')).to.deep.equal(
          [ 
            { href: 'https://en.wiktionary.org/wiki/labore', text: 'labore' }, 
            { href: 'https://en.wiktionary.org/wiki/dolore', text: 'dolore' } 
          ]);
        expect(getLinksFromMd('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut [labore](https://en.wiktionary.org/wiki/labore) et [dolore](https://en.wiktionary.org/wiki/dolore) et [foo](http://foo.com) magna aliqua.')).to.deep.equal(
          [ 
            { href: 'https://en.wiktionary.org/wiki/labore', text: 'labore' }, 
            { href: 'https://en.wiktionary.org/wiki/dolore', text: 'dolore' }, 
            { href: 'http://foo.com', text: 'foo' } 
          ]);
      })
    })
  })
})