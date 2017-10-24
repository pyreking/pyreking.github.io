require 'sanitize'

module Jekyll
  module CommentFilter
    def whitelist(html)
    Sanitize.fragment(html, elements:['strong','em', 'del', 'blockquote', 'code', "ul", 'li'])
    end
  end
end
    
Liquid::Template.register_filter(Jekyll::CommentFilter)
