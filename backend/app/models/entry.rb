class Entry < ActiveRecord::Base
  belongs_to :horse
  belongs_to :race
  belongs_to :jockey
end
