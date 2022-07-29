<h1><img src="elizalina.svg" height="100px"></h1>

Client-side JavaScript translation utility

## Features

* Automatic user language detection
* Fallback system if a translation is incomplete
* ... and that's about it

## Compatibility

Should work with :
* Chrome : 55+ (103 on mobile)
* Edge : 15+
* Safari : 11+
* Firefox : 52+ (101 on mobile)
* Opera : 42+ (64 on mobile)
* *IE is not supported*

## Setup

### Hosting the script yourself

Download the [latest minified version](https://github.com/louisdevie/elizalina/releases/download/v1.1.1/elizalina.min.js)
and add it to the static resources of your site, then include it in the head of your pages :

```html
<script type="text/javascript" src="static/elizalina.min.js"></script>
```

### Getting the script from a CDN

Alternatively, you can get the script from [jsDelivr](https://jsdelivr.com) :

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/louisdevie/elizalina@1.1.1/elizalina.min.js"></script>
```


## Usage

After the document is loaded (you can have a script overriding `window.onload` or embbeded at the end of the body), execute the following :

```js
elizalina.addLanguage("static/english.json", "en");
elizalina.addLanguage("static/french.json", "fr");
elizalina.addLanguage("static/german.json", "de");
// ... add the languages you want
elizalina.fillDocument();
```

The JSON files must have the following structure :

```json
{
  "key1": "content",
  "key2": "content",
  "key3": "content"
}
```

Then, all the html tags will classes `elz` and `_my_key` will have their content replaced by the entry matching "my_key" (notice how the leading underscore is necessary but trimmed afterwards).

### Fully working example

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/louisdevie/elizalina@1.1.1/elizalina.min.js"></script>
</head>
<body>
  <span class="elz _example">...</example>
  
  <script>
    // we load the language resource manually so it's embedded
    elizalina.loadLanguageObject({"example": "Hello, World!"}, "en");
    // force the page to be in english
    elizalina.fillDocument("en");
  </script>
</body>
</html>
```

See the [documentation](DOC.md) for more details.


## License

Elizalina is licensed under the [MIT License](https://github.com/louisdevie/elizalina/blob/main/LICENSE). **The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.**
