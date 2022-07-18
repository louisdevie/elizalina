# Elizalina documentation (v1.1.0)



## `elizalina.setFallback(langId)`

Sets the fallback language.

### Parameters :
- `langId` *(string)* : the id of the language (e.g. "en" or "en-US")

### Returns :
*nothing*



## `elizalina.getFallback()`

Get the current fallback language.

### Returns :
The language id *(string)*



## `elizalina.noFallback()`

Disable the fallback system.
If you are sure that everything is correctly translated, it can improve the performance of `fillDocument`.

Use `setFallback` to re-enable it.

### Returns :
*nothing*



## `elizalina.addLanguage(source, targetIds)`

Add a new translation from a JSON file. The data will only be loaded when required.

The translations files should have the following structure :
```json
{
  "key1": "Text 1",
  "key2": "Text 2",
  "key3": "Text 3"
}
```

*:information_source: notice how the last line doesn't have a comma at the end*

### Parameters :
- `source` *(string)* : the URL of the JSON file
- `targetIds` *(string* or *array of strings)* : the id(s) of the language(s) supported by that translation.

### Returns :
*nothing*



## `elizalina.loadLanguage(source, targetIds)`

Add a new translation from a JSON file, loading it instantly.

*:warning: Its use is not recommended as it can be unefficent with a lot of different translations. PLEASE USE `addLanguage` INSTEAD*

### Parameters :
- `source` *(string)* : the URL of the JSON file
- `targetIds` *(string* or *array of strings)* : the id(s) of the language(s) supported by that translation.

### Returns :
A promise that will be fulfilled when the language is loaded.



## `elizalina.loadLanguageObject(object, targetIds)`

Add a new translation from a JavaScript object.

### Parameters :
- `object` *(object)* : the translation, structured like the JSON files.
- `targetIds` *(string* or *array of strings)* : the id(s) of the language(s) supported by that translation.

### Returns :
*nothing*



## `elizalina.isAvailable(langId)`

Check if one of the translations added supports that language.  

### Parameters :
- `langId` *(string)* : the id of the language

### Returns :
`true` if the language is supported and `false` otherwise *(boolean)*



## `elizalina.fillDocument(langId)`

Fill the HTML tags which have the "elz" class with the corresponding text.

This is the core of the translation system.
If `langId` is not specified, the first language of the navigator that has a translation
available will be used.

Any HTML tag (yes, you can translate the title of the page) with classes `elz` and `_some_key` will be filled
with the text matching "some_key" (notice how the underscore is removed).

**All the content** inside the tag will be replaced by the translation.
If some part of the text needs to be in a tag (like `<em>` or `<a>` tags),
you will need to split the content into multiple tags using `<span>`s for the normal text :

```html
<div>ref
  <span class="elz _text_before_link"></span>
  <a class="elz _link" href="#ref"></a>
  <span class="elz _text_after_link"></span>
</div>
```

In addition, the `lang` attribute of the document is set to the language used.

### Parameters :
- `langId` *(string, optional)* : the id of the language to fill the document with

### Returns :
A promise that fulfills when all the text has been written.
