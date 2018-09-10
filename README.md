# Apep-md

Simple helpers for generating markdown with [Apep Javascript text generation library][apep].

## Usage

```sh
$ npm install apep-md
```

## Headers and Context
    var pep = require("apep");
    var myText = "My Text";
    var lineBreak = pep.str("\n");
    
    //heading one
    var headingOne = pep.h1(myText) === "# " + myText + lineBreak;
    var headingTwo = pep.h2(myText) === "## " + myText + lineBreak;
    var headingThree = pep.h2(myText) === "### " + myText + lineBreak;
    var headingFour = pep.h2(myText) === "#### " + myText + lineBreak;
    var headingFive = pep.h2(myText) === "##### " + myText + lineBreak;
    var headingSix = pep.h2(myText) === "###### " + myText + lineBreak;
    
## Styles
    //styles
    var italicText = pep.italic(myText) === "*" + myText + "*";
    var boldText = pep.bold(myText) === "**" + myText + "**";
    var strikeThru = pep.strike(myText) === "~~" + myText + "~~";


## Where To Get Apep
[apep]: https://github.com/mattbierner/apep
