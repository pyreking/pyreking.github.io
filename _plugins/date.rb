require 'date'
require 'facets/integer/ordinal'

module Jekyll
  module DateFilter
    def ordinal(date)
      "#{date.strftime('%B')} #{date.strftime('%e').to_i.ordinalize}, #{date.strftime('%Y')}"
    end 
    def shortordinal(date)
     "#{date.strftime('%b')} #{date.strftime('%e').to_i.ordinalize}, #{date.strftime('%Y')}"
     end
     def monthordinal(date)
     "#{date.strftime('%B')} #{date.strftime('%e').to_i.ordinalize}"
     end
  end
end

Liquid::Template.register_filter(Jekyll::DateFilter)
