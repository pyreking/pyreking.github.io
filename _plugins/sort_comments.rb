# Copyright (c) 2017 Austin Guiney.
# MIT Licensed
require 'pp'

module Jekyll
  module SortComments
    def sort_comments(comments, attribute)
      hashes = to_array_of_hashes(comments)
      hashes.sort_by!{ |h| h[attribute]}
      return hashes
    end
    
    def sort_children(comments)
    	nested_hash = Hash[comments.map{|e| [e["_id"], e.merge(children: [])]}]
		nested_hash.each do |id, item|
 			parent = nested_hash[item["parent"]]
  			parent[:children] << item if parent
		end
		tree = nested_hash.select { |id, item| item["parent"] == "" }.values
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
