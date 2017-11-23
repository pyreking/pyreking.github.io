# Copyright (c) 2017 Austin Guiney
# MIT Licensed

require 'sanitize'
require 'obscenity'

module Jekyll
  module CommentFilter
    def whitelist(html)
    Sanitize.fragment(html, elements:['strong','em', 'del', 'blockquote', 'code', "ul", 'li'])
    end
    def censor(html)
    Obscenity.config.whitelist = ["genocide", "ass", "nipple", "aids", "crap", "as$", "suicide", "pimp"]
    Obscenity.replacement(:stars).sanitize(html)
    end
  end
end
    
Liquid::Template.register_filter(Jekyll::CommentFilter)
