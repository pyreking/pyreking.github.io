# Copyright (c) 2017 Austin Guiney.
# MIT Licensed

module Jekyll
  module SortComments
    def sort_comments(comments, attribute)
      hashes = to_array_of_hashes(comments)
      hashes.sort_by!{|h| h[attribute]}
      return hashes
    end
    
    def sort_comments_by_depth(comments)
    
    
    end
    
    def to_array_of_hashes(comments) 
      hash = comments.sort.to_h
      array_of_hashes = []
      hash.values.each_with_index do |item, index|
        array_of_hashes[index] = item.to_h
      end
      return array_of_hashes
	end
  end
end
    
Liquid::Template.register_filter(Jekyll::SortComments)
