# Markdown Links Library v.1.0.7
Markdown Links Library is a JavaScript Library that can be used to extract links from Markdown texts.

### Version 1.0.7
Returns an array of objects that contains the urls and the links.

### Method
getLinksFromMd(markdown);

# Usage
### Installation
`$npm install md-links-library`

### Examples
```
$node
> let extract = require("md-links-library")
> extract("[foo](http://foo.com/foo)"); 

// [ { href: 'http://foo.com/foo', text: 'foo' } ]
```
```
$node
> let extract = require("md-links-library")
> extract("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut [labore](https://en.wiktionary.org/wiki/labore) et [dolore](https://en.wiktionary.org/wiki/dolore) et [foo](http://foo.com) magna aliqua."); 

// [ 
//   { href: 'https://en.wiktionary.org/wiki/labore', text: 'labore' },
//   { href: 'https://en.wiktionary.org/wiki/dolore', text: 'dolore' }, 
//   { href: 'http://foo.com', text: 'foo' } 
// ]
```