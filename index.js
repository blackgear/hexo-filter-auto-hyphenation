var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);

hexo.extend.filter.register('before_post_render', function(data) {
  data.title = h.hyphenateText(data.title);
  data.content = h.hyphenateText(data.content);
});

function remove_hyphen(m) {
  return m.replace(/[\u200B\u00AD]/g, '');
}

function after_hyphen(m) {
  return m.replace(/<[^>]*>/g, remove_hyphen)
          .replace(/<table>[\s\S]*?<\/table>/g, remove_hyphen)
          .replace(/<code>[\s\S]*?<\/code>/g, remove_hyphen)
          .replace(/<pre>[\s\S]*?<\/pre>/g, remove_hyphen);
}

hexo.extend.filter.register('after_post_render', function(data) {
  data.title = after_hyphen(data.title);
  data.content = after_hyphen(data.content);
});

