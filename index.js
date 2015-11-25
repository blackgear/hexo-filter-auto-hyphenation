var Hypher = require('hypher'),
    english = require('hyphenation.en-us'),
    h = new Hypher(english);

function hyphenate(m) {
  return h.hyphenateText(m.replace(/([a-z])([A-Z])/g, "$1\u00AD$2"));
}

function meta_hyphen(m) {
  m.data = m.data.map(function(d) {
      d.name = hyphenate(d.name)
      return d
  });
}

hexo.extend.filter.register('template_locals', function(locals){
  if (locals.page.categories) {
    meta_hyphen(locals.page.categories)
  }
  if (locals.page.tags) {
    meta_hyphen(locals.page.tags)
  }
  return locals;
});

hexo.extend.filter.register('before_post_render', function(data) {
  data.title = hyphenate(data.title);
  data.content = hyphenate(data.content);
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
