# Copyright (c) 2013 Juan A. Navarro.
# Modifications (c) 2018 Austin Guiney.

module Jekyll
  module FileModificationDateFilter
    def modification_date(input)
      File.mtime(input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::FileModificationDateFilter)
