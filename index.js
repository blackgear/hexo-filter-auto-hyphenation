var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);

function camel_case(m) {
  return m.replace(/([a-z])([A-Z])/g, "$1\u00AD$2");
}

hexo.extend.filter.register('before_post_render', function(data) {
  data.title = h.hyphenateText(camel_case(data.title));
  data.content = h.hyphenateText(camel_case(data.content));
});

function remove_hyphen(m) {
  return m.replace(/[\u200B\u00AD]/g, '');
}

function after_hyphen(m) {
  return m.replace(/<[^>]*>/g, remove_hyphen)
          .replace(/<code>[\s\S]*?<\/code>/g, remove_hyphen)
          .replace(/<pre>[\s\S]*?<\/pre>/g, remove_hyphen);
}

hexo.extend.filter.register('after_post_render', function(data) {
  data.title = after_hyphen(data.title);
  data.content = after_hyphen(data.content);
});

