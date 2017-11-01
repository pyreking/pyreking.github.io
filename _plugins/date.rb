# Copyright (c) 2012 Christopher Orr.
# Modifications Copyright (c) 2017 Austin Guiney
# MIT Licensed

# This plugin only works with the iso8601 format.

require 'date'
require 'facets/integer/ordinal'

module Jekyll
  module DateFilter
    def ordinal(date)
      "#{date.strftime('%B')} #{date.strftime('%e').to_i.ordinalize}, #{date.strftime('%Y')}"
    end 
    def short_ordinal(date)
     "#{date.strftime('%b')} #{date.strftime('%e').to_i.ordinalize}, #{date.strftime('%Y')}"
    end
    def month_ordinal(date)
     "#{date.strftime('%B')} #{date.strftime('%e').to_i.ordinalize}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateFilter)
