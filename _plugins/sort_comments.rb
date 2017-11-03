# Copyright (c) 2017 Austin Guiney.
# MIT Licensed
require 'pp'
require 'rails'
require 'sparsify'

module Jekyll
  module SortComments
  
  	# Sorts comments by a user-specified attribute
    def sort_comments(comments, attribute)
      hashes = to_array_of_hashes(comments)
      hashes.sort_by!{ |h| h[attribute]}
      return hashes
    end
    
    # Returns a tree-based data structure for comments
    def sort_children(comments)
    	sorted = []
    	children = comments.select{|k,v| k["parent"] != ""}
    	
    	for i in comments
    		if i["parent"] == ""
    			sorted << i
    		end
    		for j in children
    			if i["_id"] == j["parent"]
    				sorted << j
    			end
    		end
    	end
    	return sorted
    end
    
    # Turns an array of strings into an array of hashes
    def to_array_of_hashes(string) 
      hash = string.sort.to_h
      array_of_hashes = []
      hash.values.each_with_index do |item, index|
        array_of_hashes[index] = item.to_h
      end
      return array_of_hashes
	end
  end
end
Liquid::Template.register_filter(Jekyll::SortComments)
