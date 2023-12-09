class Horse < ActiveRecord::Base
  has_many :entries
  has_many :races, through: :entries
end
