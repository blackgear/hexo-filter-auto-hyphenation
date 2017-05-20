var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);

function undo_hyphen(m) {
  return m.replace(/[\u200B\u00AD]/g, '');
}

function hyphenate_text(m) {
  return h.hyphenateText(m.replace(/([a-z])([A-Z])/g, "$1\u00AD$2")
                          .replace(/(\w)(\\?[\_\-])(\w)/g, "$1\u200B$2\u200B$3"))
          .replace(/<[^>\r\n]*?>/g, undo_hyphen)
          .replace(/\{%[^\}\r\n]*?%\}/g, undo_hyphen)
          .replace(/(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g, undo_hyphen);
}

function hyphenate_metadata(m) {
  m.data = m.data.map(function(d) {
      d.name = hyphenate_text(d.name)
      return d
  });
}

function after_hyphen(m) {
  return m.replace(/<head>[\s\S]*?<\/head>/g, undo_hyphen)
          .replace(/<code>[\s\S]*?<\/code>/g, undo_hyphen)
          .replace(/<pre>[\s\S]*?<\/pre>/g, undo_hyphen);
}

hexo.extend.filter.register('template_locals', function(locals){
  if (locals.page.categories) {
    hyphenate_metadata(locals.page.categories)
  }
  if (locals.page.tags) {
    hyphenate_metadata(locals.page.tags)
  }
  return locals;
});

hexo.extend.filter.register('before_post_render', function(data) {
  data.title = hyphenate_text(data.title);
  data.content = hyphenate_text(data.content);
});

hexo.extend.filter.register('after_post_render', function(data) {
  data.title = after_hyphen(data.title);
  data.content = after_hyphen(data.content);
});
