# hexo-filter-auto-hyphenation

Add hyphenation for English words with [hypher](https://github.com/bramstein/hypher)

U+00AD (SHY): an invisible, "soft" hyphen. This character is not rendered visibly; instead, it suggests a place where the browser might choose to break the word if necessary. In HTML, you can use `&shy;` to insert a soft hyphen.

This plugin add U+00AD to all of the English words in your post title and content, so your browser will auto break the word and display a hyphen to make your post more harmony.

Why not use CSS3 auto-hyphen?

I use it for a blog written in Chinese with minor English words, and I should set the lang to zh-CN which disable the way to use CSS3 auto-hyphen.

Many Chinese website use `word-break: break-all;` to deal with the river and gap in the paragraph, but this plugin provides a better way.

## Install

``` bash
$ npm install hexo-filter-auto-hyphenation --save
```

- Hexo 3: >= 0.2
- Hexo 2: 0.1.x

## Details

This filter only hyphenate the text, it won't hyphenate things in `<code></code>` and `<pre></pre>`.
