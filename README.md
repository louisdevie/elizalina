<img src="elizalina.svg" height="100px">

Client-side JavaScript translation utility

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

Download the [latest minified version](https://github.com/louisdevie/elizalina/releases/download/v2.0.0/elizalina.min.js)
and add it to the static resources of your site, then include it in the head of your pages :

```html
<script type="text/javascript" src="static/elizalina.min.js"></script>
```

### Getting the script from a CDN

Alternatively, you can get the script from [jsDelivr](https://jsdelivr.com) :

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/louisdevie/elizalina@2.0.0/elizalina.min.js"></script>
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

### Working example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/louisdevie/elizalina@2.0.0/elizalina.min.js"></script>
</head>
<body>
  <span class="elz _example">It works!</span>
  
  <script>
    // embed the translation in the document
    elizalina.loadLanguageObject({"example": "Es klappt!"}, "de");
    // force the page to be in german
    elizalina.fillDocument("de");
  </script>
</body>
</html>
```

See the [documentation](DOC.md) for more details.


## License

Elizalina is licensed under the [MIT License](https://github.com/louisdevie/elizalina/blob/main/LICENSE). **The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.**
