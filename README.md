# url-snippets

Npm package to retrieve the page title, description, images by given url.

## Installation

Installation is easiest through npm:

`npm install url-snippets --save`

## Usage

```js
var urlSnippets = require('url-snippets');
//urlSnippets(url,optional_array,callback)
urlSnippets(url,[], function (err, data) {    
    console.log(data);
});

urlSnippets(url,['isValid', 'title', 'meta', 'p', 'img', 'html'], function (err, data) {    
    console.log(data);
});
//isValid => URL validation is true or false
//title => URL page title
//meta => URL meta description, keywords...
//p => fetch all paragraph details
//img => fetch all image sources
//html => Get page content

/* 
{ 
    url: 'url',
    isValidUrl: true,
    title: '...',
    meta: 
    { 
        viewport: '...',
        author: '....',
        description: '...',
        keywords: '...' 
    },
    img: 
    [ '.....','.....' ],
    p: 
    [ '.....','.....']
}
*/
```

